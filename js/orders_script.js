$(document).ready(()=> {

    let createOrder=localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [];
    let newOrder=localStorage.getItem('new_order') ? JSON.parse(localStorage.getItem('new_order')) : [];

    let popoulateTable=(id,array)=>{
        $(`${id}`).html('');
        for (let i=newOrder.length-1; i>=0; i--){
            const _newOrder=newOrder[i];
            
            $(`${id}`).append(`
            <tr>
            <td id="orderID${i}">${_newOrder._orderNo}</td>
            <td id="th_timeOpen${i}">${_newOrder._dateTimeOpen}</td>
            <td id="agent${i}" >${_newOrder._agent}</td>
            <td id="seriser${i}" ">${_newOrder._serviser}</td>
            <td id="department${i}" style:"font-size:14px; overflow: hidden; padding:3px;">${_newOrder._department}</td>
            <td id="machine${i}">${_newOrder._machine}</td>
            <td id="generalIntervention${i}">${_newOrder._generalIntervention}</td>
            <td id="remontIntervention${i}">${_newOrder._remontIntervention}</td>
            <td id="th_timeClose${i}">${_newOrder._dateTimeClose}</td>
            <td id="orderStatus${i}">${_newOrder._status}</td>
            <td id="dept_edit${i}"><button class="btn_department" id="dept_btn_edit${i}">E</button></td>
            <td id="dept_delete${i}"><button class="btn_department del-row" id="dept_btn_delete${i}">D</button></td>
         </tr> `
             );
             let rowLength=$('tr').length;
             if(_newOrder._status=="Open"){
                $(`#tbody_line tr:nth-child(${rowLength-1})`).css('background','yellow');
             }
    
        }
    }
    popoulateTable('#tbody_line',newOrder);
    let createPagination=()=>{
        $('.pagination').html("");
        let numberOfItems=$('#tbody_line tr').length;
        let  limitPerPage=18;
        let listGroup=$('#tbody_line tr');
     
        $("#tbody_line tr:gt("+ (limitPerPage-1) +")").hide();
         let totalPages=Math.ceil(numberOfItems/limitPerPage);
        
       $('.pagination').append(` <a href="#"  class="prew-page"><div class="btn_pagination"><</div></a>`)
         $('.pagination').append(` <a href="#"  class="page-item active"><div class="btn_pagination">${1}</div></a>`);
         for (let i=2; i<=totalPages; i++){
            $('.pagination').append(` <a href="#"  class="page-item"><div class="btn_pagination">${i}</div></a>`);
         }
     
         $('.pagination').append(`<a href="#"  class="next-page"><div class="btn_pagination">></div></a>`);
     
         $('.pagination .page-item').on('click',function(){
           if( $(this).hasClass("active")){
              return;
           }
           else
           {
                  let currentPage=$(this).index();
                  console.log(currentPage);
                 $('.pagination .page-item').removeClass('active');
                 $(this).addClass("active");
                  $('#tbody_line tr').hide();
                 let grandTotoal=limitPerPage*currentPage;
                 for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
                   //   :eq() gives the real value like eq[6]
                   $("#tbody_line tr:eq("+ i +")").show();
               
                }
           }
         })
       $('.next-page').on('click',function(){
           let currentPage=$('.pagination .active').index();
            console.log(currentPage);
           if(currentPage===totalPages){
               return false;
           }
           else{
        
               currentPage++;
               $('.pagination a').removeClass('active');
               // $(this).addClass("active");
               $('#tbody_line tr').hide();
               let grandTotoal=limitPerPage*currentPage;
               for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
                 //   :eq() gives the real value like eq[6]
                 $("#tbody_line tr:eq("+ i +")").show();
             
               }
               $(".pagination a.page-item:eq(" + ( currentPage-1) +")").addClass("active");
           }
       
       });
       
       $('.prew-page').on('click',function(){
          
           let currentPage=$('.pagination a.active').index();
           if(currentPage==1){
               return false;
           }
           else
           {
             
               currentPage--;
               $('.pagination a').removeClass('active');
               $('#tbody_line tr').hide();
               let grandTotoal=limitPerPage*currentPage;
               for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
                 $("#tbody_line tr:eq("+ i +")").show();
               }
               $(".pagination a.page-item:eq(" + ( currentPage-1) +")").addClass("active");
           }
       
       });
     }
     createPagination();
   
});