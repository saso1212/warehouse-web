let itemsNewSparePart=localStorage.getItem('spare_parths') ? JSON.parse(localStorage.getItem('spare_parths')) : [];
document.getElementById('id_spare_parth').value=itemsNewSparePart.length+1;



document.getElementById('form3').addEventListener('submit',function(e){
e.preventDefault();

let id_spare_parth=document.getElementById('id_spare_parth').value;
let oddelenie_masina=document.getElementById('oddelenie_masina').value;
let linija_masina=document.getElementById('linija_masina').value;
let proizvoditel=document.getElementById('proizvoitel').value;
let oznaka=document.getElementById('oznaka').value;
let opis_spare_parth=document.getElementById('opis_spare_parth').value;
let s_no_spare_parth=document.getElementById('s_no_spare_parth').value;
let kolicina_spare_parth=document.getElementById('kolicina_spare_parth').value;
let ed_merka=document.getElementById('ed_merka').value;
let minimalna_zaliha=document.getElementById('minimalna_zaliha').value;




let Obj_SpareParth={
    id:id_spare_parth,
    department:oddelenie_masina,
    linija:linija_masina,
   costumer:proizvoditel,
    opis:opis_spare_parth,
    parth_s_no:s_no_spare_parth,
    quantity:kolicina_spare_parth,
    part_value:ed_merka,
    min_value:minimalna_zaliha
  
 };
 itemsNewSparePart.push(Obj_SpareParth);

 localStorage.setItem('spare_parths', JSON.stringify(itemsNewSparePart));

document.getElementById('id_spare_parth').value="";
document.getElementById('oddelenie_masina').value="";
 document.getElementById('linija_masina').value="";
 document.getElementById('proizvoitel').value="";
 document.getElementById('oznaka').value="";
 document.getElementById('opis_spare_parth').value="";
 document.getElementById('s_no_spare_parth').value="";
 document.getElementById('kolicina_spare_parth').value="";
 document.getElementById('ed_merka').value="";
 document.getElementById('minimalna_zaliha').value="";
 
document.getElementById('id_spare_parth').value=itemsNewSparePart.length+1;

})