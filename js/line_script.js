$(document).ready(()=> {
    let itemsLine = localStorage.getItem('machine') ? JSON.parse(localStorage.getItem('machine')) : [];
    //array
    let populateTable=(id,array)=>{
      
      $(`${id}`).html('');
      $.each(array,function(i,val){
        $(`${id}`).append(`
        <tr>
        <td id="costumer_${i}">${val.macine_costumer}</td>
        <td id="model_${i}" >${val.machine_model}</td>
        <td id="opis${i}" style="font-size:15px;">${val.machine_opis}</td>
        <td id="machine_s_no_${i}">${val.machine_s_no}</td>
        <td id="department_${i}" style="font-size:15px;">${val.department}</td>
        <td id="dept_lit${i}"><button class="btn_department " id="dept_btn_lit${i}">L</button></td>
        <td id="dept_edit${i}"><button class="btn_department" id="dept_btn_edit${i}">E</button><button style="display:none;" class="btn_department" id="dept_btn_save${i}">S</button></td>
        <td id="dept_delete${i}"><button class="btn_department del-row" id="dept_btn_delete${i}">D</button></td>
     </tr> 
        `);
        $(`#dept_btn_delete${i}`).click(function(){
       
          array.splice(i,1);
          localStorage.removeItem('machine');
          localStorage.setItem('machine', JSON.stringify(itemsLine));
          populateTable('#tbody_line',itemsLine);
          createPagination();
          
        })
        $(`#dept_btn_edit${i}`).on("click",()=>{
               
           
          let p2=$(`#costumer_${i}`).text();
          let p3=$(`#model_${i}`).text();
          let p4=$(`#opis${i}`).text();
          let p5=$(`#machine_s_no_${i}`).text();
          let p6=$(`#department_${i}`).text();
        
          
          $(`#costumer_${i}`).html(`<input type="text" value="${p2}" class="text-centered">`);
          $(`#model_${i}`).html(`<input type="text" value="${p3}" class="text-centered">`);
          $(`#opis${i}`).html(`<input type="text" value="${p4}" class="text-centered">`);
          $(`#machine_s_no_${i}`).html(`<input type="text" value="${p5}" class="text-centered">`);
          $(`#department_${i}`).html(`<input type="text" value="${p6}" class="text-centered">`);
          
          
  
          $(`#dept_btn_edit${i}`).css('display','none');
          $(`#dept_btn_save${i}`).css('display','inline-block');
      })
      $(`#dept_btn_save${i}`).on('click',()=>{
        let p2=$(`#costumer_${i} input`).val();
        let p3=$(`#model_${i} input`).val();
        let p4=$(`#opis${i} input`).val();
        let p5=$(`#machine_s_no_${i} input`).val();
        let p6=$(`#department_${i} input`).val();
      



        $(`#costumer_${i}`).text(p2);
        $(`#model_${i}`).text(p3);
         $(`#opis${i}`).text(p4);
         $(`#machine_s_no_${i}`).text(p5);
        $(`#department_${i}`).text(p6);
        $(`#dept_btn_edit${i}`).css('display','inline-block');
        $(`#dept_btn_save${i}`).css('display','none');
        array[i].macine_costumer=p2;
        array[i].machine_model=p3;
        array[i].machine_opis=p4;
        array[i].machine_s_no=p5;
        array[i].department=p6;
     
        localStorage.removeItem('machine');
        localStorage.setItem('machine', JSON.stringify(itemsLine));
        populateTable('#tbody_line',itemsLine);
        $('.pagination').html("");
        createPagination();
        
        
       
     })
      })
    };
    populateTable('#tbody_line',itemsLine);
    //i should create section many for the machine with relenchenship with the department
  
//     let createSelectMenyDept=()=>{
//      $.each(itemsDepartment,(i,val)=>{
//       $('#oddelenie_masina').append(
//         `  <option class='${val.department}' value="${val.department}">${val.department}</option>`
//       )
//      })
//     }
//   createSelectMenyDept();
  
  
  // create function for pagination
  let createPagination=()=>{
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