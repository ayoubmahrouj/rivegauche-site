/* Rive Gauche — tracking + WhatsApp */
(function () {
  var C = window.RG_CONFIG || {};
  // Google Analytics 4
  if (C.GA4_ID) {
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', C.GA4_ID);
  }
  // Meta Pixel
  if (C.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.META_PIXEL_ID); fbq('track', 'PageView');
  }
  function track(el) {
    var p = { page: location.pathname, service: el.dataset.service || 'general', lang: document.documentElement.lang };
    if (window.gtag) gtag('event', 'whatsapp_click', p);
    if (window.fbq) fbq('track', 'Contact', p);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"]');
    if (a) track(a);
  });

  // Booking box: rebuild WhatsApp message with people + date
  var box = document.querySelector('[data-book]');
  if (box) {
    var btn = box.querySelector('a.btn-wa'), ppl = box.querySelector('[name=people]'), dt = box.querySelector('[name=date]');
    var upd = function () {
      var msg = box.dataset.msg.replace('{p}', ppl.value).replace('{d}', dt.value || '___');
      btn.href = 'https://wa.me/' + box.dataset.wa + '?text=' + encodeURIComponent(msg);
    };
    ppl.addEventListener('change', upd); dt.addEventListener('change', upd); upd();
  }

  // Filters on excursions list
  var fb = document.querySelectorAll('.filters button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
      document.querySelectorAll('[data-kind]').forEach(function (c) {
        c.style.display = (b.dataset.f === 'all' || c.dataset.kind === b.dataset.f) ? '' : 'none';
      });
    });
  });
})();
