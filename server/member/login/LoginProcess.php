<?php
//서버의 로그인 관련(DB 및 유효성) 처리 클래스
namespace Server\Member\Login;

use Server\Log\Logger;
use Server\DB\DB;
use Server\Member\MemberData;

/*
    success ->  1 : login successfully;
                2 : no matching member;
                3 : password incorrect;
                0 : error;
    error   ->  0 : unknown error;
*/

class LoginProcess
{
    //관리자페이지 로그인 처리 멤버 함수
    public function adminPageLogin($memberData)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_admin");
        try {
            //트랜잭션 사용
            $dbConnection->beginTransaction();

            //로그인 시도하는 유저의 아이디 확인 쿼리
            $query = "select id,pw,name from member where member_id=:member_id";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":member_id", $memberData->id, \PDO::PARAM_STR);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2);
                }
                //DB속 유저 정보를 object로 받아온다
                $query_result = $stmt->fetch(\PDO::FETCH_OBJ);
                $idx = $query_result->id;
                //패스워드 검증
                if (!password_verify($memberData->pw, $query_result->pw)) {
                    //Case1 : 패스워드 불일치시
                    $query = "update member set try_count=try_count+1 where id=:id";
                    $stmt = $dbConnection->prepare($query);
                    $stmt->bindParam(":id", $idx, \PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        $dbConnection->commit();
                        return ReturnObject(3);
                    }
                } else {
                    //Case2 : 패스워드 일치시
                    //접속할때의 ip와 timestamp를 테이블에 저장
                    $query = "update member set last_login_ip=:ip, last_login_date=now(), try_count=0 where id=:id";
                    $stmt = $dbConnection->prepare($query);
                    $stmt->bindParam(":ip", $memberData->ip, \PDO::PARAM_INT);
                    $stmt->bindParam(":id", $idx, \PDO::PARAM_INT);
                    if ($stmt->execute()) {
                        //로그인 성공적으로 수행
                        $dbConnection->commit();
                        return ReturnObject(
                            1,
                            (object) [
                                "id" => $idx,
                                "name" => $query_result->name
                            ]
                        );
                    }
                }
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            echo $e;
            if ($dbConnection->inTransaction()) {
                $dbConnection->rollBack();
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