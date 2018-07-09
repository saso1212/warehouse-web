$(document).ready(()=> {
    let itemsUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let populateTable=(id,array)=>{
      



      $(`${id}`).html('');
      $.each(array,function(i,val){
        $(`${id}`).append(`
        <tr>
        <td id="name_${i}">${val.name}</td>
        <td id="second_name_${i}" >${val.second_name}</td>
        <td id="e_mail${i}" style="font-size:15px;">${val.e_mail}</td>
        <td id="phone_${i}">${val.phone}</td>
        <td id="privilege_${i}" style="font-size:15px;">${val.privilege}</td>
        <td id="worker_privilege_${i}" style="font-size:15px;">${val.privilege}</td>
        <td id="user_edit${i}"><button class="btn_department" id="user_btn_edit${i}">E</button>
        <button style="display:none;" class="btn_department" id="user_btn_save${i}">S</button></td>
        <td id="user_delete${i}"><button class="btn_department del-row" id="user_btn_delete${i}">D</button></td>
     </tr> 
        `);
        $(`#user_btn_delete${i}`).click(function(){
       
          array.splice(i,1);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(itemsUsers));
          populateTable('#tbody_users',itemsUsers);
          createPagination();
          
        })
        $(`#user_btn_edit${i}`).on("click",()=>{
               
           
          let p2=$(`#name_${i}`).text();
          let p3=$(`#second_name_${i}`).text();
          let p4=$(`#e_mail${i}`).text();
          let p5=$(`#phone_${i}`).text();
          let p6=$(`#privilege_${i}`).text();
          let p7=$(`#worker_privilege_${i}`).text();
         
          $(`#name_${i}`).html(`<input type="text" value="${p2}" class="text-centered">`);
          $(`#second_name_${i}`).html(`<input type="text" value="${p3}" class="text-centered">`);
          $(`#e_mail${i}`).html(`<input type="text" value="${p4}" class="text-centered">`);
          $(`#phone_${i}`).html(`<input type="text" value="${p5}" class="text-centered">`);
          $(`#privilege_${i}`).html(`<input type="text" value="${p6}" class="text-centered">`);
          $(`#worker_privilege_${i}`).html(`<input type="text" value="${p7}" class="text-centered">`);
          
          $(`#user_btn_edit${i}`).css('display','none');
          $(`#user_btn_save${i}`).css('display','inline-block');
      })
      $(`#user_btn_save${i}`).on('click',()=>{

        let p2=$(`#name_${i} input`).val();
        let p3=$(`#second_name_${i} input`).val();
        let p4=$(`#e_mail${i} input`).val();
        let p5=$(`#phone_${i} input`).val();
        let p6=$(`#privilege_${i} input`).val();
        let p7=$(`#worker_privilege_${i} input`).val();
      



        $(`#name_${i}`).text(p2);
        $(`#second_name_${i}`).text(p3);
         $(`#e_mail${i}`).text(p4);
         $(`#phone_${i}`).text(p5);
        $(`#privilege_${i}`).text(p6);
        $(`#worker_privilege_${i}`).text(p6);

        $(`#user_btn_edit${i}`).css('display','inline-block');
        $(`#user_btn_save${i}`).css('display','none');
        array[i].name=p2;
        array[i].second_name=p3;
        array[i].e_mail=p4;
        array[i].phone=p5;
        array[i].privilege=p6;
     
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(itemsUsers));
        populateTable('#tbody_users',itemsUsers);
        $('.pagination').html("");
        createPagination();
        
        
       
     })
      })
    };
    populateTable('#tbody_users',itemsUsers);
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
     let numberOfItems=$('#tbody_users tr').length;
     let  limitPerPage=18;
     let listGroup=$('#tbody_users tr');
  
     $("#tbody_users tr:gt("+ (limitPerPage-1) +")").hide();
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
               $('#tbody_users tr').hide();
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
            $('#tbody_users tr').hide();
            let grandTotoal=limitPerPage*currentPage;
            for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
              //   :eq() gives the real value like eq[6]
              $("#tbody_users tr:eq("+ i +")").show();
          
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
            $('#tbody_users tr').hide();
            let grandTotoal=limitPerPage*currentPage;
            for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
              $("#tbody_users tr:eq("+ i +")").show();
            }
            $(".pagination a.page-item:eq(" + ( currentPage-1) +")").addClass("active");
        }
    
    });
  }
  createPagination();
  
  
    
  });