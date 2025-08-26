/*!
 * Return to course button (bottom-only)
 * Works on: /course/section.php?id=..., /course/view.php?id=...&section=..., and activity pages.
 * Hides itself on course home (/course/view.php?id=... without section).
 */
(function(){
  "use strict";

  function getCourseUrl(){
    var base = (window.M && M.cfg && M.cfg.wwwroot) ? M.cfg.wwwroot : location.origin;
    if (window.M && M.cfg && M.cfg.courseId) return base + "/course/view.php?id=" + M.cfg.courseId;

    var bc = document.querySelector('a[href*="/course/view.php?id="]');
    if (bc) return bc.href;

    var m = document.body.className.match(/(?:^|\s)course-(\d+)(?:\s|$)/);
    if (m) return base + "/course/view.php?id=" + m[1];

    return null;
  }

  function ensureStyles(){
    if (document.getElementById("return-course-btn-style")) return;
    var s = document.createElement("style");
    s.id = "return-course-btn-style";
    s.textContent = ".return-course-btn{display:inline-block;margin:20px 0;padding:10px 16px;background:#5306b4;color:#fff!important;font-weight:600;border-radius:8px;text-decoration:none;transition:background .2s}.return-course-btn:hover{background:#3f0590}";
    document.head.appendChild(s);
  }

  function addBtn(url){
    if (!url) return;
    if (document.querySelector(".return-course-btn")) return;
    ensureStyles();
    var a = document.createElement("a");
    a.className = "return-course-btn";
    a.href = url;
    a.textContent = "⬅ Retour à la page principale";

    // Toujours en bas de la zone principale
    var main = document.querySelector("#region-main") || document.body;
    main.appendChild(a);
  }

  // Accueil du cours = /course/view.php?id=... sans section (ni ?section=..., ni #section-...)
  function isCourseHome(){
    var p = new URL(location.href).searchParams;
    var isViewPage = location.pathname.indexOf("/course/view.php") !== -1;
    var hasSectionAnchor = /^#section-\d+$/i.test(location.hash || "");
    return isViewPage && (p.has("id") || p.has("course")) && !p.has("section") && !hasSectionAnchor;
  }

  function refresh(){
    var btn = document.querySelector(".return-course-btn");
    if (isCourseHome()){
      if (btn) btn.remove();
      return;
    }
    addBtn(getCourseUrl());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh);
  else refresh();
  window.addEventListener("hashchange", refresh);
  new MutationObserver(refresh).observe(document.documentElement, {childList:true, subtree:true});
})();
