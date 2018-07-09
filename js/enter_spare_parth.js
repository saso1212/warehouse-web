$(document).ready(()=> {
let itemsLine = localStorage.getItem('machine') ? JSON.parse(localStorage.getItem('machine')) : [];
let createOrder=localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
let newOrder=localStorage.getItem('new_order') ? JSON.parse(localStorage.getItem('new_order')) : [];
let logUser=localStorage.getItem('loguser') ? JSON.parse(localStorage.getItem('loguser')):[];

$('#agent').val(logUser[0].uname + " " +logUser[0].usec_name);
//function for filtering departments
$('#oddelenie_masina').change(function(){
    let oddeelnie=this.value;
    let newitemsLine = localStorage.getItem('machine') ? JSON.parse(localStorage.getItem('machine')) : [];
    $('.linija_masina').css('display','none');
    $('#linija_masina').html("");
    for (let i=0; i<newitemsLine.length; i++){
        let s=newitemsLine[i].department;
      if( s != oddeelnie){
        newitemsLine.splice(i,1);
        i--;
      }
    } 
    $('.linija_masina').css('display','block');
    createSelectMenyDeptLine(newitemsLine);
});

let createSelectMenyDeptLine=(array)=>{
    $.each(array,(i,val)=>{
       
     $('#linija_masina').append(
       `  <option class='${val.macine_costumer}' value="${val.macine_costumer} ${val.machine_model}">${val.macine_costumer} ${val.machine_model}</option>`
     )
    })
   }

//  create object for order
   $('#form1').on('submit',()=>{
      let orderNo=(createOrder.length+1 + " - " + ((new Date().getFullYear()).toString()).slice(2)).toString();
      let prioritedChecked="";
     if($("#prioritet").is(':checked')){
      prioritedChecked=$("#prioritet").val().toString();
     }
     else{
      prioritedChecked="";
     }
      let agent=$('#agent').val();
      debugger;
      let department="";
      let department1=$('#oddelenie_masina').val();
      if (department1.length>22){
        department= department1.substring(0,22);
       }
       else{
         department=department1;
       }
      let machine="";
      let machine1=$('#linija_masina').val();
      if (machine1.length>18){
       machine= machine1.substring(0,18);
      }
      else{
        machine=machine1;
      }
      // let machine=$('#linija_masina').val();
      let today = new Date();
      let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+((today.getFullYear()).toString()).slice(2);
      let time = today.getHours() + ":" + today.getMinutes();
      let dateTimeOpen = date+' '+time;
      let dateTimeClose="";
      let generalIntervention="";
      if($("#opstaIntervencija").is(':checked')){
        generalIntervention=$("#opstaIntervencija").val().toString();
       }
       else{
        generalIntervention="";
       }
       let remontIntervention="";
       if($("#remontnaIntervencija").is(':checked')){
        remontIntervention=$("#remontnaIntervencija").val().toString();
       }
       else{
        remontIntervention="";
       }
      let note=$('#zbeleska').val();
      let status="Open";
      let serviser="";

       let order_dept={
         _agent:agent,
         _serviser:serviser,
         _orderNo:orderNo,
         _prioritedChecked: prioritedChecked,
         _agent:agent,
         _machine:machine,
         _department: department,
         _dateTimeOpen:dateTimeOpen,
         _dateTimeClose:dateTimeClose,
         _generalIntervention:generalIntervention,
         _remontIntervention:remontIntervention,
         _note:note,
         _status:status
       };
      createOrder.push(order_dept);
      newOrder.push(order_dept);
      localStorage.setItem('order', JSON.stringify(createOrder));
      localStorage.setItem('new_order', JSON.stringify(newOrder));
   });



})

