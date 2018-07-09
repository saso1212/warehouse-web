let itemsNewMachine = localStorage.getItem('machine') ? JSON.parse(localStorage.getItem('machine')) : [];

    document.getElementById('id_machine').value=itemsNewMachine.length+1;



document.getElementById('form2').addEventListener('submit',function(e){
e.preventDefault();

let id_machine=document.getElementById('id_machine').value;
let new_department=document.getElementById('oddelenie_masina').value;
let costumer=document.getElementById('proizvoitel').value;
let model=document.getElementById('model').value;
let opis=document.getElementById('opis').value;
let s_no=document.getElementById('s_no').value;



let Obj_machine={
    id:id_machine,
    department:new_department,
    macine_costumer:costumer,
    machine_model:model,
    machine_opis:opis,
    machine_s_no:s_no,
  
 };
 itemsNewMachine.push(Obj_machine);

 localStorage.setItem('machine', JSON.stringify(itemsNewMachine));

document.getElementById('oddelenie_masina').value="";
document.getElementById('proizvoitel').value="";
document.getElementById('model').value="";
document.getElementById('opis').value="";
document.getElementById('s_no').value="";
document.getElementById('id_machine').value=itemsNewMachine.length+1;

})