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
	
});
/** 화면출력 end */

/** 가까운 일정 start*/
function loadMySchedule() {
	$.getJSON('../groupschedule/myschedules.do?dataSize=6' , 
			function(data){
		console.log(data);
		/** 확인용 로그*/
		console.log("gschedule data loading : " + data.status);
		/** 확인용 로그*/

		for (var i in data.schedules) {
			data.schedules[i].startday = yyyyMMdd(data.schedules[i].startday);
			data.schedules[i].endday = yyyyMMdd(data.schedules[i].endday);
		}
		
		/** 가까운 일정 출력*/
		var mySchedules = data.schedules
		
		console.log(mySchedules);

		/**사이드 2번 테이블 제목 삽입 start*/
		$('#sidebar_contents2 a').attr('href','#').html("가까운 일정");
		/**사이드 2번 테이블 제목 삽입 end*/

		if((data.status) == "success") {
			if(mySchedules.length > 0) {
				
				require(['text!sidebar/myschedule.html'], function(html){
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
	
	$.getJSON('../group/mygroups.do?pageNo='+ pageNo, 
			function(data){

		/** 확인용 로그*/
//		console.log("나의 모임 페이지 로드 : " + data.status);
//		console.log(data.groups)
		/** 확인용 로그*/

		var myGroups = data.groups
		var today = new Date();
		var Dday = [];
		
		if((data.status) == "success"){
			if(myGroups.length > 0){
				
				for (var i in myGroups) {
					Dday[i] = myGroups[i].expireDay - today;
					Dday[i] = Math.floor(Dday[i] / (1000 * 60 * 60 * 24)) * -1;
					myGroups[i].expireDay = [yyyyMMdd(myGroups[i].expireDay) , "D"+ Dday[i]];
				}
				
//				console.log(Dday);
//				console.log(data.groups);
				require(['text!group_list/mygroup_table.html'], function(html){
					var template = Handlebars.compile(html);
					$('#my_group_list').append(template(data));
					
					$(".my_groups th").append("<span class=\"setting-btn\"></span>");
					
					$(".setting-btn").load("set_div.html");
					console.log("설정박스 생성 완료");
					
					});
				
			} else {
				$('#my_group_list').append("가입한 그룹이 없습니다");
				
			}
		}
	});
	
};
/** 내가 가입한 모임 start*/

/** 날짜 데이터 전환 start */
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
/** 날짜 데이터 전환 end */
