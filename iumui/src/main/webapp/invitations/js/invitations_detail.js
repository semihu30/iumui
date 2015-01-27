/**
 * 게시판 JS 소스입니다.
 */

var board;
var member;
var boardComment;
var boardRequests;
var state;

$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.search_bar').load('/iumui/common/search_bar.html');
	
	var address = unescape(location.href);
	var param = "";
	if(address.indexOf("no", 0) != -1) {
	        param = address.substring(address.indexOf("no", 0) + 3);
	} else {
	        param = "1";
	}
	console.log("no = " + param);
	
	loadBoard(param);
	
});

function loadBoard(boardNo) {
  $.getJSON('../json/board/view.do?no=' + boardNo, 
    function(data){
  		board = data.board;
  		loginUser = data.loginUser;
  		boardRequests = data.boardRequests;
  		//console.log(data.board);
  		//console.log(data.loginUser);
  		//console.log(data.boardComments);
  		//console.log(data.boardRequests);
  		board.reqCount++;
  		$('#title').html(board.title);
  		$('#regDate').html(yyyyMMdd(board.regDate));
  		$('#writer').html('작 성 자 : ' + board.writer);
  		$('#targetNumber').html('모집인원 : ' + board.reqCount + '/' + board.targetNumber);
  		$('#startDate').html('모 집 일 : ' + yyyyMMdd(board.startDate));
  		$('#endDate').html('종 료 일 : ' + yyyyMMdd(board.endDate));
  		
  		$('#board_content').html(board.content);
  		
  		$('#btnRecommend').html('추천 : ' + board.goodCount);
  		$('#btnRequest').html('참여 : ' + board.reqCount);
  		
  		for (var i in data.boardComments) {
      	data.boardComments[i].commentRegDate = yyyyMMdd(data.boardComments[i].commentRegDate);
      }
  		
  		for (var i in boardRequests) {
      	boardRequests[i].requestDate = yyyyMMdd(boardRequests[i].requestDate);
      	
      	if (boardRequests[i].statusNo == 0) {
      		boardRequests[i].statusContent = "님이 참여 요청 하였습니다."; 
      	} else if (boardRequests[i].statusNo == 1) {
      		boardRequests[i].statusContent = "님이 참여 확정 되었습니다.";
      	} else if (boardRequests[i].statusNo == 2) {
      		boardRequests[i].statusContent = "님이 참여 거부 되었습니다.";
      	} else if (boardRequests[i].statusNo == 3) {
      		boardRequests[i].statusContent = "님이 참여 되었습니다.";
      	}
      }
  		
  		if ( loginUser && loginUser.memberNo==board.writerNo){
  			$('.btnBModDel').css('display', '');
  		} else {
  			$('.btnBModDel').css('display', 'none');
  		}
  		
  		require(['text!templates/request-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#requestSet').html( template(data) );

        if ( loginUser && loginUser.memberNo==board.writerNo) {
        		$('.request_button').css('display', '');
        		$('.statusNo1').css('display', 'none');
        		$('.statusNo2').css('display', 'none');
	        }
	    		else{
	    			$('.request_button').css('display', 'none');	    			
	    		}
      });
  		
  		require(['text!templates/comment-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#commentSet').html( template(data) );
      });
  		
  		if (board.targetNumber == board.reqCount) {
  			alert("목표 인원이 모집되어 모임을 생성하고 게시판을 삭제하겠습니다.");
  			
  			createGroup();
  			
  		}
  		
    });
}

function createGroup() {
	console.log(board.title + " and " + board.endDate);
	
	$.post('../group/add_group.do'
      , {
			  	name : board.title,
			  	intro : "",
			  	expireDay : yyyyMMdd(board.endDate)
      } 
      , function(result){  
        if (result.status == "success") {
        	
          createMember(result.no);
        } else {
          alert("등록 실패!");
        } 
      } 
      , 'json'  )
   
   .fail(function(jqXHR, textStatus, errorThrown){ 
     alert(textStatus + ":" + errorThrown);
     
   });
}

function createMember(no) {
	
	for (var i in boardRequests) {
		
		if ( boardRequests[i].statusNo==1) {
			$.post('../group/add_group_member.do'
					, {
						groupNo : no,
						memberNo : boardRequests[i].memberNo,
						managerStatus : 0
					} 
					, function(result){  
						if (result.status == "success") {
							
						} else {
							alert("등록 실패!");
						}
					} 
					, 'json'  )
					
					.fail(function(jqXHR, textStatus, errorThrown){ 
						alert(textStatus + ":" + errorThrown);
					});			
		}
	}
	
	$.post('../group/add_group_member.do'
			, {
				groupNo : no,
				memberNo : board.writerNo,
				managerStatus : 1
			} 
			, function(result){  
				if (result.status == "success") {
					changeDelete();
				} else {
					alert("등록 실패!");
				}
			} 
			, 'json'  )
			
			.fail(function(jqXHR, textStatus, errorThrown){ 
				alert(textStatus + ":" + errorThrown);
			});
}

function changeDelete() {
	alert( "모임이 생성되어 게시판을 삭제합니다.");
	$.getJSON('../json/board/delete.do?no=' + board.no, 
	    function(result){
		if (result.status == 'success') {
      
      location.href = "invitations.html?no=" + board.categoryNo;
    }
	});

}

$('#btncomment').click(function(){
	$('#commentInput').css('display', '');
});

$('#btncCancel').click(function(){
	$('#ccontent').val('');
	$('#commentInput').css('display', 'none');
});

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
