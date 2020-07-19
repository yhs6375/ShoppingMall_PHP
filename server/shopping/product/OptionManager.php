<?php
//상품 관련 api
namespace Server\Shopping\Product;

use Server\Log\Logger;
use Server\DB\DB;
use Server\DB\DBError;

class OptionManager
{
    public function __construct()
    {
    }
    /*상품을 추가한다.
    success ->  1 : add product succesfully;
                2 : duplicate error;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function AddOptionList($optionList)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $optionIds = array();
            $dbConnection->beginTransaction();
            //상품 등록
            $query = "insert into option (name, value)
            values
            (
               :name,
               :value
            ) on duplicate key update id=LAST_INSERT_ID(`id`);
            ";
            $stmt = $dbConnection->prepare($query);
            foreach ($optionList as $option) {
                foreach ($option->sub as $option_sub) {
                    $stmt->bindParam(":name", $option->main, \PDO::PARAM_STR);
                    $stmt->bindParam(":value", $option_sub, \PDO::PARAM_STR);
                    if ($stmt->execute()) {
                        array_push($optionIds, (int)$dbConnection->lastInsertId());
                    } else {
                        $dbConnection->rollBack();
                        return ReturnObject(0, 0);
                    }
                }
            }
            $optionCount = 0;
            for ($i = 0; $i < count($optionList); $i++) {
                $optionCount += count($optionList[$i]->sub);
            }
            if (count($optionIds) == $optionCount) {
                $dbConnection->commit();
                return ReturnObject(1, (object)array(
                    "ids" => $optionIds
                ));
            }

            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            Logger::logErr($e);
            $dbConnection->rollBack();
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            Logger::logErr($e);
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
}