<?php
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Server\Route\HSRouter;

const CLIENT_DIR = "/";
const VIEW_DIR = "./view/";
const SERVER_DIR = "./server/";
$url = $_SERVER["REQUEST_URI"];
$router = new HSRouter();

$router->map("GET", "/", function () {
    require VIEW_DIR . "mainpage.php";
}, "mainpage");
$router->map("GET", "/login", function () {
    require VIEW_DIR . "login.php";
}, "login");
$router->map("GET", "/idfind", function () {
    require VIEW_DIR . "idfind.php";
}, "id_find");
$router->map("GET", "/passfind", function () {
    require VIEW_DIR . "passfind.php";
}, "pass_find");
$router->map("GET", "/join_term", function () {
    require VIEW_DIR . "join_term.php";
}, "join_term");
$router->map("GET", "/register", function () {
    require VIEW_DIR . "register.php";
}, "register");
$router->map("POST", "/join_complete", function () {
    require VIEW_DIR . "join_complete.php";
}, "join_complete");
$router->map("GET", "/category/[i:id]", function ($id) {
    $_REQUEST["id"] = $id;
    require VIEW_DIR . "product/category_page.php";
}, "category_page");
$router->map("GET", "/goods/[i:id]", function ($id) {
    $_REQUEST["id"] = $id;
    require VIEW_DIR . "product/product_process.php";
}, "goods_page");
$router->map("GET", "/shopping_cart", function () {
    require VIEW_DIR . "shopping_cart.php";
}, "cart");
$router->map("GET", "/user/id_overlap", function () {
    require SERVER_DIR . "user/id_overlap.php";
}, "id_overlap");
$router->map("GET", "/user/sms_overlap", function () {
    require SERVER_DIR . "user/sms_overlap.php";
}, "sms_overlap");
$router->map("POST", "/user/regist", function () {
    require SERVER_DIR . "user/register.php";
}, "user_regist");
$router->map("GET", "/test", function () {
    require VIEW_DIR . "test.php";
}, "test");
$router->run($url);