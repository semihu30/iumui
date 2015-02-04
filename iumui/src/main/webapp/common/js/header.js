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

  
//최초 쿠키에 login_id라는 쿠키값이 존재하면
/*  var inputId = $.cookie('inputId');
  if(inputId != undefined) {
      //아이디에 쿠키값을 담는다
      $("#inputId").val(inputId);
      //아이디저장 체크박스 체크를 해놓는다
      $("#rememberid").prop("checked",true);
  }*/
  
  
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
  });//로그인 버튼
	
	$('#logoutSubmit').click(function(event){
	  $.getJSON('../json/auth/logout.do', function(data){
	  	$('#login').css('display', '');
			$('#my_loginBox').css('display', 'none');
	  });
	});//로그아웃 버튼
	
	$.getJSON('../json/auth/loginUser.do', function(data){
		console.log("로그인 성공여부 : " + data.status);
		if (data.status == 'fail') {
			$('#login').css('display', '');
			$('#my_loginBox').css('display', 'none');
			
		} else {
			$('#login').css('display', 'none');
			$('#my_loginBox').css('display', '');
			console.log("로그인 유저 사진 경로 : " + data.photo);
			console.log("사진 파일 : " + data.loginUser.userPhoto);
			if (data.loginUser.userPhoto) {
	      $('#myphoto').attr('src', '/iumui/fileupload/' + data.loginUser.userPhoto);
	  }
			//console.log("로그인 유저 이름 (logintester): " + data.loginUser.userName);
			
		  $('.myName').html(data.loginUser.userName + " 님.");

			$.getJSON('../json/board/message_count.do', 
			    function(result){
				//console.log(result);
				$('.informCount').html('&nbsp; ' + result.messageCount);
			});
			
			$.getJSON('../json/board/message.do', 
			    function(mes){
			
				$('#msg1').append($('<p>').html("게시판 바로 가기"));
				
				for (var i in mes.messages) {
					
					$('#msg1').append($('<br>'))
											.append($('<p>').html("<a href='../invitations/invitations_detail.html?no=" 
													+ mes.messages[i].boardNo + "' class='title' data-no='" 
													+ mes.messages[i].boardNo + "'>" + (parseInt(i)+1) + ". " 
													+ mes.messages[i].message + "</a>"));
					/*
					if ( mes.messages[i].state == 3) {
						$('#msg1').append("<button type='button' " +
								"class='btn btn-default btn-xs btnRAccept' reqDel='bno=" + 
								mes.messages[i].boardNo + "&mno=" + mes.messages[i].memberNo +  
								">확인</button>");
						
					}
					*/
				}
			});
		}
	});//로그인 성공여부 검사
	
	$('.link_inform').click(function(){
		$('#msg1').css('display', ''); 
	});

	$('#btnMsgClose').click(function(event) {
	  $('#msg1').css('display', 'none'); 
	});
	




