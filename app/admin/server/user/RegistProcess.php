<?php
//관리자페이지 회원가입 프로세스
/*
	return code 1 : success
*/
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Server\Member\Join\AdminRegistProcess;
use Server\Member\MemberData;
use Util\ResponseMsg;

try {
	$memberData = new MemberData();
	$memberData->id = "admin@hosung.com";
	$memberData->pw = "a644260";
	$memberData->name = "hosung";
	$registProcess = new AdminRegistProcess();
	$registProcess->regist($memberData);
	ResponseMsg::responseSuccess(1);
	return true;
} catch (Exception $e) {
	Logger::logErr($e);
	ResponseMsg::responseError(1);
	return false;
}