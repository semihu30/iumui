/** 화면출력 start */
$(function(){
  
});



function go(){
  if (!validateForm()) return;
  
    console.log("버튼눌림");
   
   //  if (!validateForm()) return;
     
   //이름 id : name
   //생년월일 id : birthday
   //이메일 id : email
     
     $.post('../json/member/findId.do' //  URL 
         , {  //서버에 보낼 데이터를 객체에 담아 넘긴다 
           name : $('#name').val(),   // 이름
           birthDate : $('#birthday').val(), // 생년월일
           phone : $('#email').val()    // 전화번호
         } 
         , function(result){ // 서버로부터 응답을 받았을 때 호출될 메서드
           if (result.status == "success") {
              if(result.check != null){
                console.log(result);
                alert("회원님의 아이디는"+result.check+"입니다.");
                window.location.href = "/iumui/index.html";
              }else{
                alert("회원님의 정보와 일치하는 아이디는 없습니다.");
              }
              
             
             
           } else {
             alert("찾기 실패!");
           }
         } 
         , 'json' // 서버가 보낸 데이터를 JSON 형식으로 처리
         )
       //서버 요청이 실패했을 때 호출될 함수 등록   
      .fail(function(){ 
        alert("다시 시도해 주십시오");
      });
     
}

function validateForm() {
  if ( $('#name').val().length == 0) {
    alert('이름은 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#birthday').val().length == 0) {
    alert('생년월일은 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#email').val() == 0) {
    alert('전화번호를 선택하세요');
    return false;
  }
  
  return true;
}
  