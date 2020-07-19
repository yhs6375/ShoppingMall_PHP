<?php

namespace Server\Member\Join;

use Server\Log\Logger;
use Server\DB\DB;
use Server\DB\DBError;

require_server_safe("member/MemberData.php");
require_server_safe("passcompat/compat.php");
class ShoppingUserManager
{
    static public function regist($memberData)
    {
        try {
            $memberData->pw = password_hash($memberData->pw, PASSWORD_DEFAULT);

            //Join 쿼리
            $db = new DB();
            $dbConnection = $db->dbaLogin("shopping");
            $query = "insert into member (user_id,pw,email,sms,last_login_ip,register_date,sms_on,email_on,grade,saved_money)
            values
            (
               :id,
               :pw,
               :email,
               :sms,
               :ip,
               current_timestamp(),
               :smsReceive,
               :emailReceive,
               1,
               0
            )";
            Logger::log("dwlqdkowqkdow" . $memberData->ip);
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":id", $memberData->id, \PDO::PARAM_STR);
            $stmt->bindParam(":pw", $memberData->pw, \PDO::PARAM_STR);
            $stmt->bindParam(":email", $memberData->email, \PDO::PARAM_STR);
            $stmt->bindParam(":sms", $memberData->sms, \PDO::PARAM_STR);
            $stmt->bindParam(":ip", $memberData->ip, \PDO::PARAM_INT);
            $stmt->bindParam(":smsReceive", $memberData->smsReceive, \PDO::PARAM_BOOL);
            $stmt->bindParam(":emailReceive", $memberData->id, \PDO::PARAM_BOOL);
            if ($stmt->execute()) {
                return true;
            }
            return false;
        } catch (\Exception $e) {
            Logger::logErr($e);
            return false;
        } catch (\Error $e) {
            Logger::logErr($e);
            return false;
        } catch (\ErrorException $e) {
            Logger::logErr($e);
            return false;
        }
    }
}