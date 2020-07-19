<?php
require_once "./view/module.php";
if (!isset($_SERVER['HTTP_REFERER'])) {
	Header("Location:/");
}
if (!preg_match("/" . getenv($_SERVER['HTTP_HOST']) . "/i", getenv($_SERVER['HTTP_REFERER']))) {
	exit('Location:/');
}
head();
body_head();
body_contents_container_start();
page_join_complete_html($_POST["id"]);
footer();
load_script_from_end();
page_register_script();