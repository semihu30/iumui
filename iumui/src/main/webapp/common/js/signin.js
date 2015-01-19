/**
 * 회원가입 폼 자바스크립트 소스
 */
$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
});

/** email check start*/
$('#inputEmail').keyup(function(){
  $.getJSON('http://localhost:9999/checkEmail?email=' +  $(this).val() , 
  		function(data){
        if (data[0]) {
          $('#emailCheck').html('사용할 수 없는 주소입니다.').css('color','red');
          $('#inputEmail').attr('class','signform form-control').css('border','2px solid red');
      
        } else {
          $('#emailCheck').html('사용 가능한 주소입니다.').css('color','green');
          $('#inputEmail').attr('class','signform form-control').css('border','2px solid green');
        }
        console.log($('#inputEmail').val());
        if ($('#inputEmail').val() == '') {
        	$('#inputEmail').attr('class','signform form-control').css('border','1px solid #ccc');
        	$('#emailCheck').html('');
        }
  });
});

/** email check end*/