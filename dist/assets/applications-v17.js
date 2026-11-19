(() => {
  const en=window.EtohLocale?.en===true;
  const directory=document.querySelector('[data-application-directory]');
  if(directory){
    const search=document.getElementById('a17-search');
    const product=document.getElementById('a17-product');
    const tabs=[...directory.querySelectorAll('[data-group-filter]')];
    const cards=[...directory.querySelectorAll('[data-application]')];
    const groups=[...directory.querySelectorAll('[data-application-group]')];
    const count=document.getElementById('a17-count');
    const empty=document.getElementById('a17-empty');
    const clear=document.getElementById('a17-clear');
    const params=new URLSearchParams(location.search);
    let selectedGroup=tabs.some(t=>t.dataset.groupFilter===params.get('group'))?params.get('group'):'';
    search.value=params.get('q')||'';
    if([...product.options].some(o=>o.value===params.get('product')))product.value=params.get('product');
    function update(writeURL=true){
      const term=search.value.trim().toLowerCase();
      let visible=0;
      for(const card of cards){
        const matchesGroup=!selectedGroup||(selectedGroup==='sme'?card.dataset.sme==='true':card.dataset.group===selectedGroup);
        const matchesProduct=!product.value||card.dataset.products.split(' ').includes(product.value);
        card.hidden=!(matchesGroup&&matchesProduct&&(!term||(card.dataset.search+' '+card.textContent).toLowerCase().includes(term)));
        if(!card.hidden)visible++;
      }
      for(const group of groups)group.hidden=![...group.querySelectorAll('[data-application]')].some(c=>!c.hidden);
      for(const tab of tabs)tab.setAttribute('aria-pressed',String(tab.dataset.groupFilter===selectedGroup));
      count.textContent=en?`${visible} business applications${product.value?' · Review specifications for '+product.selectedOptions[0].text:''}`:`${visible} แนวทางธุรกิจ${product.value?' · สำหรับตรวจสเปกกับ '+product.selectedOptions[0].text:''}`;
      empty.hidden=visible!==0;
      clear.hidden=!(selectedGroup||term||product.value);
      if(writeURL){
        const url=new URL(location.href);
        for(const [key,value] of [['group',selectedGroup],['product',product.value],['q',search.value.trim()]])value?url.searchParams.set(key,value):url.searchParams.delete(key);
        history.replaceState(null,'',url.pathname+url.search+url.hash);
      }
    }
    tabs.forEach(tab=>tab.addEventListener('click',()=>{selectedGroup=tab.dataset.groupFilter;update();}));
    search.addEventListener('input',()=>update());
    product.addEventListener('change',()=>update());
    clear.addEventListener('click',()=>{search.value='';product.value='';selectedGroup='';update();});
    update(false);
  }
  document.querySelectorAll('[data-copy-application]').forEach(button=>button.addEventListener('click',async()=>{
    const status=button.parentElement.querySelector('[role=status]');
    try{await navigator.clipboard.writeText(location.href);status.textContent=en?'Link copied':'คัดลอกลิงก์แล้ว';}
    catch{status.textContent=en?'Copy the address from your browser’s address bar.':'คัดลอกที่อยู่จากแถบ URL ของเบราว์เซอร์ได้เลย';}
  }));
})();
