/**
 * 회원가입 유효성 검사.
 */

var member;
var re_name = /^[가-힣]{2,4}$/; //이름 유효성 검사 2~4자 사이
var re_id = /^[a-z0-9_-]{3,16}$/; // 아이디 검사식
var re_pw = /^[a-z0-9_-]{6,18}$/; // 비밀번호 검사식
var re_mail = /^([\w\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/; // 이메일 검사식
var re_tel = /^[0-9]{8,11}$/; // 전화번호 검사식

$(function(){
  loadLocalList();
  
  
});//ready()

//지역 검색
function loadLocalList() {
  
  $.getJSON('../json/board/local_big.do', 
    function(data){
    
      console.log(data);
    
      require(['text!templates/local-big.html'], function(html){
        var template = Handlebars.compile(html);
        $('#grp_state').html( template(data) );
      });
      
    });
}

$('#grp_state').change(function(){
    
  $.getJSON('../json/board/local_small.do?no=' + $(this).val(), 
      function(data){
      
        //console.log(data);
      
        require(['text!templates/local-small.html'], function(html){
          var template = Handlebars.compile(html);
          $('#selectLocal').html( template(data) );
          
          
        });
      });
});


//이메일 가능여부
   $("#email").focusout(function(){
     var email = $("#email").val();
     $.getJSON('../json/auth/check.do?email=' + email, 
          function(data){
       console.log(data.check);
       
       if(data.check != null){
         $('.email_confirm').html("사용 불가!"); //해당 내용을 보여준다
         $('#email').focus();
       }else if(re_mail.test( $('#email').val() ) != true){
         $('.email_confirm').html("사용 불가!"); //해당 내용을 보여준다
         $('#email').focus();
       }else if(re_mail.test( $('#email').val() ) == true ){
         $('.email_confirm').html("사용 가능!"); //해당 내용을 보여준다
       }            
          });
   });
   
   //패스워드 가능여부
   $('#passwd').keyup(function(){
     if (re_pw.test($('#passwd').val()) != true){
       $('.passwd1').html("NO!"); //해당 내용을 보여준다
      $('#passwd').focus();      
     }else{
       $('.passwd1').html("Yes!");       
     }
   });
   
   //패스워드 확인여부
   $('#passwdChk').keyup(function(){
     if( $('#passwd').val() != $('#passwdChk').val() ){
       $('.passwd2').html("NO!"); //해당 내용을 보여준다
      $('#passwdChk').focus();       
     } else{
       $('.passwd2').html("Yes!");       
     }
   });
   
   //이름 가능 여부
   $('#name').keyup(function(){
     if(re_name.test($('#name').val() ) != true ){
       $('.name1').html("NO!"); //해당 내용을 보여준다
      $('#name').focus();      
     }else{
       $('.name1').html("Yes!");             
     }
   });
   
   //성별 체크   
   $('input[name=sex]:radio').click(function(event){
     //console.log($(this).val());
     if($(this).val() == "1"){
       $('.row_title').html("남자");
     } else {
       $('.row_title').html("여자");
     }
   });
   
   //주소 검색
   $('#selectLocal').focusout(function(){
     var selectLocal = ($('#selectLocal').val());
     console.log(selectLocal);
     
   });
   
   
   
   
   
   
   
   //가입완료 버튼
   $('#signInBtn').click(function(){
     if (!validateForm()) return;
     //console.log($('input:radio[name="sex"]:checked').val());
     //console.log(selectLocal);
     
     
     $.post('../json/auth/add.do' //  URL 
         , {  //서버에 보낼 데이터를 객체에 담아 넘긴다 
           email : $('#email').val(),     //이메일
           password : $('#passwd').val(),  //비밀번호
           userName : $('#name').val(),   //이름
           sex : $('input:radio[name="sex"]:checked').val(), //성별
           birthDate : $('#birth').val(), //생년월일
           phone : $('#phoneNo').val(),  //핸드폰번호
           selectLocal : $('#selectLocal').val() //지역
         } 
         , function(result){ // 서버로부터 응답을 받았을 때 호출될 메서드
           if (result.status == "success") {
             alert("성공!! ");
             location.href="/iumui/index.html";
             
           } else {
             alert("등록 실패!");
           }
         } 
         , 'json' // 서버가 보낸 데이터를 JSON 형식으로 처리
         )
       //서버 요청이 실패했을 때 호출될 함수 등록   
      .fail(function(jqXHR, textStatus, errorThrown){ 
        alert(textStatus + ":" + errorThrown);
      });
     
   }); 
   
   function validateForm() {
     if (re_mail.test($('#email').val()) != true) { // 이메일 검사
      alert('email입력 오류.');
      $('#email').focus();
      return false;
    } else if( re_pw.test($('#passwd').val()) != true) { // 비밀번호 검사
      alert('비밀번호 입력 오류.');
      $('#passwd').focus();
      return false;
    } else if( $('#passwd').val() != $('#passwdChk').val() ) { // 비밀번호 확인
      alert('비밀번호가 일치하지 않습니다.');
      $('#passwdChk').focus();
      return false;
    } else if(re_name.test($('#name').val()) != true) { // 이름 검사
      alert('이름을 입력하세요.');
      $('#name').focus();
      return false;
    }  else if(re_tel.test($('#phoneNo').val() ) != true){  //폰번호
      alert('폰번호 입력 오류.');
      $('#phoneNo').focus();
      return false;       
    }  /*else if($('#selectLocal').val() != ''){  //지역입력
      alert('지역 입력 오류.');
      $('#selectLocal').focus();
      return false;       
    }     */  
    
    return true;
   }
     
     
       /* var email = $('#email').val();
        $.ajax({
        type: "POST",
        url: "../json/auth/check.do?email="+email, //이페이지에서 중복체크를 한다
        data: "email="+ email ,//컨트롤러 에 email 값을 보낸다
        cache: false,
        success: function(data){
          console.log(data.status);
            $("#emailMsg").html(data.check + "이미 있습니다."); //해당 내용을 보여준다
             $('#emailMsg').show();
        }
        });*/
  