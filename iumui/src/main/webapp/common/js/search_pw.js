$(function(){
  
  
});//ready()






function go(){
  if (!validateForm()) return;
  
    console.log("버튼눌림");
   
   //  if (!validateForm()) return;
     
   //이름 id : name
   //생년월일 id : birthday
   //이메일 id : email
     
     $.post('../json/member/findPw.do' //  URL 
         , {  //서버에 보낼 데이터를 객체에 담아 넘긴다 
           name : $('#name').val(),   // 이름
           birthDate : $('#birthday').val(), // 생년월일
           email : $('#email').val()    // 이메일
         } 
         , function(result){ // 서버로부터 응답을 받았을 때 호출될 메서드
           console.log(result);
           if (result.status == "success") {
              if(result.check == null){
                alert("회원님의 정보와 일치하는 비밀번호 는 없습니다.");
              }else{
                console.log(result);
                alert("회원님의 비밀번호 는"+result.check+"입니다.");
              }
              
             
             
           } else {
             alert("찾기 실패!");
           }
         } 
         , 'json' // 서버가 보낸 데이터를 JSON 형식으로 처리
         )
       //서버 요청이 실패했을 때 호출될 함수 등록   
      .fail(function(jqXHR, textStatus, errorThrown){ 
        alert(textStatus + ":" + errorThrown);
      });
     
}

function validateForm() {
  if ( $('#name').val().length == 0) {
    alert('아이디는 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#birthday').val().length == 0) {
    alert('이름은 필수 입력 항목입니다.');
    return false;
  }
  
  if ( $('#email').val().length == 0) {
    alert('이메일을 필수 입력 항목입니다.');
    return false;
  }
  
  return true;
}
  