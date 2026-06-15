---
layout: post
title: "权限控制设计：RBAC、ABAC 与 Renren Security 鉴权实践"
subtitle: "从模型选择、Shiro 鉴权链路到用户等级需求落地"
date: 2025-07-09 22:21:00
author: "zangxin"
header-img: "img/home-bg.jpg"
catalog: true
category: software-engineering
tags:
  - 权限控制
  - RBAC
  - Shiro
  - Spring Security
---

权限系统表面上是在判断“某个用户能不能访问某项功能”，实际却同时涉及身份认证、接口授权、菜单展示、数据范围、缓存失效和审计等多个环节。

本文从常见访问控制模型出发，梳理 Renren Security 基于 Shiro 和 RBAC 的鉴权流程，并讨论“在用户表中增加权限等级”这类需求应该如何落地。

## 认证与授权

权限设计前，需要先区分两个概念：

| 概念 | 英文 | 要解决的问题 |
| --- | --- | --- |
| 认证 | Authentication | 当前请求是谁发起的，用户是否已经合法登录 |
| 授权 | Authorization | 已登录用户是否有权执行当前操作 |

登录、Token 校验属于认证；菜单、按钮、接口和数据范围控制属于授权。只有先确认用户身份，后续权限判断才有意义。

## 常见访问控制模型

### RBAC：基于角色的访问控制

RBAC（Role-Based Access Control）的核心结构是：

```text
用户 → 角色 → 权限
```

用户不直接绑定大量权限，而是通过角色继承权限。例如，给用户分配“系统管理员”角色后，用户即可获得该角色关联的用户管理、角色管理和菜单管理权限。

RBAC 的优势在于统一配置和集中维护：

- 用户发生岗位变化时，只需要调整角色。
- 同类用户可以复用一组权限。
- 权限关系清晰，适合管理后台、CMS、ERP 等系统。

它的局限也很明显。当业务规则包含大量例外条件时，容易出现“角色爆炸”。例如，为了表达不同部门、不同数据范围和不同操作权限的组合，系统可能不得不创建大量相似角色。

### ABAC：基于属性的访问控制

ABAC（Attribute-Based Access Control）根据属性和规则动态判断是否允许访问。常见属性包括：

| 属性类型 | 示例 |
| --- | --- |
| 用户属性 | 部门、职级、年龄、租户、地区 |
| 资源属性 | 创建人、所属部门、保密级别、资源状态 |
| 环境属性 | 当前时间、来源 IP、设备、网络区域 |
| 操作属性 | 查看、编辑、删除、导出 |

一条 ABAC 规则可以表示为：

```text
允许访问 =
    用户部门 == 资源部门
    && 用户职级 >= 资源保密级别
    && 当前时间处于工作时段
```

ABAC 更适合“只能编辑自己创建的文章”“只能查看本部门数据”等动态、细粒度场景，但规则设计、管理界面、调试和审计成本都高于 RBAC。

### RBAC 与 ABAC 的选择

| 对比项 | RBAC | ABAC |
| --- | --- | --- |
| 判断依据 | 用户所属角色 | 用户、资源、环境等属性 |
| 配置方式 | 为角色统一分配权限 | 编写或配置动态规则 |
| 管理成本 | 较低 | 较高 |
| 灵活性 | 中等 | 高 |
| 适用场景 | 菜单、按钮、接口权限 | 数据范围和上下文相关权限 |
| 主要风险 | 角色数量膨胀 | 规则复杂、难以解释和排查 |

实际系统通常不必二选一。更常见的方案是：

- 使用 RBAC 管理菜单、按钮和接口权限。
- 使用 ABAC 补充资源归属、部门范围、租户隔离等动态规则。

例如，“编辑文章”由角色权限控制，而“只能编辑自己创建的文章”由资源归属规则控制。

### 其他模型

| 模型 | 说明 |
| --- | --- |
| ACL | 每个资源维护一份可访问主体及其权限列表，粒度细但维护成本较高 |
| DAC | 资源所有者可以自主决定谁能访问资源 |
| MAC | 系统按照安全级别强制控制访问，普通用户不能随意修改规则 |

## Renren Security 的 RBAC 结构

Renren Security 使用的是典型 RBAC 模型。权限数据主要由以下表组成：

| 表名 | 作用 |
| --- | --- |
| `sys_user` | 用户信息 |
| `sys_role` | 角色信息 |
| `sys_user_role` | 用户与角色的关联关系 |
| `sys_menu` | 菜单、按钮和权限字符串 |
| `sys_role_menu` | 角色与菜单、按钮的关联关系 |

完整权限链路为：

```text
sys_user
    ↓
sys_user_role
    ↓
sys_role
    ↓
sys_role_menu
    ↓
sys_menu.permissions
```

