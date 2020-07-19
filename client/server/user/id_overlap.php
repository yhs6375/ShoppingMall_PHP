<?php
require_once($_SERVER["MAIN_PHP"]);

use Server\Log\Logger;
use Util\ResponseMsg;
use Util\String\ValidCheck;
use Server\DB\DB;

try {
	$id = $_REQUEST['idcheck'];
	if (!ValidCheck::id_check($id)) {
		ResponseMsg::responseSuccess(2);
		return;
	}
	$db = new DB();
	$dbConnection = $db->memberAuthLogin("shopping");
	$query = "select id from member where id=:id";
	$stmt = $dbConnection->prepare($query);
	$stmt->bindValue(":id", $id);
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