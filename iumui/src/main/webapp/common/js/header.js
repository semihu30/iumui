/**
 * Header JS
 * 
 * /iumui/common/js/header.js
 * 
 * 헤더 자바스크립트 소스
 * 
 * 2015.1월
 */
//var logintester;

$(function(){
	$('#my_loginBox').css('display', 'none');

	$('#loginSubmit').click(function(event){
    $.post('../json/auth/login.do'
        , {
          email : $('#inputId').val(),
          pwd : $('#inputPwd').val(),
          save : $('#save').is(':checked')
        }
        , function(data){
          if (data.status == 'success') {
            console.log("로그인 성공");
          	location.href = '../main/main.html';
          		
          } else {
            alert('로그인 아이디 또는 암호가 맞지 않습니다.');
            $('#inputPwd').val('');
          }
        }
        , 'json');
  });

});

$('#logoutSubmit').click(function(event){
  $.getJSON('../json/auth/logout.do', function(data){
  	$('#login').css('display', '');
		$('#my_loginBox').css('display', 'none');
  });
});

$.getJSON('../json/auth/loginUser.do', function(data){
	console.log("로그인 성공여부 : " + data.status);
	if (data.status == 'fail') {
		$('#login').css('display', '');
		$('#my_loginBox').css('display', 'none');
		
	} else {
		$('#login').css('display', 'none');
		$('#my_loginBox').css('display', '');
		console.log("로그인 유저 사진 경로 : " + data.photo);
		if (data.photo) {
			  $('#myphoto').attr('src', data.loginUser.photo);
		}
		console.log("로그인 유저 이름 (logintester): " + data.loginUser.userName);
		//logintester=data.loginUser.memberNo;
		//console.log("memberNo = " + logintester);
	  $('.myName').html(data.loginUser.userName + " 님.");
		$('.myName').click(function(){
			alert('사용자 정보 조회 창으로 보낼 예정');
		});
	}
});
