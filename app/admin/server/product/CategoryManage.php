<?php
//카테고리 추가 프로세스
/*eventType :   1(PUSH)(메인카테고리 추가)
                2(PUSH)(서브카테고리 추가)
                1(PUT)(메인카테고리 수정)
                2(PUT)(서브카테고리 수정)
                1(DELETE)(메인카테고리 삭제)
                2(DELETE)(서브카테고리 삭제)
                1(GET)(메인카테고리 가져오기)
                2(GET)(서브카테고리 가져오기)
*/
/*
	return code 1 : success
*/
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Util\ResponseMsg;
use Server\Shopping\Product\CategoryManager;

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


    //카테고리 추가
    if ($method == "POST") {
        if ($eventType == "1") {
            $mainCategoryName = $_REQUEST["n"];
            $order = $_REQUEST['o'];
            $categoryInfo = CategoryManager::AddCategory($mainCategoryName, $order);
            return ResponseMsg::responseSuccess(1, (object)array(
                "categoryInfo" => (object)array(
                    "id" => $categoryInfo->id,
                    "name" => $categoryInfo->categoryName,
                    "order" => $categoryInfo->order
                )
            ));
        } else if ($eventType == "2") {
            $mainCategoryId = $_REQUEST["i"];
            $subCategoryName = $_REQUEST["m"];
            $order = $_REQUEST["o"];
            $categoryInfo = CategoryManager::AddSubCategoryById($mainCategoryId, $subCategoryName, $order);
            return ResponseMsg::responseSuccess(1, (object)array(
                "categoryInfo" => (object)array(
                    "id" => $categoryInfo->id,
                    "name" => $categoryInfo->categoryName,
                    "order" => $categoryInfo->order
                )
            ));
        }
    }
    //카테고리 수정
    else if ($method == "PUT") {
        if ($eventType == "1") {
            $idx = $_PUT['i'];
            $mainCategoryName = $_PUT["n"];
            $order = $_PUT['o'];
            CategoryManager::ModifyCategory($idx, $mainCategoryName, $order);
        } else if ($eventType == "2") {
        }
        //이름만 수정(메인)
        else if ($eventType == "3") {
            $id = $_PUT['i'];
            $mainCategoryName = $_PUT["n"];
            $result = CategoryManager::ModifyCategory($id, $mainCategoryName);
            if ($result->type == 1) {
                return ResponseMsg::responseSuccess(1);
            }
            return ResponseMsg::responseError(1);
        }
        //이름만 수정(서브)
        else if ($eventType == "4") {
            $subCategoryId = $_PUT['j'];
            $mainCategoryId = $_PUT["i"];
            $mainCategoryName = $_PUT["n"];
            CategoryManager::ModifySubCategory($subCategoryId, $mainCategoryName, $mainCategoryId);
        }
    }
    //카테고리 가져오기 
    else if ($method == "GET") {
        if ($eventType == "1") {
            $totalCategoryCheck = isset($_REQUEST['t']) ? true : false;
            $start = $_REQUEST['st'];
            $page = $_REQUEST['p'];
            $range = $_REQUEST['r'];
            $resultInfo = CategoryManager::GetMainCategoryList($start, $range);
            if ($totalCategoryCheck) $totalCount = CategoryManager::GetMainCategoryCount()->count;
            if ($resultInfo->type == 1) {
                if ($totalCategoryCheck) {
                    return ResponseMsg::responseSuccess(1, (object)array(
                        "categoryList" => $resultInfo->categoryList,
                        "count" => $resultInfo->count,
                        "totalCount" => $totalCount
                    ));
                } else {
                    return ResponseMsg::responseSuccess(1, (object)array(
                        "categoryList" => $resultInfo->categoryList,
                        "count" => $resultInfo->count
                    ));
                }
            } else {
                return ResponseMsg::responseError(1);
            }
        } else if ($eventType == "2") {
            $idx = $_REQUEST['i'];
            $categoryInfo = CategoryManager::GetSubCategoryListById($idx);
            if ($categoryInfo->type == 1) {
                return ResponseMsg::responseSuccess(1, (object)array(
                    "categoryList" => $categoryInfo->categoryList
                ));
            } else {
                return ResponseMsg::responseError(1);
            }
        }
    }
    //카테고리 삭제
    else if ($method == "DELETE") {
    }
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