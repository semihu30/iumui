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
		console.log(data.groups);
		/** 확인용 로그*/

		var myGroups = data.groups

		if((data.status) == "success"){
			console.log('로딩이 성공하였습니다.');
			if(myGroups.length > 0){
				require(['text!sidebar/mygroup_table.html'], function(html){
					var template = Handlebars.compile(html);
					$('#my_group_list').append(template(data));
					console.log("사이드바 2번 테이블 데이터 : " + $('#sidebar_table2_content').find('tr').length);
				
				});
			} else {
				$('#my_group_list').append("가입한 그룹이 없습니다");
			}
		}
	});
};
/** 내가 가입한 모임 start*/