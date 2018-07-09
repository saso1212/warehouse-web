$(document).ready(()=> {
    let itemsUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    let populateShift=(id,array)=>{
        $(`${id}`).html('');
        $.each(array,function(i,val){
           
          
            if (i%5==0){
                $(`${id}`).append(`<div class="red">`);
            }
          $(`${id}`).append(`
         
          <div class="name-box">
          <div class="name">
              <p>${val.name}</p>
              <p>${val.second_name}</p>
          </div>
            <div class="status-smena">
              <h4>${val.privilege}</h4>
              <form action="" method="" id="user${val.id}">
                         <select name="smena" id="smena${val.id}" >
                             <option value="0">#</option>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                         </select>     
                     </form>
                     <div style="clear: both;"></div>
             </div>
      </div>
     
       `
           );
           if(i%5==1){
               $(`${id}`).append(`</div>`);
           }
           
         $(`#smena${val.id}`).val(`${val.userShift}`);
         $(`#user${val.id}`).on("change",()=>{
            let p2=$(`#smena${val.id}`).val();
            itemsUsers[`${i}`].userShift=p2;
            localStorage.setItem('users', JSON.stringify(itemsUsers));
            populateShift('#smeniID',itemsUsers);
         })
    }
   
   
)};
populateShift('#smeniID',itemsUsers);


let changeTime=()=>{
    let time= new Date().getHours().toString();
    if(time=="6" || time=="14")
    {
        $('#promeni_smena').html(time + 8 +" : 00 h");
    }
    else if (time=="22"){
        $('#promeni_smena').html("6 : 00 h");
    }
   
    
}
setTimeout(changeTime, 6000);

let orederChangeByPrivilage=()=>{
    itemsUsers.sort(function(a, b) {
        let nameA = a.privilege.toUpperCase(); // ignore upper and lowercase
        let nameB = b.privilege.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      populateShift('#smeniID',itemsUsers);
};

let oderChangeBySecName=()=>{
    itemsUsers.sort(function(a, b) {
        let nameA = a.second_name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.second_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      populateShift('#smeniID',itemsUsers);
}
let orderChange=()=>{
    itemsUsers.sort(function(a, b) {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      populateShift('#smeniID',itemsUsers);
    
}
$('input[type=radio][name=group1]').change(function() {
    if (this.value == '0') {
        orderChange();
    }
    else if (this.value == '1') {
        oderChangeBySecName();
    }
    else if (this.value=='2'){
        orederChangeByPrivilage();
    }
});

orderChange();
});