`sys_menu.permissions` 保存权限字符串，例如：

```text
sys:user:list
sys:user:save
sys:user:delete
```

权限字符串是后端接口鉴权和前端按钮控制之间的契约。一条权限字符串通常对应一项可执行操作。

## Renren Security 鉴权流程

Renren Security 的核心流程可以概括为“登录生成凭证，请求解析身份，Realm 加载权限，Shiro 完成判断”。

```text
用户提交用户名和密码
        ↓
后端验证账号状态与密码
        ↓
生成访问 Token 并返回
        ↓
前端在后续请求中携带 Token
        ↓
OAuth2Filter 拦截请求
        ↓
Subject.login(...) 进入 OAuth2Realm
        ↓
认证成功，恢复当前用户身份
        ↓
加载用户的角色和权限字符串
        ↓
@RequiresPermissions 或 isPermitted 完成授权判断
        ↓
允许访问，或返回 401 / 403
```

不同 Renren Security 版本的 Token 实现可能不同：有的使用服务端存储的随机 Token，有的项目会改造成 JWT。无论采用哪种形式，安全边界都是后端必须校验凭证的真实性、有效期和用户状态。

### 登录认证

登录入口通常位于 `SysLoginController`。主要步骤包括：

1. 根据用户名查询用户。
2. 校验密码。
3. 检查用户是否被禁用或锁定。
4. 创建访问 Token。
5. 将 Token 返回给前端。

示意代码如下：

```java
String token = tokenService.createToken(userId);
return R.ok().put("token", token);
```

登录成功只代表身份认证完成，并不意味着用户可以访问所有接口。

### 请求过滤

Shiro 配置中会注册 `OAuth2Filter`，需要认证的请求会先经过该过滤器。

过滤器从请求头或项目约定的位置读取 Token：

```java
String token = getRequestToken(request);
```

随后将 Token 封装为认证对象，并交给 Shiro：

```java
AuthenticationToken authToken = new OAuth2Token(token);
Subject subject = SecurityUtils.getSubject();
subject.login(authToken);
```

`subject.login(...)` 并不一定代表传统的用户名密码登录。在这里，它用于触发自定义 Realm 对 Token 进行认证。

### Realm 身份认证

`OAuth2Realm#doGetAuthenticationInfo` 负责验证 Token 并恢复当前用户：

```java
@Override
protected AuthenticationInfo doGetAuthenticationInfo(
        AuthenticationToken token) {
    // 校验 Token、查询用户并返回认证信息
}
```

这一阶段通常需要完成：

- 判断 Token 是否存在、过期或失效。
- 根据 Token 获取用户 ID。
- 查询用户信息。
- 判断用户是否被禁用。
- 返回 `SimpleAuthenticationInfo`。

如果认证失败，应返回未认证错误；不能继续进入业务接口。

### Realm 权限加载

当接口需要权限判断时，Shiro 会调用 `OAuth2Realm#doGetAuthorizationInfo` 加载权限集合：

```java
@Override
protected AuthorizationInfo doGetAuthorizationInfo(
        PrincipalCollection principals) {
    SysUserEntity user =
        (SysUserEntity) principals.getPrimaryPrincipal();

    Set<String> permissions =
        shiroService.getUserPermissions(user.getUserId());

    SimpleAuthorizationInfo info =
        new SimpleAuthorizationInfo();
    info.setStringPermissions(permissions);
    return info;
}
```

`getUserPermissions` 根据用户、角色和菜单关系，最终返回 `sys_menu.permissions` 中的权限字符串集合。

### 方法级鉴权

Controller 可以使用 Shiro 注解声明访问条件：

```java
@RequiresPermissions("sys:user:list")
@GetMapping("/sys/user/list")
public R list() {
    // 查询用户列表
}
```

在方法执行前，Shiro 会判断当前 `Subject` 是否包含 `sys:user:list` 权限。权限不足时抛出 `UnauthorizedException`，再由统一异常处理转换为前端可识别的响应。

也可以在业务代码中动态判断：

```java
Subject subject = SecurityUtils.getSubject();
if (!subject.isPermitted("sys:user:export")) {
    throw new UnauthorizedException();
}
```

注解适合固定接口权限；动态判断适合需要组合业务条件的场景。

### 菜单与按钮控制

权限系统不仅影响后端接口，也影响前端导航和按钮展示。

登录后，前端通常会请求 `/sys/menu/nav`：

- 菜单数据用于生成动态路由。
- 权限字符串集合用于控制按钮是否显示。
- 后端接口仍必须再次鉴权，不能因为前端隐藏按钮就省略权限检查。

前端控制只改善用户体验，后端校验才是真正的安全边界。

### 鉴权阶段汇总

