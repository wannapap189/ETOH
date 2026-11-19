const applyURL='/quote/?intent=partner';
const photo=()=>'<img src="/assets/business-v9/app-regional-chemical-distributors-v18.webp" alt="การจัดเตรียมสินค้าและวางแผนกระจายสินค้า" width="1536" height="1024" loading="lazy" decoding="async">';
const applyButton=()=>`<a class="v22-partner-button" href="${applyURL}">แจ้งความสนใจเป็นตัวแทน</a>`;

export function partnerRecruitmentBanner(){
  return `<section class="v9-wrap v22-partner-home" id="partners" aria-labelledby="v22-partner-home-title"><div class="v22-partner-banner"><div class="v22-partner-copy"><small>GROW WITH ETOHCOLS</small><h2 id="v22-partner-home-title">รับสมัครตัวแทนจำหน่าย</h2><p>ต่อยอดธุรกิจของคุณด้วยเอทานอลจาก Etohcols<br>พร้อมข้อมูลสินค้า ตัวอย่างทดสอบ และการประสานจัดส่ง</p><div class="v22-partner-tags"><span>ร้านเคมีภัณฑ์</span><span>ร้านวัตถุดิบ</span><span>ผู้ค้าส่งและผู้ขายออนไลน์</span></div><a class="v22-partner-button" href="/partner/">ดูรายละเอียดการเป็นตัวแทน</a></div><figure>${photo()}</figure></div></section>`;
}

export function partnerPage(){
  const profiles=[
    ['ร้านเคมีภัณฑ์และผู้จำหน่ายในพื้นที่','เพิ่มทางเลือกสำหรับลูกค้าธุรกิจและโรงงานในจังหวัดของคุณ โดยเริ่มจากประเภทสินค้าและปริมาณที่ลูกค้าใช้อยู่'],
    ['ร้านวัตถุดิบเครื่องสำอางและน้ำหอม','เลือกสินค้าให้ตรงสูตร เกรด และข้อกำหนดของลูกค้า พร้อมขอข้อมูลประกอบการเสนอขายจากทีมงาน'],
    ['ผู้ค้าส่ง ผู้ขายออนไลน์ และผู้จัดหาสินค้า','เข้าถึงผู้ประกอบการผ่านช่องทางที่คุณถนัด พร้อมวางแผนรับสินค้า การจัดส่ง และรอบสั่งซื้อซ้ำ']
  ];
  const support=[
    ['ข้อมูลสินค้าและเอกสาร','ประสาน SPEC, COA และ SDS ของรายการที่สนใจ เพื่อช่วยเลือกสินค้าและตอบคำถามลูกค้า เอกสารฉบับจริงขอผ่านทีมงาน','/quality/','ดูประเภทเอกสาร'],
    ['ตัวอย่างสำหรับทดสอบ','ขอตัวอย่างทดสอบตามโจทย์การใช้งานได้ฟรี โดยค่าจัดส่งพิจารณาตามพื้นที่และแจ้งก่อนส่ง','/quote/?intent=sample','ขอตัวอย่างทดสอบ'],
    ['แผนส่งมอบและเติมสินค้า','ประสานขนาดบรรจุ ปริมาณ ปลายทาง และรอบรับสินค้า เพื่อให้แผนจัดซื้อสอดคล้องกับยอดใช้ของลูกค้า','/logistics/','ดูแนวทางการจัดส่ง']
  ];
  return `<nav class="v9-wrap v9-breadcrumb" aria-label="เส้นทางหน้า"><a href="/">หน้าแรก</a><span>/</span><span>รับสมัครตัวแทนจำหน่าย</span></nav>
  <section class="v9-wrap v22-partner-hero"><div><div class="v9-eyebrow">BECOME AN ETOHCOLS PARTNER</div><h1>รับสมัคร<br>ตัวแทนจำหน่าย <em>Etohcols</em></h1><p>คุณเข้าใจลูกค้าในตลาดของคุณ<br>เราช่วยประสานสินค้า ข้อมูล และแผนส่งมอบ</p><div class="v22-partner-actions">${applyButton()}<a class="a17-read" href="#partner-support">ทีมงานช่วยดูแลอะไรบ้าง</a></div></div><figure>${photo()}</figure></section>
  <section class="v9-wrap v22-partner-section"><div class="v9-eyebrow">BUILT AROUND YOUR MARKET</div><h2>ขยายตลาดไปด้วยกัน<br>ผ่านช่องทางที่คุณถนัด</h2><div class="v22-partner-grid">${profiles.map(([t,d])=>`<article><h3>${t}</h3><p>${d}</p></article>`).join('')}</div></section>
  <section class="v22-partner-support" id="partner-support"><div class="v9-wrap"><div class="v9-eyebrow">SUPPORT FOR YOUR NEXT SALE</div><h2>มีข้อมูลพร้อมคุยกับลูกค้า<br>มีแผนพร้อมสำหรับการสั่งซื้อ</h2><div class="v22-partner-grid">${support.map(([t,d,u,a])=>`<article><h3>${t}</h3><p>${d}</p><a class="a17-read" href="${u}">${a}</a></article>`).join('')}</div></div></section>
  <section class="v9-wrap v22-partner-section v22-partner-start"><div><div class="v9-eyebrow">LET’S DISCUSS YOUR BUSINESS</div><h2>เริ่มจากตลาดที่คุณดูแล</h2><p>แจ้งพื้นที่ขาย กลุ่มลูกค้า ช่องทางจำหน่าย และสินค้าที่สนใจ เพื่อให้ทีมพูดคุยรูปแบบความร่วมมือที่เหมาะกับธุรกิจของคุณ</p>${applyButton()}</div><div class="v22-partner-next"><h3>ข้อมูลที่เราจะคุยร่วมกัน</h3><ul><li>สินค้า สเปก และขนาดบรรจุที่ลูกค้าต้องการ</li><li>ปริมาณโดยประมาณและรอบเติมสินค้า</li><li>พื้นที่ขาย ปลายทาง และวิธีรับสินค้า</li><li>ราคา ความพร้อม และเงื่อนไขการเป็นตัวแทน</li></ul><p>ทีมงานจะยืนยันเงื่อนไขเป็นรายธุรกิจ หลังรับข้อมูลและหารือร่วมกัน</p></div></section>`;
}
