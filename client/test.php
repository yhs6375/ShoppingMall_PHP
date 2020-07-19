<?php
header("Access-Control-Allow-Origin: http://bar.other/");
header("Access-Control-Allow-Methods: POST");
echo $_GET["_url"];
?>
<img id="test" src="https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakao_account_login_btn_medium_narrow.png"/>
<script>
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/public-data/';
function handler(){
    console.log("what");
}
function callOtherDomain() {
  if(invocation) {    
    invocation.open('GET', url, true);
    invocation.onreadystatechange = handler;
    invocation.send(); 
  }
}
document.getElementById("test").onclick = function(){
    callOtherDomain();
}
</script>