(() => {
 const config=JSON.parse(document.getElementById('v24-locale-data')?.textContent||'{}');
 const en=config.lang==='en';
 const languageLinks=[...document.querySelectorAll('[data-language]')];
 function syncLanguageLinks(){
  for(const a of languageLinks){const url=new URL(a.href);url.search=location.search;url.hash=location.hash;a.href=url.pathname+url.search+url.hash;}
 }
 syncLanguageLinks();
 languageLinks.forEach(a=>a.addEventListener('click',syncLanguageLinks));
 window.addEventListener('hashchange',syncLanguageLinks);
 window.EtohLocale={
  en,basePath:config.basePath||location.pathname,
  url:path=>en&&path.startsWith('/')&&!path.startsWith('/en/')?'/en'+path:path,
  value:text=>en?(config.values?.[text]||text):text,
  choose:(thai,english)=>en?english:thai
 };
})();
