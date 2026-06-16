/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*!
 * Theme customizations v1.6.0
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 */

(function() {
    var storageKey = 'zangxin-theme';
    var root = document.documentElement;
    var darkColor = '#111827';
    var lightColor = '#0085a1';

    function getStoredTheme() {
        try {
            var value = localStorage.getItem(storageKey);
            return value === 'dark' || value === 'light' ? value : null;
        } catch (e) {
            return null;
        }
    }

    function getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateToggle(theme) {
        var isDark = theme === 'dark';
        var toggles = document.querySelectorAll('.theme-toggle');
        var metaThemeColor = document.getElementById('theme-color-meta');

        toggles.forEach(function(toggle) {
            var icon = toggle.querySelector('.theme-toggle-icon');
            var text = toggle.querySelector('.theme-toggle-text');
            toggle.setAttribute('aria-pressed', String(isDark));
            toggle.setAttribute('aria-label', isDark ? '切换日间模式' : '切换夜间模式');
            toggle.setAttribute('title', isDark ? '切换日间模式' : '切换夜间模式');
            if (icon) {
                icon.className = 'fa ' + (isDark ? 'fa-sun-o' : 'fa-moon-o') + ' theme-toggle-icon';
            }
            if (text) {
                text.textContent = isDark ? '日间' : '夜间';
            }
        });

        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? darkColor : lightColor);
        }
    }

    function applyTheme(theme, persist) {
        root.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.classList.toggle('theme-dark', theme === 'dark');
        }
        if (persist) {
            try {
                localStorage.setItem(storageKey, theme);
            } catch (e) {}
        }
        updateToggle(theme);
    }

    function initThemeToggle() {
        var storedTheme = getStoredTheme();
        var currentTheme = root.getAttribute('data-theme') || storedTheme || getSystemTheme();
        var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
        applyTheme(currentTheme, false);

        document.querySelectorAll('.theme-toggle').forEach(function(toggle) {
            toggle.addEventListener('click', function() {
                var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme, true);
            });
        });

        if (mediaQuery) {
            var handleSystemChange = function(event) {
                if (!getStoredTheme()) {
                    applyTheme(event.matches ? 'dark' : 'light', false);
                }
            };

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleSystemChange);
            } else if (mediaQuery.addListener) {
                mediaQuery.addListener(handleSystemChange);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();

// Tooltip Init
// Titles display by default, so tooltips are unnecessary.
// $(function() {
//     $("[data-toggle='tooltip']").tooltip();
// });


// make all images responsive
/*
 * Legacy implementation retained for reference.
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
//  $("img").addClass("img-responsive");
// });

// responsive tables
$(document).ready(function() {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function() {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight  = $('.intro-header .container').height();     
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop(),
                    $catalog = $('.side-catalog');

                //check if user is scrolling up by mouse or keyborad
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;


                //adjust the appearance of side-catalog
                $catalog.show()
                if (currentTop > (bannerHeight + 41)) {
                    $catalog.addClass('fixed')
                } else {
                    $catalog.removeClass('fixed')
                }
            });
    }
});
