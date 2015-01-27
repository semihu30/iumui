/**
 * 그룹 게시판에 들어갈 사이드바 자바스크립트 소스
 * 조현권
 * 2015/01/22
 */
var groupBoards;
var groupBoardComments;
var gno;

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
});

function loadGroupBoard() {
	$.getJSON('../group/group_board.do?no='+ gno, 
			function(data){
		
		console.log(data);
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
	$('#upload_content').css('height', '100px');
});

$('#upload_content').blur(function(){
	$('#upload_content').css('height', '');
});

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
  
  $.post('../group/add_board.do'
      , {  
      		groupNo : gno,
      		content : $('#upload_content').val()
      } 
      , function(result){  
        if (result.status == "success") {
        	alert("등록 성공");
        	
        	loadGroupBoard();
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
/*


$('#btnBoardMod').click(function(){
	$('#modify_content').css('display', '');
	$('#bcontent').val($('#board_content').html());
	$('#board_content').css('display', 'none');
});

$('#btnbCancel').click(function(){
	$('#board_content').css('display', '');
	$('#bcontent').val('');
	$('#modify_content').css('display', 'none');
});

$('#btnBmod').click(function(){
  if (board.content == $('#bcontent').val()) {
    alert('변경한 것이 없습니다!');
    return;
  } 
  if (!validateModBoard()) return;
  
  updateBoard();
});

$('#btnBoard').click(function(){
	console.log(board.no);
	location.href = "invitations.html?no=" + board.categoryNo;
});

function updateBoard() {
  $.post('../json/board/update.do'
      , {
        no : board.no,
        content : $('#bcontent').val()
      } 
      , function(result){
        if (result.status == "success") {
        	 loadBoard(board.no);
          $('#btnbCancel').click(); 
        } else {
          alert("변경 실패!");
        }
      } 
      , 'json')
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
}

$('#btnBoardDel').click(function(){
	if (confirm("정말로 삭제 하시겠습니까?")) {
		deleteBoard();		
	} else return;
});

$('#btnRecommend').click(function(){
	
	if ( !loginUser ) {
		alert("로그인 하세요.");
		return;
	}
	if ( loginUser.memberNo==board.writerNo) {
		alert("본인의 글에는 추천할수 없습니다.");
		return;
	}
	if (confirm("추천 하시겠습니까?")) {
		recommendBoard();		
	} else return;
});

$('#btnRequest').click(function(){
	
	if ( !loginUser ) {
		alert("로그인 하세요.");
		return;
	}
	if ( loginUser.memberNo==board.writerNo) {
		alert("본인은 자동 참여됩니다.");
		return;
	}
	
	if (confirm("정말로 참여 요청 하시겠습니까?")) {
		requestBoard();		
	} else return;
});

$(document).on('click', '.btnRAccept' ,function(){
	if (confirm("참여 요청을 수락 하시겠습니까?")) {
		requestAccept($(this).attr("reqVal"));
	} else return;
});

$(document).on('click', '.btnRReject',function(){
	if (confirm("참여 요청을 거부 하시겠습니까?")) {
		requestReject($(this).attr("reqVal"));	
	} else return;
});

function recommendBoard() {
	$.getJSON('../json/board/recommend.do?no=' + board.no, 
	    function(data){
	      if (data.status == 'success') {
	      	loadBoard(board.no);
	      }
	    });
}

function requestBoard() {
	$.getJSON('../json/board/request.do?no=' + board.no, 
	    function(data){
	      if (data.status == 'success') {
	      	loadBoard(board.no);
	      }
	    });
}

function requestAccept(reqVal) {
	$.getJSON('../json/board/req_accept.do?' + reqVal, 
	    function(data){
	      if (data.status == 'success') {
	      	loadBoard(board.no);
	      }
	    });
}

function requestReject(reqVal) {
	$.getJSON('../json/board/req_reject.do?' + reqVal, 
	    function(data){
	      if (data.status == 'success') {
	      	loadBoard(board.no);
	      }
	    });
}

function deleteBoard() {
  $.getJSON('../json/board/delete.do?no=' + board.no, 
    function(data){
      if (data.status == 'success') {
        //loadBoardList(0);
        
        //$('#btnbCancel').click();
        
        location.href = "invitations.html?no=" + board.categoryNo;
      }
    });
}

$('#btnCReg').click(function(){
	
	if (!validateComment()) return;
  
  $.post('../json/board/comment_add.do'
      , {  
			  	boardNo : board.no,
			  	comment : $('#ccontent').val()
      } 
      , function(result){  
        if (result.status == "success") {
        		loadBoard(board.no);
          
          $('#btncCancel').click(); 
        } else {
          alert("등록 실패!");
        }
      } 
      , 'json'  )
    
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
   });
 
});

function validateComment() {
  if ( $('#ccontent').val().length == 0) {
    alert('댓글을 입력하세요.');
    return false;
  }
  return true;
}
function validateModBoard() {
  if ( $('#bcontent').val().length == 0) {
    alert('내용을 입력하세요.');
    return false;
  }
  return true;
}

*/
