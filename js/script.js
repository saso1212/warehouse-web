// let submit_new_dept=document.getElementById('submit_new_dept');
let itemsDepartment = localStorage.getItem('dept') ? JSON.parse(localStorage.getItem('dept')) : [];

    document.getElementById('id_dept').value=itemsDepartment.length+1;



document.getElementById('form4').addEventListener('submit',function(e){
e.preventDefault();

let id_dept=document.getElementById('id_dept').value;
let new_department=document.getElementById('new_dept').value;
let dept_description=document.getElementById('description').value;
let Obj_dept={
    id:id_dept,
    department:new_department,
    deptDecription:dept_description
 };
 itemsDepartment.push(Obj_dept);

 localStorage.setItem('dept', JSON.stringify(itemsDepartment));

 
 document.getElementById('new_dept').value="";
 document.getElementById('description').value="";
 document.getElementById('id_dept').value=itemsDepartment.length+1;

});
document.getElementById('logout').addEventListener('click',()=>{
    window.location.replace("login.html");
})



