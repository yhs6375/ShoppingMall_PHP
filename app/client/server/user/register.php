<?php
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Util\ResponseMsg;
use Util\String\ValidCheck;
use Server\Member\MemberData;
use Server\DB\DB;
use Server\Member\Join\ShoppingUserManager;

try {
	if (!isset($_SERVER['HTTP_REFERER'])) {
		exit('No direct access allowed/정상적인 접근방식이 아닙니다');
	}
	if (!preg_match("/" . getenv($_SERVER['HTTP_HOST']) . "/i", getenv($_SERVER['HTTP_REFERER']))) {
		exit('No direct access allowed/정상적인 접근방식이 아닙니다');
	}
	$member_info = explode(",", $_REQUEST['dbin']);

	$memberData = new MemberData();
	if (!ValidCheck::id_check($member_info[0])) {
		ResponseMsg::responseError(0);
		return false;
	} else {
		$memberData->id = $member_info[0];
	}
	if (!ValidCheck::password_check($member_info[1]) || ValidCheck::compare_str($member_info[1], $member_info[0])) {
		ResponseMsg::responseError(0);
		return false;
	} else {
		$memberData->pw = $member_info[1];
	}
	if (!ValidCheck::email_check($member_info[2])) {
		ResponseMsg::responseError(0);
		return false;
	} else {
		$memberData->email = $member_info[2];
	}
	if (!ValidCheck::phone_check($member_info[3])) {
		ResponseMsg::responseError(0);
		return false;
	} else {
		$memberData->sms = $member_info[3];
	}
	$memberData->ip = ValidCheck::getIPAddr();
	if ($member_info[4] == "true") {
		$memberData->smsReceive = 1;
	} else {
		$memberData->smsReceive = 0;
	}
	if ($member_info[5] == "true") {
		$memberData->emailReceive = 1;
	} else {
		$memberData->emailReceive = 0;
	}
	if (!ShoppingUserManager::regist($memberData)) {
		ResponseMsg::responseError(0);
		return false;
	}
	echo json_encode(array(
		"id" => $memberData->id
	));
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