| 阶段 | 主要职责 | 典型组件 |
| --- | --- | --- |
| 登录 | 校验账号密码并签发 Token | `SysLoginController`、`TokenService` |
| 请求拦截 | 提取 Token 并发起认证 | `OAuth2Filter` |
| 身份认证 | 校验 Token 和用户状态 | `OAuth2Realm` |
| 权限加载 | 查询用户权限字符串 | `ShiroService` |
| 权限判断 | 判断接口是否允许访问 | `@RequiresPermissions`、`Subject` |
| 前端展示 | 构建菜单并控制按钮 | `/sys/menu/nav` |

## “用户权限等级”需求的设计

常见需求是：管理员根据用户名或手机号修改用户权限等级，不提供逐个页面配置权限的能力。

从业务视角看，这像是在 `sys_user` 中增加一个 `permission_level` 字段；从系统视角看，还必须回答以下问题：

1. 每个等级具体可以访问哪些菜单和接口？
2. 等级变化后，已有 Token 和权限缓存何时失效？
3. 前端菜单、按钮与后端接口如何保持一致？
4. 超级管理员、默认用户和历史用户如何迁移？
5. 是否包含数据范围权限，例如仅查看本部门数据？
6. 谁可以修改等级，修改过程是否需要审计？

因此，“增加一个字段”只是数据入口，不是完整权限方案。

### 推荐方案：等级是业务概念，角色是授权实现

如果等级只代表几组固定权限，最稳妥的做法不是再创建一套鉴权机制，而是把等级映射为现有角色：

```text
用户选择权限等级
        ↓
权限等级映射到系统角色
        ↓
更新 sys_user_role
        ↓
继续使用原有角色、菜单和权限字符串鉴权
```

例如：

| 权限等级 | 业务含义 | 映射角色 |
| --- | --- | --- |
| `0` | 普通用户 | `ROLE_USER` |
| `1` | 高级用户 | `ROLE_ADVANCED_USER` |
| `2` | 管理用户 | `ROLE_MANAGER` |

这样做有几个好处：

- 需求方看到的是简单的“等级”配置。
- 底层仍然使用经过验证的 RBAC 权限链路。
- 菜单、按钮和接口权限继续由角色统一管理。
- 不需要在每个 Controller 中增加等级判断。
- 将来调整某个等级的权限时，只需修改角色与菜单关系。

可以增加一张映射表，也可以使用配置文件保存固定关系：

```sql
CREATE TABLE sys_permission_level_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    permission_level INT NOT NULL,
    role_id BIGINT NOT NULL,
    UNIQUE KEY uk_permission_level (permission_level)
);
```

修改用户等级时，服务层需要在同一事务中更新用户等级和 `sys_user_role` 关系。

### 是否需要在用户表中保存等级

如果等级只用于管理界面展示，可以在 `sys_user` 增加字段：

```sql
ALTER TABLE sys_user
ADD COLUMN permission_level INT NOT NULL DEFAULT 0
COMMENT '业务权限等级';
```

该字段不应直接替代角色权限，而应作为：

- 管理界面的简化配置项。
- 等级与角色映射的输入。
- 查询和审计时的业务标识。

真正的接口授权仍由角色和权限字符串完成。

### 权限变更后的失效处理

权限等级或角色变更后，需要处理旧认证状态，否则用户可能继续持有变更前的权限。

常见策略包括：

| 策略 | 特点 |
| --- | --- |
| 删除用户权限缓存 | 下次请求重新加载权限 |
| 使当前 Token 失效 | 用户需要重新登录，安全性较高 |
| 维护用户权限版本号 | Token 中记录版本，版本不一致时拒绝请求 |
| 设置较短 Token 有效期 | 实现简单，但权限收敛存在时间窗口 |

对于后台权限变更，建议至少清理权限缓存；敏感系统可以同时强制 Token 失效。

### 不建议直接在接口中散落等级判断

下面的写法虽然简单，但会让权限规则分散在业务代码中：

```java
if (currentUser.getPermissionLevel() < 1) {
    throw new UnauthorizedException();
}
```

当接口数量增加后，会出现重复判断、规则不一致和难以审计的问题。

如果确实存在无法映射为角色的等级规则，可以封装为统一注解或权限服务，而不是在 Controller 中直接比较数字：

```java
@RequiresPermissionLevel(min = 1)
@GetMapping("/sys/data/export")
public R exportData() {
    // 导出数据
}
```

但这应作为补充机制。对固定菜单和接口权限，优先复用 RBAC。

## 需求评估与工作量拆分

权限改造不能只按“数据库增加一个字段”估算。完整实现通常包含：

