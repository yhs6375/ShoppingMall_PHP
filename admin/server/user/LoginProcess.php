<?php
//관리자페이지 기본 로그인 프로세스
/*
	return code 1 : success
*/
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Server\Member\Login\LoginProcess;
use Server\Member\MemberData;
use Server\Member\Token\TokenServer;
use Util\String\ValidCheck;
use Util\ResponseMsg;
use Util\Token\TokenException;

try {
	if (!isset($_SERVER['HTTP_REFERER'])) {
		exit('No direct access allowed/정상적인 접근방식이 아닙니다');
	}
	if (!preg_match("/" . getenv($_SERVER['HTTP_HOST']) . "/i", getenv($_SERVER['HTTP_REFERER']))) {
		exit('No direct access allowed/정상적인 접근방식이 아닙니다');
	}
	$member_info = explode(",", $_REQUEST['dbin']);

	//유저정보를 가져와 유효성(Validation)이 맞는지 검사한다.
	$memberData = new MemberData();
	$memberData->id = $member_info[0];
	$memberData->pw = $member_info[1];
	$memberData->ip = ValidCheck::getIPAddr();
	$loginProcess = new LoginProcess();
	$result = $loginProcess->adminPageLogin($memberData);
	if ($result->type != 1) {
		//로그인 실패
		ResponseMsg::responseError(0);
		return false;
	}
	//클라이언트에게 토큰을 발급해 쿠키에 저장
	$tokenServer = new TokenServer();
	$tokens = $tokenServer->tokensMakeDefault($memberData->id);
	$accessToken = $tokenServer->accessTokenJWTMakeDefault();
	$refreshToken = $tokenServer->refreshTokenJWTMakeDefault();
	setcookie("n", $result->name, time() + 60 * 60, "/", "127.0.0.1");
	setcookie("at", $accessToken, time() + 60 * 60, "/", "127.0.0.1");
	setcookie("rt", $refreshToken, time() + 60 * 60, "/", "127.0.0.1");
	ResponseMsg::responseSuccess(1);
	return true;
} catch (TokenException $e) {
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