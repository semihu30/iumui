/**
 * 그룹 게시판에 들어갈 사이드바 자바스크립트 소스
 * 조현권
 * 2015/01/22
 */
var groupBoards;
var groupBoardComments;
var gno;
var loginUser;

$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.side_bar').load('../common/sidebar.html');
	$('.gboard_reply').load('group_board_reply.html');
	
	$(document).on('click', '.group_board a', function(){
		$('#commentInput' + $(this).attr('data-no')).css('display', '');
	});
	
	$(document).on('click', '.btncCancel', function(){
		$('#ccontent' + $(this).attr('data-no')).val('');
		$('#commentInput' + $(this).attr('data-no')).css('display', 'none');
	});
	
	loadMyGroups(1);
	loadSideMenu(); 
	
	gno = getUrlParameter("gno");
	
	loadGroupBoard();
	
	$.getJSON('../group/group.do?gno=' + gno , 
			function(data){
		
		/**사이드 1번 테이블 제목 삽입 start*/
		$('#sidebar_contents1 a').attr('href','#').html(data.group[0].name);
		/**사이드 1번 테이블 제목 삽입 end*/
		
	});
	
	$(document).on('click', '.btnCReg', function(){

		if ($('#ccontent' + $(this).attr('gb-no')).val().length == 0 ){
			alert('글을 입력 하세요.');
			return;
		}
	  $.post('../group_board/add_comment.do'
	      , {
	      		groupBoardNo : $(this).attr('gb-no'),
	      		groupNo : gno,
				  	content : $('#ccontent' + $(this).attr('gb-no')).val()
	      } 
	      , function(result){  
	        if (result.status == "success") {
	        	
	        	loadGroupBoard();
	        	
	        } else {
	          alert("등록 실패!");
	        }
	      } 
	      , 'json'  )
	    
	   .fail(function(jqXHR, textStatus, errorThrown){ 
	     alert(textStatus + ":" + errorThrown);
	   });

	});
	
});

function loadGroupBoard() {
	$.getJSON('../group_board/board_list.do?no='+ gno, 
			function(data){
		
		console.log(data);
		loginUser = data.loginUser;
		groupBoards = data.groupBoards;
		groupBoardComments = data.groupBoardComments;
		
		
		for (var i in groupBoards) {
			groupBoards[i].regDate = yyyyMMdd(groupBoards[i].regDate);
    }
		
		for (var i in groupBoardComments) {
    	groupBoardComments[i].regDate = yyyyMMdd(groupBoardComments[i].regDate);
    }
		
		require(['text!group_list/group_board_table.html'], function(html){
      var template = Handlebars.compile(html);
      $('#group_board').html( template(data));
      loadGroupBoardComment();
      
      for (var i in groupBoards) {
      	
      	if ( loginUser && loginUser.memberNo == groupBoards[i].memberNo){
      		
    			$('#btnBModDel'+groupBoards[i].no).css('display', '');
    			
    		} else {
    			$('#btnBModDel'+groupBoards[i].no).css('display', 'none');
    			
    		}
      }
    });
	});
	
}

function loadGroupBoardComment() {
	for (var i in groupBoardComments) {
				
		$('#commentSet' + groupBoardComments[i].groupBoardNo).prepend("<div id='comment" + groupBoardComments[i].groupBoardNo + 
				"' class='board_comment' gb-no='" + groupBoardComments[i].groupBoardNo + 
				"' comment-no='" + groupBoardComments[i].no + "'>" +
				"<div class='writer_photo'><img src='../icon/64x64/row 9/1.png'></div>" +
				"<div class='board_info'>" +
				"<div class='top_style'>" +
				"<div id='commenter" + groupBoardComments[i].groupMemberNo + 
				"' class='commenter'>" + groupBoardComments[i].userName + "</div>" +
				"<div class='regDate cregDate'>"+ groupBoardComments[i].regDate +"</div>" +
				"</div>" +
				"<div id='cNo' class='comment_content'>"+ groupBoardComments[i].content +"</div>" +
				"</div>" +
			"</div>");
  }
}

//현재 페이지의 URL값을 가져옵니다. 
function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

/** 댓글 작동 js소스 : 막아놓았습니다.*/
/*
$("#show_reply").click(function(){
	if ($('#reply').css('display') == 'none'){
		$('#reply').css('display','');
	} else {
		$('#reply').css('display','none');
	}
});
*/

$('#upload_content').click(function(){
	$('#upload_content').css('height', '60px');
});
/*
$('#upload_content').blur(function(){
	$('#upload_content').css('height', '');
});
*/
$('.ccontent').click(function(){
	$('.ccontent').css('height', '60px');
});
/*
$('.ccontent').blur(function(){
	$('.ccontent').css('height', '');
});
*/
/*
$('.btnComment').click(function(){
	$('.commentInput').css('display', '');
});

$('.btncCancel').click(function(){
	$('.ccontent').val('');
	$('.commentInput').css('display', 'none');
});
*/
$(document).on('click', '.btnBoardMod', function(){
	var sNo = $(this).attr('gb-no');
	$('#modify_content' + sNo).css('display', '');
	$('#bcontent' + sNo).val($('#usercontent' + sNo).html());
	$('#usercontent' + sNo).css('display', 'none');
});

