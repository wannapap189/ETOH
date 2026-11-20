(() => {
  'use strict';
  const locale=window.EtohLocale||{en:false,basePath:location.pathname,url:path=>path,value:text=>text};
  const say=(thai,english)=>locale.en?english:thai;
  const localURL=locale.url;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key = 'etohcols-cart-v1';
  const sizeLabels = locale.en?{'1L':'1 L','5L':'5 L','20L':'20 L','200L':'200 L','1000L':'IBC 1,000 L','ISO Tank':'20,000 L tank'}:{'1L':'1 ลิตร','5L':'5 ลิตร','20L':'20 ลิตร','200L':'200 ลิตร','1000L':'IBC 1,000 ลิตร','ISO Tank':'ตู้ Tank 20,000 ลิตร'};
  const images = {'1L':'gallon1-v10','5L':'gallon5-v10','20L':'gallon20-white-black-v27','200L':'plastic-drum-branded','1000L':'ibc1000-branded-v6','ISO Tank':'tank-truck-v10'};
  const skus = ['etoh','pharmol'].flatMap(b => (b==='pharmol'?['95','96','99-9']:['70','75','95','96','99-9']).map(p => `${b}-${p}`));
  const validQuantity = q => Number.isInteger(q) && q >= 1 && q <= 100000;
  const validItem = item => item && skus.includes(item.sku) && Object.hasOwn(sizeLabels,item.size) && validQuantity(item.quantity);
  const productName = sku => `${sku.startsWith('pharmol')?'Pharmol':'Etoh'} ${sku.replace(/^(?:pharmol|etoh)-/,'').replace('-','.')}%`;
  let items = [];
  try { const saved = JSON.parse(localStorage.getItem(key) || '[]'); if (Array.isArray(saved)) items = saved.filter(validItem).map(({sku,size,quantity})=>({sku,size,quantity})); } catch {}
  const params = new URLSearchParams(location.search);
  function notify(text) { const toast = $('.v9-toast'); if (!toast) return; toast.textContent = text; toast.hidden = false; clearTimeout(notify.timer); notify.timer = setTimeout(()=>toast.hidden=true,4500); }
  function updateCount(){ $$('[data-cart-count]').forEach(el=>el.textContent=items.length); }
  function save(){ try{localStorage.setItem(key,JSON.stringify(items));}catch{notify(say('เบราว์เซอร์ไม่อนุญาตให้บันทึกรายการ รายการอาจหายเมื่อเปลี่ยนหน้า','Your browser cannot save the list. Items may be lost when you leave this page.'));}updateCount(); }
  function query(values){return localURL('/quote/?'+new URLSearchParams(values).toString());}
  const menu=$('.v9-menu'), nav=$('#v9-navigation');
  menu?.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?say('ปิดเมนู','Close menu'):say('เปิดเมนู','Open menu'));nav.classList.toggle('v9-nav-open',open); });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('v9-nav-open')){nav.classList.remove('v9-nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',say('เปิดเมนู','Open menu'));menu.focus();}});
  const tabs=$$('[role="tab"]');
  function activateTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}
  tabs.forEach((tab,index)=>{tab.tabIndex=index===0?0:-1;tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activateTab(tabs[next]);tabs[next].focus();}});});
  const product=$('[data-product]');
  if(product){
    let selectedSize=Object.hasOwn(sizeLabels,params.get('size'))?params.get('size'):'200L';
    const qty=$('#v9-quantity');
    function updateProduct(){
      $$('[data-pack-size]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.packSize===selectedSize)));
      const picture=$('#v9-pack-image');picture.src='/assets/business-v9/'+(selectedSize==='200L'&&product.dataset.product.startsWith('pharmol')?'pharmol-drum-v10':images[selectedSize])+'.webp';picture.alt=selectedSize==='ISO Tank'?say('ภาพจำลองรถบรรทุกตู้ Tank','Tank truck packaging visual'):say('ภาพประกอบบรรจุภัณฑ์ ','Packaging visual: ')+sizeLabels[selectedSize]+say(' พร้อมโลโก้ ',' with ')+(selectedSize==='200L'&&product.dataset.product.startsWith('pharmol')?'PHARMOL':'Etohcols');
      $('.v9-quantity-row>label').textContent=selectedSize==='ISO Tank'?say('จำนวนตู้','Number of tanks'):say('จำนวนบรรจุภัณฑ์','Number of containers');
      const small=['1L','5L','20L'].includes(selectedSize), planned=product.dataset.planned==='true';
      $('#v9-readiness').textContent=small?say(`ขนาด ${sizeLabels[selectedSize]} อยู่ระหว่างเตรียมสินค้าและระบบแบ่งบรรจุ · สอบถามแผนความพร้อมได้`,`${sizeLabels[selectedSize]} packaging is in preparation. Contact the team for availability plans.`):planned?say('สูตรนี้อยู่ในแผนพัฒนา สอบถามข้อมูลและความพร้อมก่อนสั่งซื้อ','This formulation is planned. Confirm specifications and availability before ordering.'):say(`ขนาด ${sizeLabels[selectedSize]} · ทีมงานยืนยันสินค้าและกำหนดส่งก่อนสั่งซื้อ`,`${sizeLabels[selectedSize]} · The team will confirm availability and delivery before ordering.`);
      const values={product:product.dataset.productName,size:selectedSize};if(validQuantity(Number(qty.value)))values.quantity=qty.value;
      $('#v9-product-quote').href=query(values);
      $$('[data-product-intent]').forEach(a=>a.href=query({...values,intent:a.dataset.productIntent}));
    }
    $$('[data-pack-size]').forEach(button=>button.addEventListener('click',()=>{selectedSize=button.dataset.packSize;updateProduct();}));
    $$('[data-step]').forEach(button=>button.addEventListener('click',()=>{qty.value=Math.min(100000,Math.max(1,(Number(qty.value)||1)+Number(button.dataset.step)));updateProduct();}));
    qty.addEventListener('input',updateProduct);
    $('#v9-product-quote').addEventListener('click',e=>{if(!validQuantity(Number(qty.value))){e.preventDefault();qty.reportValidity();}});
    $('#v9-add-request').addEventListener('click',()=>{
      const quantity=Number(qty.value);if(!validQuantity(quantity)){qty.reportValidity();notify(say('กรุณาระบุจำนวนเต็มตั้งแต่ 1 ถึง 100000','Enter a whole number from 1 to 100,000.'));return;}
      const existing=items.find(i=>i.sku===product.dataset.product&&i.size===selectedSize);
      if(existing){if(!validQuantity(existing.quantity+quantity)){notify(say('จำนวนรวมเกินกำหนด กรุณาติดต่อทีมงาน','The total exceeds the limit. Please contact our team.'));return;}existing.quantity+=quantity;}
      else items.push({sku:product.dataset.product,size:selectedSize,quantity});
      save();notify(say(`เพิ่ม ${product.dataset.productName} · ${sizeLabels[selectedSize]} ในรายการขอราคาแล้ว`,`${product.dataset.productName} · ${sizeLabels[selectedSize]} added to your quote list.`));
    });
    updateProduct();
  }
  const catalog=$('[data-catalog]');
  if(catalog){function filter(){const search=$('#v9-search').value.toLowerCase().trim(),brand=$('#v9-brand-filter').value,percent=$('#v9-percent-filter').value;let shown=0;$$('.v9-catalog-card').forEach(card=>{const match=(!search||(card.dataset.search+' '+card.textContent).toLowerCase().includes(search))&&(!brand||card.dataset.brand===brand)&&(!percent||card.dataset.percent===percent);card.hidden=!match;if(match)shown++;});$$('[data-catalog-group]').forEach(group=>group.hidden=!$$('[data-brand]',group).some(card=>!card.hidden));
      $('#v9-results').textContent=say(`${shown} รายการ`,`${shown} ${shown===1?'product':'products'}`);$('#v9-no-results').hidden=shown>0; if($('#v10-clear-filters')) $('#v10-clear-filters').hidden=!(search||brand||percent);}['#v9-search','#v9-brand-filter','#v9-percent-filter'].forEach(id=>$(id).addEventListener('input',filter));const resetFilters=()=>{['#v9-search','#v9-brand-filter','#v9-percent-filter'].forEach(id=>$(id).value='');filter();};$('#v10-clear-filters')?.addEventListener('click',resetFilters);$$('.v10-category-nav a').forEach(a=>a.addEventListener('click',resetFilters));}
  function renderList(){
    const root=$('#v9-request-list');if(!root)return;
    if(!items.length){root.innerHTML=`<div class="v9-empty"><h2>${say('ยังไม่มีรายการขอราคา','Your quote list is empty')}</h2><p>${say('เลือกสินค้า ขนาด และจำนวนที่ต้องการ แล้วรวมรายการให้ทีมประเมิน','Select products, packaging sizes and quantities, then send the list for our team to review.')}</p><a class="v9-button" href="${localURL('/shop/')}">${say('เลือกสินค้า','Browse products')} <span aria-hidden="true">↗</span></a></div>`;return;}
    root.innerHTML=`<div class="v9-cart-layout"><div>${items.map((item,i)=>`<article class="v9-cart-line"><img src="/assets/business-v9/${item.size==='200L'&&item.sku.startsWith('pharmol')?'pharmol-drum-v10':images[item.size]}.webp" alt="${escape(sizeLabels[item.size])}"><div><a href="${localURL(`/product/${item.sku}/?size=${encodeURIComponent(item.size)}`)}"><h2>${escape(productName(item.sku))}</h2></a><p>${escape(sizeLabels[item.size])}</p><button type="button" data-remove-item="${i}" aria-label="${escape(say(`นำ ${productName(item.sku)} ${sizeLabels[item.size]} ออก`,`Remove ${productName(item.sku)} ${sizeLabels[item.size]}`))}">${say('นำออก','Remove')}</button></div><label>${say('จำนวน','Quantity')}<input type="number" min="1" max="100000" step="1" value="${item.quantity}" data-item-quantity="${i}" aria-label="${escape(say('จำนวน ','Quantity: ')+productName(item.sku)+' '+sizeLabels[item.size])}"></label></article>`).join('')}</div><aside class="v9-request-summary"><h2>${say('รายการของคุณ','Your quote list')}</h2><p>${items.length} ${say('รายการ',items.length===1?'item':'items')} · ${items.reduce((sum,i)=>sum+i.quantity,0).toLocaleString(locale.en?'en-US':'th-TH')} ${say('บรรจุภัณฑ์',items.reduce((sum,i)=>sum+i.quantity,0)===1?'container':'containers')}</p><p>${say('ทีมขายจะยืนยันสเปก ความพร้อม ราคา และการจัดส่งหลังรับข้อมูลความต้องการ','Our sales team will confirm specifications, availability, pricing and delivery after reviewing your requirements.')}</p><a class="v9-button" href="${localURL('/quote/?cart=1')}">${say('ขอใบเสนอราคาทั้งรายการ','Request a quote for all items')} <span aria-hidden="true">↗</span></a><p class="v9-small">${say('รายการนี้ยังไม่ใช่การจองสินค้าหรือคำสั่งซื้อ','This list is not a stock reservation or an order.')}</p><a class="v9-text-link" href="${localURL('/shop/')}">${say('เลือกสินค้าเพิ่ม','Add more products')} ↗</a></aside></div>`;
  }
  document.addEventListener('click',e=>{const remove=e.target.closest('[data-remove-item]');if(remove){items.splice(Number(remove.dataset.removeItem),1);save();renderList();notify(say('นำรายการออกแล้ว','Item removed.'));}});
  document.addEventListener('change',e=>{if(e.target.matches('[data-item-quantity]')){const index=Number(e.target.dataset.itemQuantity),value=Number(e.target.value);if(!items[index])return;if(!validQuantity(value)){e.target.reportValidity();e.target.value=items[index].quantity;return;}items[index].quantity=value;save();renderList();}});
  function fillCartSummary(){const box=$('#v9-form-cart');if(!box)return;box.hidden=false;box.className='v9-form-cart';if(items.length){box.innerHTML=`<h3>${say('รายการที่ต้องการขอราคา','Items for your quote request')}</h3><ul>`+items.map(i=>`<li>${escape(productName(i.sku))} · ${escape(sizeLabels[i.size])} × ${i.quantity}</li>`).join('')+`</ul><a href="${localURL('/cart/')}">${say('แก้ไขรายการ','Edit list')} ↗</a>`;}else box.innerHTML=`<p>${say('ยังไม่มีสินค้าในรายการ คุณสามารถระบุความต้องการในแบบฟอร์มนี้ได้','Your list is empty. You can describe your requirements in this form.')}</p>`;}
  const form=$('#v9-inquiry-form');
  if(form){
    const intent=$('#v9-intent');
    const help={quote:'แจ้งสินค้า ปริมาณ และจังหวัด ทีมงานจะเสนอราคาและเงื่อนไขเป็นรายคำขอ',advice:'บอกงานที่ต้องการใช้ หรือคุณสมบัติของวัตถุดิบที่มองหา หากยังไม่ทราบสินค้าและขนาด สามารถเว้นไว้ได้',compare:'ระบุสเปกเดิม ความเข้มข้น สารแปลงสภาพ และปริมาณที่ใช้ เพื่อเปรียบเทียบบนข้อกำหนดเดียวกัน เอกสารเดิมส่งเพิ่มเติมทาง LINE ได้',sample:'ตัวอย่างทดสอบฟรี · ค่าจัดส่งพิจารณาตามพื้นที่และแจ้งก่อนส่ง กรุณาระบุงานและเกณฑ์ทดสอบ การเลือกขนาดบรรจุไม่ได้หมายถึงขนาดตัวอย่างฟรี',document:'เอกสารฉบับจริงขอรับผ่านทีมงานเท่านั้น ระบุชื่อสินค้าและเอกสารที่ต้องการ เช่น SPEC, COA หรือ SDS พร้อมเลขล็อตถ้ามี ทีมงานจะตรวจสอบก่อนจัดส่งให้',delivery:'แจ้งจังหวัด ขนาด ปริมาณ และช่วงรับสินค้า เพื่อประเมินผู้ขนส่ง เส้นทาง และค่าจัดส่งตามรายการ',reorder:'แจ้งสินค้าเดิม เลขอ้างอิงถ้ามี ปริมาณ และรอบรับที่ต้องการ ทีมงานจะยืนยันราคาและกำหนดส่งครั้งใหม่',partner:'แจ้งพื้นที่ขาย กลุ่มลูกค้า ช่องทางจำหน่าย และสินค้าที่สนใจ เพื่อให้ทีมหารือรูปแบบความร่วมมือและเงื่อนไขตัวแทน',oem:'รับ OEM เฉพาะเอทิลแอลกอฮอล์แปลงสภาพ รองรับขนาด 200 ลิตร ไม่รับ PHARMOL ชนิดไม่แปลงสภาพ ส่วนขนาด 1 / 5 / 20 ลิตรอยู่ระหว่างเตรียม แจ้งสูตร สเปก จำนวน และช่วงเวลาที่ต้องการเพื่อประเมินโครงการ'};
    const helpEn={quote:'Tell us the product, quantity and destination province. Our team will provide pricing and terms for your specific request.',advice:'Describe the application or the raw-material properties you need. You can leave the product and packaging size blank if you are unsure.',compare:'Provide the existing specifications, concentration, denaturants and consumption so we can compare against the same requirements. Existing documents can also be sent through LINE.',sample:'Trial samples are free. Shipping is assessed by destination and confirmed before dispatch. Specify the application and testing criteria. Selecting a packaging size does not specify the size of the free sample.',document:'Actual documents are available only through our team. Specify the product and documents required, such as SPEC, COA or SDS, and a lot number if available. Our team will review the request before supplying them.',delivery:'Provide the province, packaging size, quantity and receiving window so we can assess the carrier, route and shipping cost for your items.',reorder:'Provide the previous product, reference number if available, quantity and preferred receiving schedule. Our team will confirm the updated price and delivery date.',partner:'Tell us your sales territory, customer segments, sales channels and products of interest so we can discuss a suitable partnership and distributor terms.',oem:'OEM is available exclusively for denatured ethyl alcohol in 200 L packaging. Undenatured PHARMOL is outside this service. The 1 / 5 / 20 L range remains in preparation. Share the formulation, specifications, quantity and timeline for project assessment.'};
    help.stock='ระบุสินค้าที่ต้องการดูแล ปริมาณใช้ต่อรอบ จังหวัด และบริการที่สนใจ: เก็บสินค้าและทยอยส่ง หรือวางแผนสต็อก ติดตามยอด และเติมตามรอบ ทีมงานจะประเมินรายการที่รับดูแลและตกลงเงื่อนไข ค่าใช้จ่าย และรอบส่งก่อนเริ่มบริการ';
    helpEn.stock='Tell us which items need support, consumption per cycle, destination and the service needed: storage with scheduled dispatch, or stock planning, balance monitoring and replenishment. The team will assess eligible items and agree scope, costs and delivery schedules before service starts.';
    const updateHelp=()=>{
      $('#v9-intent-help').textContent=locale.en?(helpEn[intent.value]||helpEn.quote):(help[intent.value]||help.quote);
      const productSelect=form.elements.product;
      for(const option of productSelect.options){
        if(!/^pharmol\b/i.test(option.value))continue;
        option.disabled=intent.value==='oem';
        option.hidden=intent.value==='oem';
        if(option.disabled&&option.selected)productSelect.value='';
      }
      intent.setCustomValidity('');
      const partnerFields=$('#v22-partner-fields');
      if(partnerFields){partnerFields.hidden=intent.value!=='partner';partnerFields.disabled=intent.value!=='partner';}
    };
    const desired=params.get('intent')==='trial'?'sample':params.get('intent');
    if(Object.hasOwn(help,desired))intent.value=desired;
    else if(locale.basePath==='/sample/')intent.value='sample';
    for(const field of ['product','size','quantity','industry','note','province']){
      const value=params.get(field),el=form.elements.namedItem(field);if(!value||!el)continue;
      if(el instanceof HTMLSelectElement){if([...el.options].some(o=>o.value===value))el.value=value;else if(field==='product')form.elements.note.value=(say('สินค้า: ','Product: ')+value+'\n').slice(0,2000);}
      else if(field==='quantity'){if(validQuantity(Number(value)))el.value=value;}
      else el.value=(['industry','note'].includes(field)?locale.value(value):value).slice(0,el.maxLength>0?el.maxLength:2000);
    }
    const fromCart=params.get('cart')==='1'||locale.basePath==='/checkout/';
    if(fromCart){fillCartSummary();if(items.length){form.elements.product.value='หลายรายการ / สเปกเฉพาะ';for(const field of ['product','size','quantity'])form.elements[field].disabled=true;}}
    intent.addEventListener('change',updateHelp);updateHelp();
    let message='';
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const incompatibleOEM=intent.value==='oem'&&((fromCart&&items.some(item=>item.sku.startsWith('pharmol-')))||/^pharmol\b/i.test(form.elements.product.value));
      intent.setCustomValidity(incompatibleOEM?say('OEM รับเฉพาะเอทิลแอลกอฮอล์แปลงสภาพ กรุณานำ PHARMOL ออกจากรายการขอ OEM หรือเปลี่ยนเป็นการขอราคาสินค้า','OEM is available only for denatured ethyl alcohol. Remove PHARMOL from the OEM list or select a standard product quotation.'): '');
      for(const field of ['name','contact']){const el=form.elements[field];el.setCustomValidity(el.value.trim()?'':say('กรุณาระบุข้อมูล','Please complete this field.'));}
      if(!form.reportValidity())return;
      const data=Object.fromEntries(new FormData(form));
      const selectedIntent=intent.options[intent.selectedIndex].text;
      const selectedText=(name,fallback)=>{const el=form.elements.namedItem(name);return el instanceof HTMLSelectElement&&el.value?el.selectedOptions[0]?.textContent.trim()||fallback:fallback;};
      const advice=say('ขอคำแนะนำ','Please advise');
      const lines=fromCart&&items.length?items.map(i=>`• ${productName(i.sku)} | ${sizeLabels[i.size]} | ${say('จำนวน','Quantity')} ${i.quantity}`).join('\n'):`${say('สินค้า','Product')}: ${selectedText('product',advice)}\n${say('ขนาด','Packaging')}: ${selectedText('size',advice)}\n${say('จำนวน','Quantity')}: ${data.quantity||say('สอบถามเพิ่มเติม','To be discussed')}`;
      const partnerDetails=data.intent==='partner'?`\n\n${say('ข้อมูลตัวแทนจำหน่าย','Distributor information')}\n${say('พื้นที่ขาย','Sales territory')}: ${data.salesArea||'-'}\n${say('ช่องทางจำหน่าย','Sales channel')}: ${selectedText('salesChannel','-')}\n${say('กลุ่มลูกค้า','Customer segments')}: ${data.targetCustomers||'-'}`:'';
      message=`${say('สอบถาม Etohcols','Etohcols inquiry')} — ${selectedIntent}\n\n${lines}\n\n${say('การใช้งาน / ธุรกิจ','Application / Business')}: ${data.industry||'-'}\n${say('จังหวัดปลายทาง','Destination province')}: ${data.province||'-'}\n${say('รายละเอียด','Details')}: ${data.note||'-'}${partnerDetails}\n\n${say('ผู้ติดต่อ','Contact name')}: ${data.name.trim()}\n${say('บริษัท / ร้านค้า','Company / Store')}: ${data.company||'-'}\n${say('โทรศัพท์ / LINE','Phone / LINE')}: ${data.contact.trim()}\n${say('อีเมล','Email')}: ${data.email||'-'}${data.intent==='sample'?say('\n\nขอตัวอย่างทดสอบฟรี กรุณาแจ้งค่าจัดส่งตามพื้นที่ก่อนส่ง','\n\nI would like free trial samples. Please confirm shipping charges for my destination before dispatch.'):''}\n\n${data.intent==='partner'?say('ขอให้ทีมติดต่อเพื่อหารือรูปแบบความร่วมมือและเงื่อนไขตัวแทนจำหน่าย','Please contact me to discuss partnership options and distributor terms.'):say('ขอข้อมูลความพร้อม ราคา และเงื่อนไขก่อนยืนยันสั่งซื้อ','Please provide availability, pricing and terms before I confirm an order.')}`;
      $('#v9-request-text').textContent=message;form.hidden=true;$('#v9-inquiry-result').hidden=false;$('#v9-inquiry-result').scrollIntoView({behavior:'smooth',block:'start'});
    });
    ['name','contact'].forEach(field=>form.elements[field].addEventListener('input',()=>form.elements[field].setCustomValidity('')));
    $('#v9-edit-request').addEventListener('click',()=>{$('#v9-inquiry-result').hidden=true;form.hidden=false;form.scrollIntoView({behavior:'smooth',block:'start'});});
    $('#v9-copy-request').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);notify(say('คัดลอกแล้ว เปิด LINE แล้ววางข้อความเพื่อส่งด้วยตัวเอง','Copied. Open LINE and paste the message to send it yourself.'));}catch{const range=document.createRange();range.selectNodeContents($('#v9-request-text'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);notify(say('เลือกข้อความไว้แล้ว กรุณาคัดลอกด้วยตัวเอง','The text is selected. Please copy it manually.'));}});
  }
  window.addEventListener('storage',e=>{if(e.key===key){try{const data=JSON.parse(e.newValue||'[]');items=Array.isArray(data)?data.filter(validItem):[];}catch{items=[];}updateCount();renderList();if(form&&(params.get('cart')==='1'||locale.basePath==='/checkout/'))fillCartSummary();}});
  updateCount();renderList();
})();

// Business scene choices stay local to their product and never auto-advance.
document.querySelectorAll('[data-business-gallery]').forEach(gallery=>{
 gallery.querySelectorAll('[data-scene-image]').forEach(button=>button.addEventListener('click',()=>{
  const photo=gallery.querySelector('.v11-business-image');
  photo.src='/assets/business-v9/'+button.dataset.sceneImage+'.webp';
  const sceneTitle=window.EtohLocale?.value(button.dataset.sceneTitle)||button.dataset.sceneTitle;
  photo.alt=(window.EtohLocale?.en?'Image: ':'ภาพ')+sceneTitle;
  gallery.querySelector('.v11-image-caption').textContent=sceneTitle;
  gallery.querySelectorAll('[data-scene-image]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
 }));
});
