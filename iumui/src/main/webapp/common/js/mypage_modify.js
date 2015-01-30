/**
 * 회원정보 수정 .
 */

var member;
var sex;
var nick;
var local;
var bigLocalName;
var birthdate;
var date;
var no;
var afterBirth;

$(function(){
  
  loadLocalList();
  loadUserList();
  
});//ready()

//회원정보 서치
function loadUserList() {
  $.getJSON('../json/member/user_info.do',
      
    function(data){
    member = data.member;
    if(member.sex == 1){
      sex = "남자";
    }else{
      sex = "여자";
    }
    
    if(member.nickName == null){
      nick = (member.email).split('@'); 
         console.log("닉네임 없을경우");
         nick = nick[0];
    }else{
      nick = (member.nickName);
      console.log("닉네임있을경우");
      console.log(nick);
    }
    
    /*if(member.birthDate != null){
      date = (member.birthDate).split('/');
      console.log("생년월일 있");
    }*/
    
    no = member.memberNo; //멤버번호
    local =member.localName; //빅로컬
    
    //console.log(member.selectLocal);
    
    
    
    $('#email').val(member.email); //이메일 출력
    $('#name').val(member.userName); //이름 출력
    $('#nick').val(nick); //닉네임 출력
    $('#pnoneNo').val(member.phone); //핸드폰 출력
    $('#myself').val(member.introWord); //인사말 출력
    $('#birth').val(member.birthDate); //생년월일 출력
    $('#sex').val(sex); //성별 출력
    $('#zone').val(bigLocalName +"  "+member.localName); //지역 출력
    $('#myphoto').val(member.userPhoto); //내사진 출력
    $('#blah').attr('src','/iumui/fileupload/' + member.userPhoto);
    console.log(member.userPhoto);
    
    console.log(data);
      
    });
}

//회원정보 빅로컬 서치
function loadLocalList() {
  
  $.getJSON('../json/member/user_info1.do',
      
    function(data){
    bigLocalName = data.localName;
      
    });
}


//성별 체크   
$('input[name=gender]:radio').click(function(event){
  //console.log($(this).val());
  if($(this).val() == "1"){
    $('#sex').val("남자");
    member.sex = 1;
    console.log(member.sex);
    
  } else {
    $('#sex').val("여자");
    member.sex = 2;
    console.log(member.sex);
  }
});
   
   
   //가입취소 버튼
   $('#signInBtn2').click(function(){
     location.href="/iumui/index.html";
     
   });
   
   //수정완료 버튼
   $('#signInBtn1').click(function(){
     if(confirm("수정하시겠습니까?")){
     updateMember(no);
     }else{
       console.log("ㅇㅇ");
       
     }
     
   });
       
   function updateMember() {
     console.log($('#userfile').val());
    /* console.log(no);
     console.log(birthdate);
     console.log(member.sex);
     console.log(member.selectLocal);*/
     console.log($('#birth').val());
    // afterBirth = $('#birth').val(date[0]+"/"+date[1]+"/"+date[2]);
    // console.log(afterBirth);
     date = ($('#birth').val()).split('/');
     
     
     $.post('../json/member/update.do'
         , {
           
           memberNo : no, //멤버번호
           email : $('#email').val(),  //이메일
           userName : $('#name').val(), //이름
           nickName : $('#nick').val(), //닉네임
           phone : $('#pnoneNo').val(),    //핸폰
           introWord : $('#myself').val(),  //인사말
           birthDate : $('#birth').val(), //생년월일
           sex : member.sex,        //성별
           selectLocal : member.selectLocal //소지역
           
         } 
         , function(result){
           if (result.status == "success") {
             alert("변경 성공! 메인페이지로 이동합니다.");
             //location.href="/iumui/index.html";
             
           } else {
             alert("변경 실패!");
           }
         } 
         , 'json')
      .fail(function(jqXHR, textStatus, errorThrown){ 
        alert(textStatus + ":" + errorThrown);
      });
   }
   
// 이미지 미리보기
   function readURL(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();
         reader.onload = function (e) {
             $('#blah').attr('src', e.target.result);
         }
         reader.readAsDataURL(input.files[0]);
     }
   }
   
// 파일 업로드
   $('#uploadbutton').click(function(){
     
     $('#ajaxform1').ajaxForm({
         dataType:'json',

             beforeSubmit: function (data, frm, opt) {
                             alert("전송전!!");
                             
                             return true;
                           },
             success: function(responseText, statusText){
               alert("전송 성공");
               location.href="/iumui/common/mypage_modify.html";
               
                 console.log(responseText);
             } ,
             error: function(){
                 alert("에러발생!!");
             }        
           });
     
   });

   
  
     
    
  