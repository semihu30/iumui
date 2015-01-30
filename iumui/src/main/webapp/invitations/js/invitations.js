/**
 * 게시판 JS 소스입니다.
 */

var category_number;
var currPageNo;
var maxPageNo;
var boardSearchText;

$(function(){
	$('.header').load('/iumui/common/header.html');
	$('.footer').load('/iumui/common/footer.html');
/*	$('.search_bar').load('/iumui/common/search_bar.html');*/
	
	boardSelectLocal = "";
	boardSearchText = "";
	
	$(document).on('click', '.table-hover a', function(){
		category_number = $(this).attr('cat-no');
		loadBoardList(1, boardSearchText, boardSelectLocal);
  });
	
	var address = unescape(location.href);
	console.log(address);
	var param = "";
	if(address.indexOf("no", 0) != -1) {
	        param = address.substring(address.indexOf("no", 0) + 3);
	} else {
	        param = "1";
	}
	console.log(address.indexOf("no", 0));
	console.log(address.substring(address.indexOf("no", 0) + 3));
	category_number = param;

	loadBoardList(1, boardSearchText, boardSelectLocal);
	
	loadLocalList();
	
	$('#searchBtn').click(function(){
		if ($('#selectCity option:selected').val().length != 5 ) {
			alert("지역을 선택하여 검색하세요.");
			return;
		} else if ($('#keyword').val().length == 0 ) {
			alert("지역으로 검색합니다.");
		}
		loadBoardList(1, $('#keyword').val(), $('#selectCity option:selected').val());
	});
});

function loadLocalList() {
  $.getJSON('../json/board/mylocal_big.do', 
    function(data){
  		//console.log(data);
  	
	  	require(['text!templates/local-big.html'], function(html){
	      var template = Handlebars.compile(html);
	      $('#selectState').html( template(data) );
	      $("#selectState > option[value=" + data.mylocal_big + "]").attr("selected", "ture");
	      loadSmallLocalList();
	    });
    });
}

function loadSmallLocalList() {
	//console.log($('#selectState option:selected').val());
	$.getJSON('../json/board/mylocal_small.do?no=' + $('#selectState option:selected').val(), 
	    function(data){
	  		//console.log(data);
		
		  	require(['text!templates/local-small.html'], function(html){
		      var template = Handlebars.compile(html);
		      $('#selectCity').html( template(data) );
		      $("#selectCity > option[value=" + data.mylocal_small + "]").attr("selected", "ture");
		    });
		  	
	    });
}

$('#selectState').change(function(){
	
	$.getJSON('../json/board/local_small.do?no=' + $('#selectState option:selected').val(), 
	    function(data){
	  		//console.log(data);
	  	
		  	require(['text!templates/local-small.html'], function(html){
		      var template = Handlebars.compile(html);
		      $('#selectCity').html( template(data) );
		    });
	    });
});

$(document).on('click', '#firstBtn', function(event){
	if (currPageNo > 1) {
	  loadBoardList(1, boardSearchText, boardSelectLocal);
	}
});

$(document).on('click', '#prevBtn', function(event){
	if (currPageNo > 10) {
	  loadBoardList(parseInt((currPageNo-1)/10)*10, boardSearchText, boardSelectLocal);
	}
});

$(document).on('click', '#nextBtn', function(event){
	if (currPageNo/10 < maxPageNo/10) {
	  loadBoardList(parseInt((currPageNo+9)/10)*10 + 1, boardSearchText, boardSelectLocal);
	}
});

$(document).on('click', '#lastBtn', function(event){
	if (currPageNo < maxPageNo) {
	  loadBoardList(maxPageNo, boardSearchText, boardSelectLocal);
	}
});

function setPageNo(currPageNo, maxPageNo) {
  window.currPageNo = currPageNo;
  window.maxPageNo = maxPageNo;
  
  var startNum = parseInt((currPageNo-1)/10)*10 +1;
  var endNum = parseInt((currPageNo+9)/10)*10;
  if (endNum > maxPageNo) endNum = maxPageNo;
  
  $('.mw_basic_page').html(
  		"<a id='firstBtn'>처음</a>&nbsp;<a id='prevBtn'>이전</a>" );
   
  for (var i = startNum; i <= endNum; i++) {
  	if ( currPageNo == i) {
  		$('.mw_basic_page').append("&nbsp;<b><span>" + i + "</span></b>");  		
  	}
  	else {
  		$('.mw_basic_page').append("&nbsp;<a id='p" + i + "'><span>" + i + "</span></a>");

  			$('#p' + i).click(function(){
  				loadBoardList($(this).children("span").html(), boardSearchText, boardSelectLocal);
  			});
  	}
	}
  
  $('.mw_basic_page').append(
	"&nbsp;<a id='nextBtn'>다음</a>&nbsp;<a id='lastBtn'>맨끝</a>" );
  
  if (currPageNo == 1) $('#firstBtn').css('display', 'none');
  else $('#firstBtn').css('display', '');
  
  if (currPageNo <= 10) $('#prevBtn').css('display', 'none');
  else $('#prevBtn').css('display', '');
  
  if (parseInt((currPageNo-1)/10) == parseInt((maxPageNo-1)/10)) $('#nextBtn').css('display', 'none');
  else $('#nextBtn').css('display', '');
  
  if (currPageNo == maxPageNo) $('#lastBtn').css('display', 'none');
  else $('#lastBtn').css('display', '');
}

function loadBoardList(pageNo, boardSearchText, boardSelectLocal) {
	if (pageNo <= 0) pageNo = currPageNo;
	
	$.getJSON('../json/board/list.do?no=' + category_number + '&pageNo=' + pageNo + 
			'&boardSearchText=' + boardSearchText + '&boardSelectLocal=' + boardSelectLocal, 
    function(data){
			setPageNo(data.currPageNo, data.maxPageNo);
      
			for (var i in data.board) {
      	data.board[i].startDate = yyyyMMdd(data.board[i].startDate);
      	data.board[i].endDate = yyyyMMdd(data.board[i].endDate);
      	data.board[i].reqCount++;
      }
     
      require(['text!templates/category-button.html'], function(html){
        var template = Handlebars.compile(html);
        $('#category_tab').html( template(data) );
        $('#catNo'+ category_number).addClass("selected");
      });
      
      require(['text!templates/board-table.html'], function(html){
        var template = Handlebars.compile(html);
        $('#board_list').html( template(data) );
      });
      
    });
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

$('#button_create').click(function(){
	
	location.href = "invitations_create_group.html?no=" + category_number;
});