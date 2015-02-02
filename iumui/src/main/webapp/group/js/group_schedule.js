/**
 *  나의 그룹 달력화면에 들어갈 달력 화면 스크립트 
 *  조현권
 *  2015/1/30
 */

var groupSchedules;
var gno = getUrlParameter("gno");
var startday;

/** 화면출력 start */
$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('#sidebar_table1_content').load('sidebar/mygroup_menu.html');

	loadMyGroups4ThisPage(1);
	
});
/** 화면출력 end */

$(document).ready(function() {
	
	loadThisGroupSchedules();
	
  $( "#newSchBtn" ).click(function() {
  	var end = $('#tenddate').val();
  	var title = $('#tschedule').val();
  	var endday = new Date(end);
  	
  	console.log(endday - startday);
  	
  	if (end == "" && !$('#isexpanded').is(":checked")) {
  		alert("종료일자를 지정해 주세요!");
  		$('#tenddate').focus();
  		return false;
  	}//유효성 체크
  	
  	if(endday - startday < 0) {
  		alert("종료일이 시작일보다 빠를 수 없습니다.");
  		return false;
  	}//유효성 체크
  	
  	if (title == '') {
  		alert("내용을 입력해주세요!");
  		$('#tschedule').focus();
  		return false;
  	}//유효성 체크
  	
  	console.log(startday + " : " + end + " : " + title);
  	
  });//일정 등록 버튼
  
});//ready

function parseSchedules(schedules) {

  for ( var i in schedules) {
	  schedules[i].start = yyyyMMdd(schedules[i].start);

	  if (schedules[i].end) {
		  schedules[i].end = yyyyMMdd(schedules[i].end);
	  }
  }//스케쥴을 받아 fullcalendar가 읽을 수 있는 배열로 변경합니다.
  return schedules;
}

function loadThisGroupSchedules(){
$.getJSON('../groupschedule/thisgroupschedule.do?gno=' + gno, function(data) {
  	
	  var schedules = data.schedules;
	  var events = parseSchedules(schedules);
	  var groupColor = "#222222";
	  
	  if(schedules.length > 0){
	  	groupColor = schedules[0].formColor;
	  }
	  
	  $('#calendar').fullCalendar({
	    langs : 'ko', //언어설정
	    header : {
	      right : 'prev,next today',
	      center : 'title',
	      left : 'month,basicWeek'
	    },//달력 헤더 옵션 설정

	    dayClick : function(date, jsEvent, view) {
	    	startday = date;
		    $('#tdate').text(date.format());
		    popup(date, jsEvent, view);
	    },//날짜 클릭 콜백함수
	    
	    eventClick: function(calEvent, jsEvent, view) {
	    	var thisEvent = calEvent.title;
	    	console.log(thisEvent);
	    	var start = calEvent.start.format();
	    	
	    	if (end != null){
	    		var end = calEvent.end.format()
	    		$('#schdate').text(start + " ~ " + end);
	    	} else {
	    		$('#schdate').text(start);
	    	}
	    	
	    	$('#groupBubble').css('border',"2px solid " + groupColor);
	    	
	    	$('#eschedule').text(thisEvent);
				schBubble(calEvent, jsEvent, view);
        
   		},
   		
	    eventSources : [
	        {
				    events : schedules
				  ,
				  				 color : groupColor,
				  				 textColor: 'yellow'
	        }
	  				 ]
	  });
  });//getJSON을 통해 현재 그룹의 스케쥴을 database에서 불러옵니다.
}//loadThisGroupSchedules()

function popup(date, jsEvent, view) {
  if ($('#popup').css('display') == 'none' && $('#groupBubble').css('display') == 'none') {
	  $('#tschedule').focus();
	  $('#popup').css('left', jsEvent.pageX - 125); // <<< use pageX and pageY
	  $('#popup').css('top', jsEvent.pageY + 15);
	  $('#popup').css('display', 'inline');
	  $("#popup").css("position", "absolute"); // <<< also make it absolute!

  } else {
	  closeBtn();
  }
};//날짜 클릭 이벤트

function schBubble(calEvent, jsEvent, view){
	if ($('#popup').css('display') == 'none' && $('#groupBubble').css('display') == 'none') {

	  $('#groupBubble').css('left', jsEvent.pageX - 125); // <<< use pageX and pageY
	  $('#groupBubble').css('top', jsEvent.pageY + 15);
	  $('#groupBubble').css('display', 'inline');
	  $('#groupBubble').css("position", "absolute"); // <<< also make it absolute!

  } else {
  	closeBtn();
  }
};//일정 클릭 이벤트

function closeBtn() {
  $('#popup').css('display', 'none');
  $('#groupBubble').css('display', 'none');
  $('#scheduleT').trigger("reset");
}

function showEndDay() {
	var tempdate;
	
	if($('#isexpanded').is(":checked")){
		$('#tdateOption').css('display','none');
		
		$('#tenddate').val(null);
		
		console.log("체크됨");
		
	} else {
		$('#tdateOption').css('display','inline');
		console.log("체크풀림");
	}
}

function loadMyGroups4ThisPage(pageNo) {
	//주의! require.js의 [ , ] 처리 과정에서  fullcalendar의 date data를 불러들이는 소스 중에 [,]과 충돌하는 현상이 발견되었습니다.
	//본 페이지에서 사이드바 소스를 로딩할때 handlebarsjs와 require.js를 사용하지 않고, html을 직접 작성하여 테이블에 append 시켰습니다.     -조현권
	$('#sidebar_contents2 a').attr('href','group_list.html').html("나의 모임");
	
	$.getJSON('../group/mygroups.do?pageNo=' + pageNo,
			function(data) {
		var myGroups = data.groups
		
		if((data.status) == "success"){

			if(myGroups.length > 0){
					for (var i in myGroups){
						var thisGno = data.groups[i].gno;
						$('#sidebar_table2_content').append("<tr><td id='groupNo"+ i +"' class=\"sidebar_title\"><a style=\"color:"+ data.groups[i].formColor +"\" href=\"group_schedule.html?gno="+ thisGno +"\">"+ data.groups[i].gname+"</td></tr>");
					}

					var mgtRow = $('#sidebar_table2_content').find('tr').length;

					if(mgtRow < 6) {

						for ( var i=0; i < ( 6 - mgtRow ); i++ ) {
							$('#sidebar_table2_content').append("<tr><td class=\"sidebar_title\"></td></tr>");
						}

					}
			} else {
				$('#sidebar_table2_content').append("다른 그룹이 없습니다");
			}
		}	
	});	
}

function getUrlParameter(sParam)
{
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
}//현재 URL의 쿼리스트링은 parsing하여 parameter의 값을 가져옵니다.

/** 날짜 데이터 전환 start */
function yyyyMMdd(date) {
	if (date) {
		var date = new Date(date);
		var str = date.getFullYear() + '-';
		
		if (date.getMonth() < 9)
			str += '0';
		str += (date.getMonth() + 1) + '-';
		
		if (date.getDate() < 10)
			str += '0';
		str += date.getDate();
		
		return str;
		
	} else {
		return '';
	}
}
/** 날짜 데이터 전환 end */
