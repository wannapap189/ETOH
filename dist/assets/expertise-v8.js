(()=>{
const form=document.querySelector('.quote-form[data-brand="ETOH COLS"]');if(!form)return;
const params=new URLSearchParams(location.search);
for(const key of ['intent','industry']){const field=form.elements.namedItem(key),value=params.get(key);if(field&&value&&Array.from(field.options).some(o=>o.value===value))field.value=value;}
const intent=form.elements.namedItem('intent');if(!intent)return;
if(location.pathname==='/partner/'&&!params.has('intent'))intent.value='partner';
const update=()=>{const box=document.getElementById('reorder-reference-field');if(box)box.hidden=intent.value!=='reorder';};
intent.addEventListener('change',update);update();
})();
