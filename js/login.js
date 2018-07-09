$(document).ready(()=> {

    let itemsUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let logUser=localStorage.getItem('loguser') ? JSON.parse(localStorage.getItem('loguser')):[];
   $('#form8').submit((e)=>{
    e.preventDefault();
    let username=$('#user_name_log').val();
    let password=$("#user_pass_log").val();
    let hasloaed=false;
    $.each(itemsUsers,(i,val)=>{

        if (username==val.login_email & password==val.login_pass){
            window.location.replace("index.html");
        //     localStorage.removeItem('spare_parths');
        //   localStorage.setItem('spare_parths', JSON.stringify(magacinItemsLine));
             logUser=[];
            let ObjLogUser={
                uname:val.name,
                usec_name:val.second_name
            }
            logUser.push(ObjLogUser);
            localStorage.setItem('loguser', JSON.stringify(logUser));
            hasloaed=true;
        }
        
        else if(itemsUsers.length==i+1){
           if(hasloaed==false){
               alert('Pleas enter correct user_name or password');
           }
        }
    })
 
   });
 
})