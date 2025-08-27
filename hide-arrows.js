// Masque les flèches de navigation des activités Moodle
(function() {
    let s = document.createElement('style');
    s.textContent = '.activity_navigation {display: none !important;}';
    document.head.appendChild(s);
})();