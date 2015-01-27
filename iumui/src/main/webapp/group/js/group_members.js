/**
 *  나의 그룹 스케쥴 리스트 화면에 들어갈 달력 화면 스크립트 
 */

/** 화면출력 start */
$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
	$('.side_bar').load('../common/sidebar.html');
	
	loadMyGroups(1);
	loadSideMenu();
});
/** 화면출력 end */
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
}

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
/** 그룹 메뉴 end */