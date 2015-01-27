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
	$('#msg1').css('display', 'none'); 

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
		
	  $('.myName').html(data.loginUser.userName + " 님.");

		$('.myName').click(function(){
			alert('사용자 정보 조회 창으로 보낼 예정');
		});
		
		$.getJSON('../json/board/message_count.do', 
		    function(result){
			//console.log(result);
			$('.informCount').html('&nbsp; ' + result.messageCount);
		});
		
		$.getJSON('../json/board/message.do', 
		    function(mes){
			//console.log(mes.messages);			
			for (var i in mes.messages) {
				$('#msg1').append($('<br>'))
										.append($('<p>').html(mes.messages[i].message));
								
				if ( mes.messages[i].state == 3) {
					$('#msg1').append("<button type='button' " +
							"class='btn btn-default btn-xs btnRAccept' reqDel='bno=" + 
							mes.messages[i].bno + "&mno=" + mes.messages[i].mno +  
							">확인</button>");
				}
			}
		});
	}
});

$('.link_inform').click(function(){
	$('#msg1').css('display', ''); 
});

$('#btnMsgClose').click(function(event) {
  $('#msg1').css('display', 'none'); 
});
