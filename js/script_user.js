let itemsUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    document.getElementById('id_user').value=itemsUsers.length+1;



document.getElementById('form5').addEventListener('submit',function(e){
e.preventDefault();

let id_user=document.getElementById('id_user').value;
let user_name=document.getElementById('user_name').value;
let user_second_name=document.getElementById('user_second_name').value;
let user_email=document.getElementById('user_email').value;
let phone_no=document.getElementById('phone_no').value;
let privileges=document.getElementById('privileges').value;
let login_email=document.getElementById('login_email').value;
let loginPass=document.getElementById('login_pass').value;
let confirmPass=document.getElementById('confirm_pass').value;

if (loginPass!=confirmPass){
    alert(`Please enter the the real value for the password`);
    return;
}
let Obj_dept={
    id:id_user,
    name:user_name,
    second_name: user_second_name,
    e_mail:user_email,
    phone: phone_no,
    privilege:privileges,
    login_email:login_email,
    login_pass:loginPass,
    confirmPassword:confirmPass,
    userShift:"1"
 };
 itemsUsers.push(Obj_dept);
 localStorage.setItem('users', JSON.stringify(itemsUsers));

 document.getElementById('user_name').value="";
 document.getElementById('user_second_name').value="";
 document.getElementById('user_email').value="";
 document.getElementById('phone_no').value="";
 document.getElementById('privileges').value="";
 document.getElementById('login_email').value="";
 document.getElementById('login_pass').value="";
 document.getElementById('confirm_pass').value="";
 document.getElementById('id_user').value=itemsUsers.length+1;

})