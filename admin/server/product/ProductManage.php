<?php
//상품 추가 프로세스
/*eventType :   1(PUSH)(상품 추가)
                1(PUT)(상품 수정)
                1(DELETE)(상품 삭제)
                1(GET)(상품 가져오기)
*/
/*
	return code 1 : success
*/
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Util\ResponseMsg;
use Server\Shopping\Product\OptionManager;
use Server\Shopping\Product\ProductManager;

try {
    if (!isset($_SERVER['HTTP_REFERER'])) {
        exit('No direct access allowed/정상적인 접근방식이 아닙니다');
    }
    if (!preg_match("/" . getenv($_SERVER['HTTP_HOST']) . "/i", getenv($_SERVER['HTTP_REFERER']))) {
        exit('No direct access allowed/정상적인 접근방식이 아닙니다');
    }
    $method = $_SERVER["REQUEST_METHOD"];
    if (isset($_REQUEST['t'])) {
        $eventType = $_REQUEST['t'];
    } else {
        $_PUT = (array)json_decode(file_get_contents('php://input'));
        $eventType = $_PUT["t"];
    }
    $productInfo = json_decode($_REQUEST['i']);
    if ($method == "POST") {
        if (isset($productInfo->subCategoryId)) {
            $productInfo->subCategoryId = trim($productInfo->subCategoryId);
            if ($productInfo->subCategoryId == "" || $productInfo->subCategoryId == 0) {
                unset($productInfo->subCategoryId);
            }
        }
        if (isset($productInfo->discount)) {
            if ($productInfo->discount == "") $productInfo->discount = 0;
        }
        if ($eventType == 1) {
            var_export($productInfo);
            $productInfo->options = OptionManager::AddOptionList($productInfo->options)->ids;
            ProductManager::AddProduct($productInfo);
        }
    }
    ResponseMsg::responseSuccess(1);
} catch (Exception $e) {
    Logger::logErr($e);
    ResponseMsg::responseError(1);
    return false;
} catch (Error $e) {
    Logger::logErr($e);
    ResponseMsg::responseError(1);
    return false;
} catch (ErrorException $e) {
    Logger::logErr($e);
    ResponseMsg::responseError(1);
    return false;
}