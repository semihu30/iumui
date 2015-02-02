/**
 * 메인화면에서 사용하는 script 소스입니다.
 */


/** 화면출력 start */
$(function(){
	$('.header').load('../common/header.html');
	$('.footer').load('../common/footer.html');
	$('.sidebar').load('../common/sidebar.html');
	
	loadBoardAllList();
	loadRecGroups();//main_sidebar_table1
	loadMyGroups(1);//main_sidebar_table2

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

/** 추천모임 start */
function loadRecGroups() {
	$.getJSON('../json/board/recommendgroups.do?startIndex=1', 
			function(data){

		/** 확인용 로그*/
		console.log(data);
		/** 확인용 로그*/
		
		var recGroups = data.recgroups;

		for (var i in recGroups) {
			switch(recGroups[i].categoryNo) {
				case 1 : recGroups[i].categoryNo = "문화"; break;
				case 2 : recGroups[i].categoryNo = "건강"; break;
				case 3 : recGroups[i].categoryNo = "계발"; break;
				case 4 : recGroups[i].categoryNo = "레저"; break;
				case 5 : recGroups[i].categoryNo = "미용"; break;
				case 6 : recGroups[i].categoryNo = "유흥"; break;
			} 
		}
		
		/**사이드 1번 테이블 제목 삽입 start*/
		$('#sidebar_contents1 a').html("추천 모임");
		/**사이드 1번 테이블 제목 삽입 end*/
		
		if((data.status) == "success"){
			
			if(recGroups.length > 0){
				require(['text!sidebar/side_table1.html'], function(html){
					var template = Handlebars.compile(html);
					$('#sidebar_table1_content').append(template(data));
					console.log("사이드바 1번 테이블 데이터 : " + $('#sidebar_table1_content').find('tr').length);
					
					var mgtRow = $('#sidebar_table1_content').find('tr').length;
				
					if(mgtRow < 6) {
						for ( var i=0; i < ( 6 - mgtRow ); i++ ) {
							$('#sidebar_table1_content').append("<tr><td class=\"sidebar_title\"></td></tr>");
						}
					}
					
				});
			} else {
				$('#sidebar_table1_content').append("추천 그룹이 없습니다");
			}
		}
	});
	
};
/** 추천 모임 end */

/** 나의 모임 start */
function loadMyGroups(pageNo) {
	$.getJSON('../group/mygroups.do?pageNo='+ pageNo, 
			function(data){

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
	});//로그인시 멤버의 데이터를 불러옵니다.
	
};
/** 나의 모임 end */
