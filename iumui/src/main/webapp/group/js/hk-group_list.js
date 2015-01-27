/**
 * 나의 그룹 화면에 들어갈 스크립트 
 */

/** 화면출력 start */
$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.sidebar').load('/iumui/common/sidebar.html');
	
	loadMyGroups(1);
	
	loadMySchedule();
	
	console.log("loadMySchedule() 로딩 완료");  
	
});
/** 화면출력 end */

/** 가까운 일정 start*/
function loadMySchedule() {
	$.getJSON('../json/group/myschedules.do?dataSize=6' , 
			function(data){

		/** 확인용 로그*/
		console.log("나의 스케쥴 로딩" + data.status);
		/** 확인용 로그*/

		for (var i in data.schedules) {
			data.schedules[i].dday = parseDate4t(data.schedules[i].dday);
		}
		
		
		/** 가까운 일정 출력*/
		var mySchedules = data.schedules

		/**사이드 2번 테이블 제목 삽입 start*/
		$('#sidebar_contents2 a').attr('href','#')
		.html("가까운 일정");
		/**사이드 2번 테이블 제목 삽입 end*/

		if((data.status) == "success") {
			if(mySchedules.length > 0) {
				
				require(['text!sidebar/side_table2.html'], function(html){
					var template = Handlebars.compile(html);
					$('#sidebar_table2_content').html( template(data) );
					
					var msRow = $('#sidebar_table2_content').find('tr').length;
					
					if(msRow < 6) {
						for ( var i=0; i < ( 6 - msRow ); i++ ) {
							$('#sidebar_table2_content').append("<tr><td class=\"sidebar_title\"></td></tr>");
						}
					}
				});
			} else {
				for ( var i=0; i < 5; i++ ) {
					
					$('#sidebar_table2_content').append("<tr><td id=\"sidebar_title"+ i +"\"></td></tr>");
				  $('#sidebar_table2_content td').css("height","31px");
					
				}
				$('#sidebar_title2').html("일정이 없습니다.").css("padding","5px 15px").css("color","red");
			}
		}

	});
};

/** 가까운 일정 end */

/** 내가 가입한 모임 start*/
function loadMyGroups(pageNo) {
	
	$.getJSON('../json/group/mygroups.do?pageNo='+ pageNo, 
			function(data){

		/** 확인용 로그*/
		console.log("나의 모임 페이지 로드 : " + data.status);
		/** 확인용 로그*/

		var myGroups = data.groups

		if((data.status) == "success"){
			
			if(myGroups.length > 0){
				
				require(['text!sidebar/mygroup_table.html'], function(html){
					var template = Handlebars.compile(html);
					$('#my_group_list').append(template(data));
					
					$("th[userstate='1']").append("<span id=\"owner\">내가 관리하는 그룹</span>")
																.append("<img class=\"setting-btn\" src=\"../icon/32x32/row 3/14.png\">");
					
					setSettingBtn();
					
				});
				
				
			} else {
				$('#my_group_list').append("가입한 그룹이 없습니다");
			}
		}
	});
	
};
/** 내가 가입한 모임 start*/

function setSettingBtn() {
	$(".setting-btn").click(function() {
//		alert("설정버튼 클릭됨");
		$(this).append("<input type=\"color\">색상 선택</input>");
	});
};

//function parseDate4t(date) {
//  if (date) {
//    var date = new Date(date);
//    
//    if (date.getMonth() < 9) str += '0';
//    var str = (date.getMonth() + 1) + '월';
//    
//    if (date.getDate() < 10) str += '0';
//    str += date.getDate() + '일';
//    
//    return str;
//    
//  } else {
//    return '';
//  }
//};
