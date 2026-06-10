import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const stagedOnly = process.argv.includes('--staged');
const args = stagedOnly
  ? ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']
  : ['ls-files', '-z'];
const output = execFileSync('git', args, { encoding: 'utf8' });
const files = output.split('\0').filter(Boolean);

const forbidden = [
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)\.idea(\/|$)/,
  /(^|\/)\.vscode(\/|$)/,
  /(^|\/)_site(\/|$)/,
  /(^|\/)\.jekyll-cache(\/|$)/,
  /(^|\/)vendor\/bundle(\/|$)/,
  /(^|\/)\.DS_Store$/,
  /(^|\/)Thumbs\.db$/,
  /\.(log|tmp|temp|swp|swo)$/i,
  /(^|\/)\.env$/,
  /(^|\/)\.env\.(?!example$).+$/
];
const maxFileSize = 5 * 1024 * 1024;
const problems = [];

for (const file of files) {
  const normalized = file.replaceAll('\\', '/');
  if (forbidden.some((pattern) => pattern.test(normalized))) {
    problems.push(`${file}: local or generated file`);
    continue;
  }

  const absolutePath = resolve(file);
  if (existsSync(absolutePath) && statSync(absolutePath).size > maxFileSize) {
    problems.push(`${file}: larger than 5 MB`);
  }
}

if (problems.length > 0) {
  console.error('Repository check failed:');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Repository check passed (${files.length} ${stagedOnly ? 'staged' : 'tracked'} files checked).`);
