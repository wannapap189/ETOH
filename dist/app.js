const navButton=document.querySelector('.mobile-toggle');
navButton?.addEventListener('click',()=>{const open=navButton.getAttribute('aria-expanded')!=='true';navButton.setAttribute('aria-expanded',String(open));document.querySelector('.navlinks').classList.toggle('open',open);navButton.textContent=open?'×':'☰';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navButton){navButton.setAttribute('aria-expanded','false');document.querySelector('.navlinks').classList.remove('open');navButton.textContent='☰';}});
function applyFilter(type){document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===type;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelectorAll('.product-card').forEach(c=>c.hidden=type!=='all'&&c.dataset.type!==type);}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.filter)));
const query=new URLSearchParams(location.search);if(['pure','denatured','hand','surface'].includes(query.get('type')))applyFilter(query.get('type'));
const quoteLink=document.querySelector('.product-quote');
function updateQuote(){if(!quoteLink)return;const dest=new URL(quoteLink.href);dest.searchParams.set('size',document.querySelector('#detail-size').value);quoteLink.href=dest.pathname+dest.search;}
document.querySelector('#detail-size')?.addEventListener('change',updateQuote);
const form=document.querySelector('.quote-form');
if(form){for(const name of ['product','size']){const value=query.get(name);const field=form.elements.namedItem(name);if(value&&[...field.options].some(o=>o.value===value))field.value=value;}
const serviceIntent=form.dataset.brand==='MUKU'?form.querySelector('#m27-service-intent'):null;
if(serviceIntent){
  const requested=query.get('intent');
  if(['quote','oem','stock'].includes(requested))serviceIntent.value=requested;
  const guidance={oem:'แจ้งผลิตภัณฑ์หรือสูตรที่ต้องการ ขนาดบรรจุ จำนวน แนวทางแบรนด์ และช่วงเวลา เพื่อประเมินขอบเขตงาน OEM เป็นรายโครงการ',stock:'แจ้งสินค้าที่ต้องการดูแล ปริมาณใช้ รอบรับสินค้า และปลายทาง เพื่อหารือการเก็บและทยอยส่ง หรือการวางแผนสต็อก ติดตามยอด และเติมสินค้าตามรอบ พร้อมตกลงขอบเขตและค่าใช้จ่ายก่อนเริ่มบริการ'};
  const requiredFields=['product','size','quantity','province'].map(name=>({field:form.elements.namedItem(name),label:form.querySelector('label[for="'+name+'"]')}));
  requiredFields.forEach(({label})=>{if(label)label.dataset.originalLabel=label.textContent;});
  const updateService=()=>{
    const isService=serviceIntent.value!=='quote',helper=form.querySelector('#m27-service-help');
    if(helper){helper.hidden=!isService;helper.textContent=guidance[serviceIntent.value]||'';}
    requiredFields.forEach(({field,label})=>{if(field)field.required=!isService;if(label)label.textContent=isService?label.dataset.originalLabel.replace(/\s*\*$/,''):label.dataset.originalLabel;});
  };
  const serviceNotes={storage:'สนใจบริการเก็บสินค้าและทยอยจัดส่งตามคำสั่ง',planning:'สนใจบริการวางแผนสต็อก ติดตามยอด และเติมสินค้าตามรอบ'};
  if(serviceIntent.value==='stock'&&serviceNotes[query.get('service')]&&!form.elements.note.value)form.elements.note.value=serviceNotes[query.get('service')];
  serviceIntent.addEventListener('change',updateService);updateService();
}
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=Object.fromEntries(new FormData(form));const purpose={quote:'ขอใบเสนอราคา',trial:'สอบถามการทดลองซื้อ',reorder:'สั่งซื้อซ้ำ / จัดซื้อต่อเนื่อง',document:'ขอเอกสารสินค้า',partner:'หารือสำหรับผู้จัดจำหน่าย',oem:'หารือบริการ OEM',stock:'หารือบริการบริหารสต็อกและเติมสินค้า'};const requestTitle=purpose[f.intent]||(form.dataset.intent==='document'?'ขอเอกสารสินค้า':'ขอใบเสนอราคา');const summary=`${requestTitle} ${form.dataset.brand}${f.industry?'\nกลุ่มธุรกิจ: '+f.industry:''}${f.intent==='reorder'&&f.reference?'\nอ้างอิงเดิม: '+f.reference:''}\nชื่อ: ${f.customer}\nบริษัท: ${f.company||'-'}\nโทร: ${f.phone}\nอีเมล: ${f.email||'-'}\nสินค้า: ${f.product||'-'}\nขนาด: ${f.size==='1000L'?'IBC Tank 1,000 ลิตร':f.size||'-'}\nจำนวนบรรจุภัณฑ์: ${f.quantity||'-'}\nปลายทาง: ${f.province||'-'}\nรายละเอียด: ${f.note||'-'}`;const result=form.querySelector('.form-result');result.hidden=false;result.replaceChildren();const title=document.createElement('h3');title.textContent='ข้อความพร้อมแล้ว';const note=document.createElement('p');note.textContent='ยังไม่ได้ส่งข้อมูล กรุณาคัดลอกข้อความแล้วเปิด LINE หรือเปิดร่างอีเมลเพื่อตรวจและส่งด้วยตนเอง';const pre=document.createElement('div');pre.textContent=summary;const copy=document.createElement('button');copy.type='button';copy.className='btn';copy.textContent='คัดลอกข้อความ';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);copy.textContent='คัดลอกแล้ว ✓';}catch{copy.textContent='โปรดเลือกข้อความด้านบนเพื่อคัดลอก';}});const email=document.createElement('a');email.className='btn btn-outline';email.textContent='เปิดร่างอีเมล';email.href='mailto:sales@etohcols.com?subject='+encodeURIComponent(requestTitle+' '+f.product)+'&body='+encodeURIComponent(summary);const line=document.createElement('a');line.className='btn btn-outline';line.textContent='เปิด LINE';line.target='_blank';line.rel='noopener';line.href=form.dataset.brand==='MUKU'?'https://line.me/R/ti/p/~@mukushop':'https://line.me/R/ti/p/~@etohcols';result.append(title,note,pre,copy,email,line);result.scrollIntoView({behavior:'smooth',block:'center'});});}
