/*
$(function(){
  
  $('#btn_submit').click(function() {
    
    var data = new FormData();
    $.each($('#attachFile')[0].files, function(i, file) {
        data.append('file-' + i, file);
    });

    $.ajax({
        url: '../json/member/upload.do',
        type: "post",
        dataType: "text",
        data: data,
        // cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
            alert(data);
        },
        error: function() {}
    });
});
  
  
});//ready()
        */
        
      /*  $(document).ready(function() {
          $('#btn_submit').click(function() {
       
              var data = new FormData();
              $.each($('#attachFile')[0].files, function(i, file) {
                  data.append('file-' + i, file);
              });
       
              $.ajax({
                  url: '../json/member/upload.do',
                  type: "post",
                  dataType: "text",
                  data: data,
                  // cache: false,
                  processData: false,
                  contentType: false,
                  success: function(data) {
                      alert(data);
                  },
                  error: function() {}
              });
          });
      });*/

/*$(function(){
    //ajax form submit
    $('#frm').ajaxForm({
            beforeSubmit: function (data,form,option) {
                //validation체크 
                //막기위해서는 return false를 잡아주면됨
                return true;
            },
            success: function(response,status){
                //성공후 서버에서 받은 데이터 처리
                alert("업로드 성공!!");
            },
            error: function(){
              alert("실패");
                //에러발생을 위한 code페이지
            }                               
        });
});*/
    //폼전송

$(function(){
  
});
 
$('#uploadbutton').click(function(){
  
  $('#ajaxform').ajaxForm({
      dataType:'json',

          beforeSubmit: function (data, frm, opt) {
                          alert("전송전!!");
                          
                          return true;
                        },
          success: function(responseText, statusText){
            alert("전송 성공");
            location.href="/iumui/common/mypage_modify.html";
            
              console.log(responseText);
          } ,
          error: function(){
              alert("에러발생!!");
          }        
        });
  
});

// 이미지 미리보기
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $('#blah').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
