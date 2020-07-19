<?php
require_once "./view/module.php";
$pjax=false;
if(isset($_SERVER['HTTP_HS_PJAX'])){
	$pjax=$_SERVER['HTTP_HS_PJAX'];
}

if($pjax){
	page_idfind_html();
	return true;
}
head();
body_head();
body_contents_container_start();
page_idfind_html();
footer();
load_script_from_end();
?>