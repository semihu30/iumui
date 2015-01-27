/**
 * title : 그룹 리스트 화면의 설정 박스 javascript
 * writer: 조현권
 * date : 1/20/2015
 */

$('.asBtn').on("click",function(event){
	console.log("설정버튼 클릭");
	console.log($(this).next());
	$(this).next('div.set_div').css("display","block");
});

$(".cancel_set").click(function() {
	console.log("취소버튼 클릭");
	console.log($(this).closest('div'));
	$(this).closest('div').css('display','none');
});