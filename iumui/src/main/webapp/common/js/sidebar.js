
/**달력 출력 start*/

var monthName = new Array("1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월");
var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var now = new Date;
var nowd = now.getDate();
var nowm = now.getMonth();
var nowy = now.getYear();

function showCalendar (day, month, year) {
	if ((year%4==0 || year%100 == 0) && (year % 400 == 0)) monthDays[1]=29; 
	else monthDays[1] = 28 //leap year test
 
	var firstDay = new Date (year,month,1).getDay()
	var calStr="<table border=0 cellpadding=5 cellspacing=1 align=center bgcolor=#cccccc>"
			calStr+="<tr bgcolor=white><td colspan=7>"
		  calStr+="<table border=0 cellpadding=0 cellspacing=0 align=center width=100%>"
		  calStr+="<td><font size='2'><a href='javascript:;' onClick='nowm--; if (nowm<0) { nowy--; nowm=11; } showCalendar(nowd,nowm,nowy)' title='이전 월'> <<</a></font></td>"
		  calStr+="<td align=center><font size='2'>"+monthName[month].toUpperCase()+" &nbsp;"+(year+1900)+"년</font></td>"
		  calStr+="<td align=right><font size='2'><a href='javascript:;'  onClick='nowm++; if (nowm>11) { nowy++; nowm=0; } showCalendar(nowd,nowm,nowy)' title='다음 월'> >></a></font></td>"
		  calStr+="</tr></table>"
		  calStr+="</td></tr>" 
		  calStr+="<tr bgcolor='#5bc0de;'>"
		  calStr+="<th><font color='red' size='2'>일</font></th>"
		  calStr+="<th><font color='white' size='2'>월</font></th>"
		  calStr+="<th><font color='white' size='2'>화</font></th>"
		  calStr+="<th><font color='white' size='2'>수</font></th>"
		  calStr+="<th><font color='white' size='2'>목</font></th>"
		  calStr+="<th><font color='white' size='2'>금</font></th>"
		  calStr+="<th><font color='#66CCFF' size='2'>토</font></th>" 
		  calStr+="</tr>"
		  	
		  	var dayCount=1
		  
		  calStr+="<tr bgcolor=white>"
 
		  	for (var i=0;i<firstDay;i++) calStr+="<td> "  //공백
 
		  	for (var i=0;i<monthDays[month];i++) {

					 if(dayCount==nowd) {
						 calStr+="<td align=center bgcolor='#DFE7DE'><font size='2'><b>" // 오늘 날짜일때 배경색 지정,글자 진하게
					 	} else {
						 calStr+="<td align=center><font size='2'>"  // 오늘 날짜가 아닐때 배경색 지정
					 	}
			 
				 	calStr+="<a href='http://amen.maru.net'>" // 링크설정
				 	calStr+=dayCount++   // 날짜
				 	calStr+="</a>"
			 		
				 	 if(dayCount==nowd) {
						 calStr+="</b>" // 오늘 날짜일때 글자 진하게
				 	 	} else {
						 calStr+=""  // 오늘 날짜가 글자 진하게 안함
				 	 	}

				 		calStr+="</font>"
				 			
				 		if ((i+firstDay+1)%7==0&&(dayCount<monthDays[month]+1)) calStr+="<tr bgcolor=white>" 
				}
	
	var totCells=firstDay+monthDays[month]
	
	for (var i=0;i<(totCells>28?(totCells>35?42:35):28)-totCells;i++) 
		calStr+="<td> "
		calStr+="</table><BR>"
		calendar.innerHTML=calStr
		
		
		console.log("달력 출력 완료");
    }

/** 달력 출력 end */

/** 헤더 연결 테스트 */
function chkLogout() {
	
	console.log("로그아웃 절차 실행 체크");
	
	$('#sidebar_table2_content').html("로그인 후 이용하여 주십시오");
}
/** 헤더 연결 테스트 */

function parseDate4t(date) {
  if (date) {
    var date = new Date(date);
    
    if (date.getMonth() < 9) str += '0';
    var str = (date.getMonth() + 1) + '월';
    
    if (date.getDate() < 10) str += '0';
    str += date.getDate() + '일';
    
    return str;
    
  } else {
    return '';
  }
}