| 工作项 | 主要内容 |
| --- | --- |
| 需求澄清 | 明确等级、菜单、按钮、接口和数据范围 |
| 数据设计 | 用户字段、等级映射、历史数据迁移 |
| 后端实现 | 等级管理接口、角色映射、权限缓存失效 |
| 前端实现 | 等级配置界面、菜单和按钮状态 |
| 安全处理 | 管理接口权限、越权防护、审计记录 |
| 测试 | 不同等级、权限变更、并发登录和异常场景 |

三人天是否足够，取决于范围是否被严格限制。如果满足以下条件，简化版本才可能在较短时间内完成：

- 等级数量固定。
- 每个等级只映射一个已有角色。
- 不涉及数据范围权限。
- 不修改现有 Shiro 鉴权链路。
- 前端只增加简单配置项。
- 不需要复杂的历史数据迁移。

评估时应明确哪些内容包含在本次交付中，哪些属于后续扩展，避免把模糊需求变成无限责任。

## 是否迁移到 Spring Security

将 Renren Security 从 Shiro 迁移到 Spring Security 是可行的，但不是简单替换几个注解。

数据库中的 RBAC 结构通常可以保留，主要改动集中在安全框架层：

| 模块 | Shiro | Spring Security |
| --- | --- | --- |
| 请求过滤 | `OAuth2Filter` | 自定义认证过滤器 |
| 认证对象 | `Subject` | `SecurityContext`、`Authentication` |
| 用户加载 | `OAuth2Realm` | `UserDetailsService` 或认证提供器 |
| 方法鉴权 | `@RequiresPermissions` | `@PreAuthorize` |
| 权限对象 | 字符串权限 | `GrantedAuthority` |
| 未认证处理 | Shiro 异常与过滤器响应 | `AuthenticationEntryPoint` |
| 无权限处理 | `UnauthorizedException` | `AccessDeniedHandler` |

迁移时可以保留：

- `sys_user`、`sys_role` 和 `sys_menu` 等表。
- 用户、角色和权限字符串之间的关系。
- 前端使用的菜单和权限标识。

需要重写或替换：

1. Shiro 配置和过滤器链。
2. `OAuth2Realm` 的认证、授权逻辑。
3. 当前用户获取方式。
4. 权限注解。
5. 401、403 异常处理。
6. 相关单元测试和集成测试。

迁移应独立立项，不建议与“新增权限等级”同时进行。先在现有 Shiro + RBAC 架构中完成业务需求，可以降低改动范围和回归风险。

## Cookie、Session 与 Token

“能否用 Cookie 判断登录”不能简单回答为能或不能。Cookie 只是浏览器保存和传输数据的机制，关键在于 Cookie 中保存什么，以及后端如何验证。

### 不安全的做法

不能因为浏览器中存在以下 Cookie 就认为用户已经登录：

```text
userId=1
permissionLevel=2
isLogin=true
```

这些值来自客户端，用户可以自行修改。后端如果直接信任它们，就会产生身份冒充和权限提升风险。

### 可行的认证方式

| 方式 | 客户端保存内容 | 后端验证方式 |
| --- | --- | --- |
| 服务端 Session | Cookie 中保存随机 `sessionId` | 根据 `sessionId` 查询服务端会话 |
| Bearer Token | 请求头中保存访问 Token | 校验签名或查询服务端 Token 状态 |
| HttpOnly Cookie Token | Cookie 中保存访问 Token | 后端校验 Token，并处理 CSRF 风险 |

因此，登录状态必须来自后端验证结果，而不是来自“Cookie 是否存在”。

### Cookie 与请求头的安全边界

- Cookie 会由浏览器自动携带，需要关注 CSRF，并合理设置 `SameSite`。
- 敏感 Cookie 应设置 `HttpOnly`、`Secure` 和合适的作用域。
- 放在 Web Storage 中的 Token 不会自动随请求发送，但更容易受到 XSS 窃取。
- 无论凭证存在哪里，后端都必须校验有效期、签名或服务端状态。
- 用户名、头像等信息可以缓存在前端，但不能作为权限判断依据。

一个可靠的判断标准是：

> 客户端只负责携带凭证，服务端负责确认身份和权限。

## 最终方案

针对 Renren Security 的权限等级需求，可以采用以下方案：

1. 保留 Shiro + RBAC 鉴权架构。
2. 将“权限等级”作为面向业务的简化配置项。
3. 建立权限等级与角色的映射关系。
4. 修改等级时同步更新 `sys_user_role`。
5. 继续通过 `sys_menu.permissions` 和 `@RequiresPermissions` 控制接口。
6. 前端继续根据菜单和权限集合控制路由、按钮展示。
7. 权限变更后清理缓存，必要时使旧 Token 失效。
8. 将 Spring Security 迁移作为独立改造，避免与当前需求叠加。

这个设计既满足“按用户设置等级”的业务表达，又不会绕过现有角色体系。权限模型仍然统一，改动范围可控，也为后续增加数据权限或迁移安全框架保留了空间。
