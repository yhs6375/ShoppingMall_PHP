<?php
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Util\ResponseMsg;
use Util\String\ValidCheck;
use Server\DB\DB;

try {
	$smsNumber = $_REQUEST['sms'];
	if (!ValidCheck::phone_check($smsNumber)) {
		ResponseMsg::responseSuccess(2);
		return;
	}
	$db = new DB();
	$dbConnection = $db->memberAuthLogin("shopping");
	$query = "select id from member where sms=:sms";
	$stmt = $dbConnection->prepare($query);
	$stmt->bindValue(":sms", $smsNumber);
	$stmt->execute();
	if ($stmt->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT))
		ResponseMsg::responseSuccess(1);
	else
		ResponseMsg::responseSuccess(0);
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