$(document).on('click', '.btnbCancel', function(){
	var sNo = $(this).attr('gb-no');
	$('#usercontent' + sNo).css('display', '');
	$('#bcontent' + sNo).val('');
	$('#modify_content' + sNo).css('display', 'none');
});

$(document).on('click', '.btnBmod', function(){
	if ( !loginUser ) {
		alert("로그인 하세요.");
		return;
	}
	
	var sNo = $(this).attr('gb-no');
	for (var i in groupBoards) {
		if (groupBoards[i].no == sNo) {
			if (groupBoards[i].content == $('#bcontent' + sNo).val()) {
		    alert('변경한 것이 없습니다!');
		    return;
		  }
		}
	}
   
	 if ( $('#bcontent' + sNo).val().length == 0) {
	    alert('내용을 입력하세요.');
	    return;
	  }
  
  updateGroupBoard(sNo);
});

function updateGroupBoard(sNo) {
	
	$.post('../group_board/update.do'
      , {  
      		no : sNo,
      		content : $('#bcontent' + sNo).val()
      } 
      , function(result){  
        if (result.status == "success") {
        	loadGroupBoard();
        	
        	$('#usercontent' + sNo).css('display', '');
        	$('#bcontent' + sNo).val('');
        	$('#modify_content' + sNo).css('display', 'none');
        	
        	alert("수정 성공");
        
        } else {
          alert("등록 실패!");
        }
      } 
      , 'json'  )
    
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
}
/*
if ( loginUser && loginUser.memberNo==board.writerNo){
	$('.btnBModDel').css('display', '');
} else {
	$('.btnBModDel').css('display', 'none');
}
*/
/** 나의 모임 start */
function loadMyGroups(pageNo) {

	$.getJSON('../group/mygroups.do?pageNo='+ pageNo, 
			function(data){

		/** 확인용 로그*/
		console.log("나의 모임 페이지 로드 : " + data.status);
		/** 확인용 로그*/

		var myGroups = data.groups
		
		console.log();
		
		/**사이드 2번 테이블 제목 삽입 start*/
		$('#sidebar_contents2 a').attr('href','#').html("나의 모임");
		/**사이드 2번 테이블 제목 삽입 end*/
		
		if((data.status) == "success"){
			
			if(myGroups.length > 0){
				require(['text!sidebar/mygroup_list.html'], function(html){
					var template = Handlebars.compile(html);
					$('#sidebar_table2_content').append(template(data));
					console.log("사이드바 2번 테이블 데이터 : " + $('#sidebar_table2_content').find('tr').length);
					
					var mgtRow = $('#sidebar_table2_content').find('tr').length;
				
					if(mgtRow < 6) {
					
						for ( var i=0; i < ( 6 - mgtRow ); i++ ) {
							$('#sidebar_table2_content').append("<tr><td class=\"sidebar_title\"></td></tr>");
						}
						
					}
				});
			} else {
				$('#sidebar_table2_content').append("다른 그룹이 없습니다");
			}
		}
	});
};
/** 나의 모임 end */

/** 그룹메뉴 start*/
function loadSideMenu() {
	
	/**메뉴 소스 불러오기*/
	require(['text!sidebar/mygroup_menu.html'], function(html){
		var template = Handlebars.compile(html);
		$('#sidebar_table1_content').html( template() );
		
	});	
};

$('#uploadbtn').click(function(){
	
	if (!validateReg()) return;
  
  $.post('../group_board/add_board.do'
      , {  
      		groupNo : gno,
      		content : $('#upload_content').val()
      } 
      , function(result){  
        if (result.status == "success") {
        	
        	loadGroupBoard();
        	alert("등록 성공");
        	$('#upload_content').val('');
        } else {
          alert("등록 실패!");
        }
      } 
      , 'json'  )
    
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
});

function validateReg() {
  if ( $('#upload_content').val().length == 0) {
    alert('올릴 글을 입력 하세요.');
    return false;
  }
  return true;
}

$(document).on('click', '.btnBoardDel', function(){
	if ( !loginUser ) {
		alert("로그인 하세요.");
		return;
	}
	
	if (confirm("정말로 삭제 하시겠습니까?")) {
		deleteBoard($(this).attr('gb-no'));		
	} else return;
});

function deleteBoard(no) {
  $.getJSON('../group_board/delete.do?no=' + no, 
    function(data){
      if (data.status == 'success') {
      	loadGroupBoard();
      }
    });
}

function yyyyMMdd(date) {
  if (date) {
    var date = new Date(date);
    var str = date.getFullYear() + '-';
    
    if (date.getMonth() < 9) str += '0';
    str += (date.getMonth() + 1) + '-';
    
    if (date.getDate() < 10) str += '0';
    str += date.getDate();
    
    return str;
    
  } else {
    return '';
  }
}

/** 그룹 메뉴 end */

