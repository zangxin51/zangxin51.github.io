/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

// SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0>

function handleRegistration(registration) {
  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (!installingWorker) return;

    installingWorker.onstatechange = () => {
      if (installingWorker.state !== 'installed') return;
      if (navigator.serviceWorker.controller) {
        createSnackbar({
          message: '网站内容已更新。',
          actionText: '刷新',
          action: function () { location.reload(); }
        });
      } else {
        createSnackbar({
          message: '网站已支持离线访问。',
          duration: 3000
        });
      }
    };
  };
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(handleRegistration)
      .catch(function (error) {
        console.warn('Service Worker registration failed:', error);
      });
  });
}
