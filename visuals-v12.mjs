const scene=(image,title,description)=>({image,title,description});
const perfume=scene('fragrance-shop-v12','ร้านน้ำหอมและแบรนด์รายย่อย','ผู้ผสมน้ำหอมแอลกอฮอล์ต้องประเมินกลิ่น ความใส และความเข้ากันได้กับหัวน้ำหอม ก่อนเลือกวัตถุดิบสำหรับสูตรของร้าน');
const formulation=scene('fragrance-natural-v12','ผู้พัฒนาสูตรเครื่องสำอาง','พิจารณาบทบาทของเอทานอลในสูตร ทดสอบความคงตัว กลิ่น และผลต่อส่วนผสมอื่นตามข้อกำหนดผลิตภัณฑ์');
const hygiene=scene('hygiene-products-v12','สเปรย์ เจล และผลิตภัณฑ์สุขอนามัย','เป็นตัวอย่างผลิตภัณฑ์ปลายทางที่บางสูตรใช้เอทานอล ต้องยืนยันสูตร เกรด และผลทดสอบของผลิตภัณฑ์สำเร็จรูปแยกกัน');
const filling=scene('hygiene-filling-natural-v12','โรงงานผลิตผลิตภัณฑ์สุขอนามัย','เลือกวัตถุดิบให้ตรงสูตรที่ผ่านการประเมิน พร้อมวางปริมาณใช้ รอบผลิต และเอกสารรับเข้าให้สอดคล้องกัน');
const development=scene('hygiene-development-natural-v12','ห้องพัฒนาสูตรและทดสอบ','ตรวจความเข้ากันได้กับส่วนผสมและบรรจุภัณฑ์ ก่อนขยายจากตัวอย่างไปสู่การผลิตจริง');
const quality=scene('quality-natural-v12','ห้องปฏิบัติการและฝ่ายคุณภาพ','ตรวจสเปก สิ่งเจือปน และข้อกำหนดของวิธีทดสอบ ชื่อสินค้าและเปอร์เซ็นต์เพียงอย่างเดียวไม่ยืนยันเกรดวิเคราะห์หรือเกรดยา');
const pharma=scene('pharma-packaging-v12','ผู้ผลิตยาและผลิตภัณฑ์สุขภาพ','บางสูตรใช้เอทานอลเป็นตัวทำละลายหรือส่วนประกอบ ต้องเลือกเฉพาะเกรดและเอกสารที่ฝ่ายคุณภาพอนุมัติสำหรับงานนั้น');
const extraction=scene('extraction-natural-v12','ผู้ผลิตสารสกัดจากพืช','เลือกสัดส่วนเอทานอลและน้ำตามสารที่ต้องการสกัด พร้อมประเมินกระบวนการและสารตกค้างของผลิตภัณฑ์ปลายทาง');
const flavor=scene('food-flavor-workshop-v12','ผู้ผลิตกลิ่นรสและวัตถุดิบอาหาร','พิจารณาเอทานอลไม่แปลงสภาพเฉพาะเกรดที่ยืนยันการใช้ในอาหารได้ เพื่อนำไปเป็นตัวทำละลายหรือใช้ในกระบวนการที่กำหนด');
const printing=scene('printing-natural-v12','โรงพิมพ์และผู้ผลิตหมึก','ระบบหมึกเฟล็กโซหรือกราเวียร์บางสูตรใช้เอทานอล ต้องทดสอบกับเรซิน สี และตัวทำละลายร่วมของระบบจริง');
const packaging=scene('print-packaging-shop-v12','งานพิมพ์ฉลากและบรรจุภัณฑ์','ชนิดวัสดุ งานพิมพ์ และข้อกำหนดสารตกค้างแตกต่างกัน ให้ประเมินสูตรหมึกและสารเคลือบก่อนเปลี่ยนวัตถุดิบ');
const coating=scene('resin-coating-workshop-v12','ผู้ผลิตกาวและสารเคลือบ','ใช้ได้ในบางระบบที่ออกแบบให้รับเอทานอล ต้องตรวจการละลาย การแห้ง การยึดเกาะ และผลของสารแปลงสภาพ');
const chemical=scene('chemical-natural-v12','โรงงานผสมเคมีภัณฑ์','เลือกความเข้มข้นและองค์ประกอบตามสูตรการผลิต โดยเฉพาะงานที่ควบคุมปริมาณน้ำหรือสารตกค้าง');
const glass=scene('glass-cleaning-natural-v12','ผู้ผลิตน้ำยาเช็ดกระจก','บางสูตรใช้เอทานอลเป็นตัวทำละลายร่วม ควรเทียบการแห้ง คราบหลังเช็ด กลิ่น และความเข้ากันได้กับพื้นผิว');
const industrial=scene('industrial-cleaning-natural-v12','โรงงานและงานทำความสะอาดชิ้นงาน','ประเมินชนิดคราบ วัสดุ และวิธีทำงาน เพื่อเลือกสูตรที่ผ่านการทดสอบกับพื้นผิวจริง');
const surface=scene('surface-testing-natural-v12','ผู้พัฒนาสูตรสำหรับพื้นผิวเฉพาะ','ทดสอบคราบตกค้างและความเสียหายที่อาจเกิดกับพลาสติก ยาง สี หรือผิวเคลือบ ก่อนใช้งานหรือผลิตจำหน่าย');
const supply=scene('cleaning-supply-store-v12','ร้านน้ำยาทำความสะอาดและคู่ค้า','ร้านที่มีการผลิตหรือว่าจ้างผลิตตามสูตร ควรแยกสเปกวัตถุดิบจากสินค้าพร้อมใช้ และวางรอบเติมให้ตรงยอดขาย');
const retail=scene('ingredients-store-v12','ร้านวัตถุดิบและร้านเคมีภัณฑ์','จัดรายการตามกลุ่มลูกค้าของร้าน แยก PHARMOL และ ETOH ให้ชัด พร้อมเอกสารที่ส่งต่อให้ผู้ซื้อได้');
export const businessScenes={
 'hygiene':[hygiene,filling,development],
 'cosmetics-fragrance':[perfume,formulation,development],
 'pharmaceutical-healthcare':[pharma,quality,development],
 'food-extraction':[flavor,extraction,quality],
 'printing-coating':[packaging,printing,coating],
 'chemical-manufacturing':[chemical,coating,retail],
 'industrial-cleaning':[supply,glass,industrial],
 'distribution':[retail,perfume,supply]
};
export function productScenes(p){
 const ph=p.brand==='PHARMOL';
 return (ph?{'96':[perfume,formulation,development],'95':[flavor,extraction,quality],'99.9':[quality,formulation,chemical]}:{'96':[supply,glass,industrial],'95':[packaging,printing,coating],'99.9':[chemical,coating,surface],'70':[industrial,supply,surface],'75':[surface,glass,supply]})[p.percent];
}
