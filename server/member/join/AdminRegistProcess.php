<?php
/*
    관리자페이지 계정 생성을 하는 프로세스
*/

namespace Server\Member\Join;

use Server\Log\Logger;
use Server\DB\DB;
use Server\DB\DBError;
use Util\String\ValidCheck;

class AdminRegistProcess
{
    public function regist($memberData)
    {
        if (!isset($memberData->ip)) {
            $memberData->ip = ValidCheck::getIpAddr();
        }
        $db = new DB();
        $dbConnection = $db->adminPageAdminLogin();
        try {
            $dbConnection->beginTransaction();
            $memberData->pw = password_hash($memberData->pw, PASSWORD_DEFAULT);

            //Join 쿼리
            $query = "insert into member (member_id,pw,name,last_login_ip,last_login_date)
        values
        (
           :member_id,
           :pw,
           :name,
           :ip,
           now()
        )";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":member_id", $memberData->id, \PDO::PARAM_STR);
            $stmt->bindParam(":pw", $memberData->pw, \PDO::PARAM_STR);
            $stmt->bindParam(":name", $memberData->name, \PDO::PARAM_STR);
            $stmt->bindParam(":ip", $memberData->ip, \PDO::PARAM_INT);
            $stmt->debugDumpParams();
            if ($stmt->execute()) {
                $dbConnection->commit();
                return ReturnObject(1);
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            echo $e;
            if ($dbConnection->inTransaction()) {
                $dbConnection->rollBack();
            }
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            if ($dbConnection->inTransaction()) {
                $dbConnection->rollBack();
            }
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            if ($dbConnection->inTransaction()) {
                $dbConnection->rollBack();
            }
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
}