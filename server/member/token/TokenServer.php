<?php
/*TokenServer클래스
JWT방식(로그인 후 지속적으로 올바른 유저임을 검증)을 사용하기위한 서버클래스
*/

namespace Server\Member\Token;

use Server\Log\Logger;
use Util\Token\TokenManager;
use Util\Token\TokenException;
use Server\DB\DB;

const ACCESS_TOKEN_EXPIRATION_TIME = 3600;
const REFRESH_TOKEN_EXPIRATION_TIME = 172800; //2일
class TokenServer
{
    const TYPE_ACCESS_TOKEN = 1;
    const TYPE_REFRESH_TOKEN = 2;

    private $tokenManager = null;
    public function __construct()
    {
        $this->tokenManager = new TokenManager();
    }
    public function accessTokenJWTMakeDefault()
    {
        $this->tokenManager
            ->setIssuedTime(time())
            ->setExpTime(time() + ACCESS_TOKEN_EXPIRATION_TIME)
            ->setSignatureKey("hosung");

        $token = $this->tokenManager->getToken();
        return $token->__toString();
    }
    public function refreshTokenJWTMakeDefault()
    {
        $this->tokenManager
            ->setIssuedTime(time())
            ->setExpTime(time() + REFRESH_TOKEN_EXPIRATION_TIME)
            ->setSignatureKey("hosung_refresh");

        $token = $this->tokenManager->getToken();
        return $token->__toString();
    }
    //Access토큰과 Refresh토큰 두개를 발급한 후 Refresh토큰은 유저의 DB에 저장.
    public function tokensMakeDefault($id)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_admin");
        try {
            $token = (object) array();
            $token->access = $this->accessTokenJWTMakeDefault();
            $token->refresh = $this->refreshTokenJWTMakeDefault();

            $query = "select id,pw from member where member_id=:member_id";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":member_id", $id, \PDO::PARAM_STR);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2);
                }
                //유저 정보를 object로 저장 후 id를 받아온다.
                $query_result = $stmt->fetch(\PDO::FETCH_OBJ);
                $idx = $query_result->id;

                $query = "update member set refresh_token=:rt where id=:id";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":rt", $token->refresh, \PDO::PARAM_STR);
                $stmt->bindParam(":id", $idx, \PDO::PARAM_INT);
                if ($stmt->execute()) {
                    return ReturnObject(1);
                }
            }
        } catch (TokenException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function verify($token, $type)
    {
        if ($type == TokenServer::TYPE_ACCESS_TOKEN) {
            $result = TokenManager::verify($token, "hosung");
        } else {
            $result = TokenManager::verify($token, "hosung_refresh");
        }
        return $result;
    }
}