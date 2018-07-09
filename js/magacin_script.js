$(document).ready(()=> {
    let magacinItemsLine = localStorage.getItem('spare_parths') ? JSON.parse(localStorage.getItem('spare_parths')) : [];
    //array
    let populateTable=(id,array)=>{
      
      $(`${id}`).html('');
      $.each(array,function(i,val){
        $(`${id}`).append(`
        <tr>
        <td id="parthID${i}">${i+1}</td>
        <td id="th_line${i}">${val.linija}</td>
        <td id="p_s_no_${i}" >${val.parth_s_no}</td>
        <td id="th_model${i}" ">${val.costumer}</td>
        <td id="th_opis${i}">${val.opis}</td>
        <td id="quantity${i}">${val.quantity}</td>
        <td id="part_value${i}">${val.part_value}</td>
        <td id="min_value${i}">${val.min_value}</td>
        <td id="dept_lit${i}"><button class="btn_department " id="dept_btn_lit${i}">L</button></td>
        <td id="dept_edit${i}"><button class="btn_department" id="dept_btn_edit${i}">E</button><button style="display:none;" class="btn_department" id="dept_btn_save${i}">S</button></td>
        <td id="dept_delete${i}"><button class="btn_department del-row" id="dept_btn_delete${i}">D</button></td>
     </tr> `
         );
         //alert in ftere is limit spare parts
         if (val.quantity<=val.min_value){

            $(`#tbody_line tr:nth-child(${i+1})`).css('background','red');

         }
        $(`#dept_btn_delete${i}`).click(function(){
       
          array.splice(i,1);
          localStorage.removeItem('spare_parths');
          localStorage.setItem('spare_parths', JSON.stringify(magacinItemsLine));
          populateTable('#tbody_line',magacinItemsLine);
          $('.pagination').html("");
          createPagination();
          
        })
        $(`#dept_btn_edit${i}`).on("click",()=>{
               
         

        let p2=$(`#parthID${i}`).text();
        let p3=$(`#th_line${i}`).text();
        let p4=$(`#p_s_no_${i}`).text();
        let p5=$(`#th_model${i}`).text();
        let p6=$(`#th_opis${i}`).text();
        let p7=$(`#quantity${i}`).text();
        let p8=$(`#part_value${i}`).text();
        let p9=$(`#min_value${i}`).text();
        
        $(`#parthID${i}`).html(`<input type="text" value="${p2}" class="text-centered">`);
        $(`#th_line${i}`).html(`<input type="text" value="${p3}" class="text-centered">`);
        $(`#p_s_no_${i}`).html(`<input type="text" value="${p4}" class="text-centered">`);
        $(`#th_model${i}`).html(`<input type="text" value="${p5}" class="text-centered">`);
        $(`#th_opis${i}`).html(`<input type="text" value="${p6}" class="text-centered">`);
        $(`#quantity${i}`).html(`<input type="text" value="${p7}" class="text-centered">`);
        $(`#part_value${i}`).html(`<input type="text" value="${p8}" class="text-centered">`);
        $(`#min_value${i}`).html(`<input type="text" value="${p9}" class="text-centered">`);
          
          $(`#dept_btn_edit${i}`).css('display','none');
          $(`#dept_btn_save${i}`).css('display','inline-block');
      })
      $(`#dept_btn_save${i}`).on('click',()=>{

        let p2=$(`#parthID${i} input` ).val();
        let p3=$(`#th_line${i} input`).val();
        let p4=$(`#p_s_no_${i} input`).val();
        let p5=$(`#th_model${i} input`).val();
        let p6=$(`#th_opis${i} input`).val();
        let p7=$(`#quantity${i} input`).val();
        let p8=$(`#part_value${i} input`).val();
        let p9=$(`#min_value${i} input`).val();


        $(`#parthID${i}`).text(p2);
        $(`#th_line${i}`).text(p3);
        $(`#p_s_no_${i}`).text(p4);
        $(`#th_model${i}`).text(p5);
        $(`#th_opis${i}`).text(p6);
        $(`#quantity${i}`).text(p7);
        $(`#part_value${i}`).text(p8);
        $(`#min_value${i}`).text(p9);
        $(`#dept_btn_edit${i}`).css('display','inline-block');
        $(`#dept_btn_save${i}`).css('display','none');
        
        array[i].linija=p3;
        array[i].parth_s_no=p4;
        array[i].costumer=p5;
        array[i].opis=p6;
        array[i].quantity=p7;
        array[i].part_value=p8;
        array[i].min_value=p9;
     
        localStorage.removeItem('spare_parths');
        localStorage.setItem('spare_parths', JSON.stringify(magacinItemsLine));
        populateTable('#tbody_line',magacinItemsLine);
        $('.pagination').html("");
        createPagination();
        
        
       
     })
      })
    };
    populateTable('#tbody_line',magacinItemsLine);

   

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