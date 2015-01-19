/**
 * 메인화면에서 사용하는 script 소스입니다.
 */


/** 화면출력 start */
$(function(){
	$('.header').load('../common/header.html');
	$('.footer').load('../common/footer.html');
	$('.sidebar').load('../common/sidebar.html');
	
	loadBoardAllList();
	console.log("메인 게시판 로딩 성공");
	
	loadMyGroups(1);

	$(document).on('click', '.tableHead a', function(){
    loadProduct($(this).attr('category-no'));
    
  });
});
/** 화면출력 end */

function loadBoardAllList() {
  
	$.getJSON('../json/board/list_all.do', 
    function(data){
		
      require(['text!templates/board-tables.html'], function(html){
        var template = Handlebars.compile(html);
        $('#tables').html( template(data) );
      });
      
    });
}

/** 나의 모임 start */
function loadMyGroups(pageNo) {
	
	

	$.getJSON('../json/group/mygroups.do?pageNo='+ pageNo, 
			function(data){

		/** 확인용 로그*/
		console.log("나의 모임 페이지 로드 : " + data.status);
		/** 확인용 로그*/

		var myGroups = data.groups

		/**사이드 2번 테이블 제목 삽입 start*/
		$('#sidebar_contents2 a').attr('href','../group/group_list.html')
		.html("나의 모임");
		/**사이드 2번 테이블 제목 삽입 end*/
		
		if((data.status) == "success"){
			
			if(myGroups.length > 0){
				require(['text!sidebar/side_table2.html'], function(html){
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
				$('#sidebar_table2_content').append("가입한 그룹이 없습니다");
			}
		}
	});
};
/** 나의 모임 end */
