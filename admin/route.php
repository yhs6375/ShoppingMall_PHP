<?php
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Server\Route\HSRouter;

const VIEW_DIR = "./view/";
const SERVER_DIR = "./server/";
$url = $_SERVER["REQUEST_URI"];
$router = new HSRouter();

//Logger::log(json_encode($_SERVER['X_REAL_IP']));
Logger::log(json_encode($_SERVER['REMOTE_ADDR']));
//Logger::log(json_encode($_SERVER['HTTP_X_FORWARDED_FOR']));
$router->map("GET", "/", function () {
    require VIEW_DIR . "login.php";
}, "mainpage");
$router->map("GET|POST", "/login", function () {
    require VIEW_DIR . "login.php";
}, "login");
$router->map("GET", "/dashboard/analytics", function () {
    require VIEW_DIR . "dashboards/analytics.php";
}, "analytics");
$router->map("GET", "/products", function () {
    require VIEW_DIR . "product/products.php";
}, "product");
$router->map("GET", "/products/new", function () {
    require VIEW_DIR . "product/newProduct.php";
}, "new_product");
$router->map("GET|POST|PUT|DELETE", "/manage/product", function () {
    require SERVER_DIR . "product/ProductManage.php";
}, "product_manage");
$router->map("GET", "/category", function () {
    require VIEW_DIR . "product/category.php";
}, "category_tab");
$router->map("GET", "/category/[i:id]", function ($id) {
    $_REQUEST["id"] = $id;
    require VIEW_DIR . "product/categorySelect.php";
}, "category_detail_tab");
$router->map("GET|POST|PUT|DELETE", "/manage/category", function () {
    require SERVER_DIR . "product/CategoryManage.php";
}, "category_manage");
$router->map("POST", "/user/login", function () {
    require SERVER_DIR . "user/LoginProcess.php";
}, "login_process");
$router->map("GET|POST", "/user/regist", function () {
    require SERVER_DIR . "user/RegistProcess.php";
}, "regist_process");
$router->map("POST", "/products/new/image", function () {
    require SERVER_DIR . "file/imageUpload.php";
}, "image_upload_process");
$router->map("POST", "/upload/img", function () {
    require SERVER_DIR . "file/editorImageUpload.php";
}, "image_upload_editor");

$router->map("GET", "/test", function () {
    require VIEW_DIR . "test.php";
}, "test");
$router->run($url);