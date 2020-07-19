<?php
/*
	return code 1 : success
*/
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Server\File\ImageUploader;
use Server\File\FileException;
use Util\ResponseMsg;


try {
    if (!isset($_SERVER['HTTP_REFERER'])) {
        exit('No direct access allowed/정상적인 접근방식이 아닙니다');
    }
    if (!preg_match("/" . getenv($_SERVER['HTTP_HOST']) . "/i", getenv($_SERVER['HTTP_REFERER']))) {
        exit('No direct access allowed/정상적인 접근방식이 아닙니다');
    }
    ob_start();

    $IMAGE_DIR_URL = $_SERVER['IMAGE_SERVER'];
    $dirPath = "C:/php_web/upload_img/";
    $allowMime = array("image/jpeg", "image/png", "image/gif");
    $imageUploader = new ImageUploader($dirPath, $allowMime, function () {
        return uniqid($more_entropy = true);
    }, 2000, 2000);
    $fileData = $imageUploader->start($_FILES["file"]);
    $fileDataLength = count($fileData);
    for ($i = 0; $i < $fileDataLength; $i++) {
        $fileData[$i]->name = $IMAGE_DIR_URL . $fileData[$i]->name;
    }
    echo $fileData[0]->name;
    return true;
} catch (FileException $e) {
    Logger::logErr($e);
    ResponseMsg::responseError(1);
    return false;
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