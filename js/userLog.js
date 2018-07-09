$(document).ready(()=> {
    let logUser=localStorage.getItem('loguser') ? JSON.parse(localStorage.getItem('loguser')):[];
    let itemsUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let createOrder=localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
    let newOrder=localStorage.getItem('new_order') ? JSON.parse(localStorage.getItem('new_order')) : [];
    let appendUsers=()=>{
    $('#loginUser').append(
        `${logUser[0].uname} ${logUser[0].usec_name} `
    );
    $('#user_name').append(
        `${logUser[0].uname} ${logUser[0].usec_name} `
    );

}
appendUsers();
//check if the user is in his shift
   let presentTime=new Date().getHours();
   let findObj=itemsUsers.find(x=>x.name==logUser[0].uname);
  
   if (presentTime>=14 & presentTime<22){
       if (findObj.userShift!="2" || findObj.userShift=="#"){
            $('.user_status p').css('display','none');
            $('.user_status').append(
                `<h1>
                Your work time has passed</h1>`
            )
       }
   }
   else if(presentTime>=22 || presentTime<6){
       if (findObj.userShift!="3" || findObj.userShift=="#"){
         $('.user_status p').css('display','none');
         $('.user_status').append(
            `<h1>
            Your work time has passed</h1>`
         )
        } 
   }
   else if(presentTime>=6 & presentTime<14){
    if (findObj.userShift!="1" || findObj.userShift=="#"){
        $('.user_status p').css('display','none');
        $('.user_status').append(
           `<h1>
           Your work time has passed</h1>`
        )
       } 
   }
//if there is open order then
if (createOrder.length>0){
    $('#loguser_name').css('display','none');
    $('#numbersOforders').css('display','block');
    $('.status').css('display','none');
    $('.new_order').css('display','block');
    $('#open_orders').html(createOrder.length);
    if(createOrder.length>3){
        $('.right-box').css('overflow','auto');
    }

    for (let i=createOrder.length-1; i>=0; i--){
        const _createOrder=createOrder[i];

        $('.right-box').append(`
        <div class="new_order" id="new_order${i}">
            <form action=""  id="form1${i}" name="form1${i}">
          <div class="img-box">
              <img src="img/noImage.jpg" alt="machine_picture"  style="width:150px;height:150px;">
          </div>
          <div class="order-table">
              <table class="new-order-table" border="2" style=" border-collapse: collapse;"  >
                  <tbody class="order_body" id="order_body">
                      <tr>
                          <td class="first_td">Nalog</td>
                          <td class="second_td">${_createOrder._orderNo}</td>
                  </tr>
                  <tr>
                          <td class="first_td">Otvoren od:</td>
                          <td class="second_td">${_createOrder._agent}</td>
                  </tr>
                  <tr>
                          <td class="first_td">Vreme otvoren</td>
                          <td class="second_td">${_createOrder._orderNo}</td>
                  </tr>
                  <tr>
                          <td class="first_td">Oddelenie</td>
                          <td class="second_td">${_createOrder._department}</td>
                  </tr>
                  <tr>
                          <td class="first_td">Linija</td>
                          <td class="second_td">${_createOrder._machine}</td>
                  </tr>
                  <tr>
                          <td class="first_td">Opis na problemot</td>
                          <td class="second_td">${_createOrder._note}</td>
                  </tr>
              </tbody>
              </table>
          </div>
         <div class="input_submit">
                <input type="button" id="submit-order${i}" class="proveri" value="SUBMIT">
         </div>
          
      </form>
      </div>
        `);
    }
}
else{
    $('#loguser_name').css('display','block');
    $('#numbersOforders').css('display','none');
    $('.status').css('display','block');
    $('.new_order').css('display','none');
}
// show haw many opend orders have


});