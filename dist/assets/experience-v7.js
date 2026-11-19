(()=>{
const stage=document.querySelector('.warehouse-stage');
if(stage){document.querySelectorAll('[data-product-view]').forEach(button=>button.addEventListener('click',()=>{stage.classList.toggle('is-packshot',button.dataset.productView==='packshot');document.querySelectorAll('[data-product-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}));}
const planner=document.getElementById('delivery-plan-form');if(!planner)return;
const params=new URLSearchParams(location.search);for(const name of ['product','size','quantity']){const field=planner.elements.namedItem(name),value=params.get(name);if(!value)continue;if(field.tagName==='SELECT'&&[...field.options].some(o=>o.value===value))field.value=value;if(name==='quantity'&&Number.isInteger(Number(value))&&Number(value)>=1&&Number(value)<=100000)field.value=value;}
document.querySelectorAll('[data-vehicle-pick]').forEach(link=>link.addEventListener('click',()=>{planner.elements.namedItem('vehicle').value=link.dataset.vehiclePick;}));
planner.addEventListener('submit',e=>{e.preventDefault();if(!planner.reportValidity())return;const d=Object.fromEntries(new FormData(planner));const vehicle=d.vehicle==='recommend'?'ให้ทีมงานแนะนำรถ':`รถ ${d.vehicle} ล้อตู้ทึบ ประตูสไลด์ด้านข้าง`;const note=`สอบถามราคาและวางแผนจัดส่ง\nรถที่สนใจ: ${vehicle}\nจังหวัด: ${d.province}\nช่วงรับสินค้า: ${d.window||'รอยืนยัน'}\nรายละเอียดหน้างาน: ${d.note||'-'}`;location.href='/quote/?'+new URLSearchParams({product:d.product,size:d.size,quantity:d.quantity,province:d.province,note});});
})();
