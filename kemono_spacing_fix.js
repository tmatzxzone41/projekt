// ==UserScript==
// @name         Kemono Filename Space Fix
// @namespace    https://kemono.cr/
// @version      1.1
// @description  Replace literal '+' in ?f= filename param with %20 so downloads get spaces
// @match        https://n3.kemono.cr/*
// @match        https://*.kemono.cr/*
// @run-at       document-start
// @author       TmatzXzonE
// @grant        none
// ==/UserScript==

(function(){
  'use strict';

  function fixFParamInHref(href){
    if(!href || (href.indexOf('?f=')===-1 && href.indexOf('&f=')===-1)) return href;
    // Replace only the value of 'f' parameter (literal + -> %20)
    return href.replace(/([?&]f=)([^&]*)/g, function(_, p1, p2){
      if (!p2.includes('+')) return p1 + p2;
      return p1 + p2.replace(/\+/g, '%20');
    });
  }

  function fixElementAnchor(a){
    try{
      const raw = a.getAttribute('href');
      if(!raw) return;
      const fixed = fixFParamInHref(raw);
      if(fixed !== raw) a.setAttribute('href', fixed);
    }catch(e){}
  }

  function scanAndFix(root=document){
    const anchors = root.querySelectorAll && root.querySelectorAll('a[href]');
    if(!anchors) return;
    anchors.forEach(fixElementAnchor);
  }

  // initial attempt (very early)
  try{ scanAndFix(document); }catch(e){}

  // Observe DOM changes and fix new anchors
  const mo = new MutationObserver(muts => {
    for(const m of muts){
      if(m.type === 'childList'){
        m.addedNodes.forEach(node => {
          if(node.nodeType !== 1) return;
          if(node.matches && node.matches('a[href]')) fixElementAnchor(node);
          else scanAndFix(node);
        });
      } else if(m.type === 'attributes' && m.target.matches && m.target.matches('a[href]') && m.attributeName === 'href'){
        fixElementAnchor(m.target);
      }
    }
  });
  mo.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });

  // capture clicks (for JS-created navigation where href wasn't used)
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    try{
      const raw = a.getAttribute('href');
      const fixed = fixFParamInHref(raw);
      if(fixed !== raw){
        a.setAttribute('href', fixed);
      }
    }catch(e){}
  }, true);

  // override window.open to fix URLs opened via JS
  try{
    const __open = window.open;
    window.open = function(url, target, features){
      try{
        if(typeof url === 'string'){
          url = fixFParamInHref(url);
        }
      }catch(e){}
      return __open.call(this, url, target, features);
    };
  }catch(e){}
})();
