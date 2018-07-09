$(document).ready(()=> {
  let itemsDepartment = localStorage.getItem('dept') ? JSON.parse(localStorage.getItem('dept')) : [];
  //array
  let populateTable=(id,array)=>{
    
    $(`${id}`).html('');
    $.each(array,function(i,val){
      $(`${id}`).append(`
      <tr>
                    <td id="dept_${i}">${val.department}</td>
                    <td id="descript_${i}">${val.deptDecription}</td>
                    <td id="dept_edit${i}"><button class="btn_department" id="dept_btn_edit${i}">E</button><button style="display:none;" class="btn_department" id="dept_btn_save${i}">S</button></td>
                    <td id="dept_delete${i}"><button class="btn_department del-row" id="dept_btn_delete${i}">D</button></td>
                 </tr>  
      `);
      $(`#dept_btn_delete${i}`).click(function(){
     
        array.splice(i,1);
        localStorage.removeItem('dept');
        localStorage.setItem('dept', JSON.stringify(array));
        populateTable('#tbody',itemsDepartment);
        
      })
      $(`#dept_btn_edit${i}`).on("click",()=>{ 
        let p2=$(`#dept_${i}`).text();
        let p3=$(`#descript_${i}`).text();
        
        $(`#dept_${i}`).html(`<input type="text" value="${p2}" class="text-centered">`);
        $(`#descript_${i}`).html(`<input type="text" value="${p3}" class="text-centered">`);
        $(`#dept_btn_edit${i}`).css('display','none');
        $(`#dept_btn_save${i}`).css('display','inline-block');
    })
    $(`#dept_btn_save${i}`).on('click',()=>{
      let p2=$(`#dept_${i} input`).val();
      let p3=$(`#descript_${i} input`).val();
      $(`#dept_${i}`).text(p2);
      $(`#descript_${i}`).text(p3);
      $(`#dept_btn_edit${i}`).css('display','inline-block');
      $(`#dept_btn_save${i}`).css('display','none');
      array[i].department=p2;
      array[i].deptDecription=p3;
      localStorage.removeItem('dept');
      localStorage.setItem('dept', JSON.stringify(array));

      populateTable('#tbody',itemsDepartment);
      $('.pagination').html("");
      createPagination();
     
   })
    })
  };
  populateTable('#tbody',itemsDepartment);

  let createSelectMenyDept=()=>{
    $('#oddelenie_masina').append(`<option value="">Chose department..</option>`
    )
   $.each(itemsDepartment,(i,val)=>{
    $('#oddelenie_masina').append(
      `  <option class='${val.department}' value="${val.department}">${val.department}</option>`
    )
   })
  }
createSelectMenyDept();


// create function for pagination
let createPagination=()=>{
   let numberOfItems=$('#tbody tr').length;
   let  limitPerPage=18;
   let listGroup=$('#tbody tr');

   $("#tbody tr:gt("+ (limitPerPage-1) +")").hide();
    let totalPages=Math.ceil(numberOfItems/limitPerPage);
   
    $('.pagination').append(`<a href="#"  class="prew-page"><div class="btn_pagination"><</div></a>`);
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
             $('#tbody tr').hide();
            let grandTotoal=limitPerPage*currentPage;
            for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
              //   :eq() gives the real value like eq[6]
              $("#tbody tr:eq("+ i +")").show();
          
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
          $('#tbody tr').hide();
          let grandTotoal=limitPerPage*currentPage;
          for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
            //   :eq() gives the real value like eq[6]
            $("#tbody tr:eq("+ i +")").show();
        
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
          $('#tbody tr').hide();
          let grandTotoal=limitPerPage*currentPage;
          for (let i=grandTotoal-limitPerPage; i<grandTotoal; i++){
            $("#tbody tr:eq("+ i +")").show();
          }
          $(".pagination a.page-item:eq(" + ( currentPage-1) +")").addClass("active");
      }
  
  });
}
createPagination();


  
});