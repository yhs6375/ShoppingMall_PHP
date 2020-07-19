<?php
//카테고리 처리 관련 api
namespace Server\Shopping\Product;

use Server\Log\Logger;
use Server\DB\DB;
use Server\DB\DBError;

class CategoryManager
{
    static private function MakeInfoObject($idx, $categoryName, $parentID, $order, $subCategoryCount = 0, $goodsCount = 0)
    {
        if ($parentID == -1) {
            return (object)array(
                "id" => $idx,
                "categoryName" => $categoryName,
                "order" => $order,
                "subCategoryCount" => $subCategoryCount,
                "goodsCount" => $goodsCount
            );
        } else {
            return (object)array(
                "id" => $idx,
                "categoryName" => $categoryName,
                "parentID" => $parentID,
                "order" => $order,
                "subCategoryCount" => $subCategoryCount,
                "goodsCount" => $goodsCount
            );
        }
    }
    /*메인 카테고리를 추가한다.
    success ->  1 : add category succesfully;
                2 : duplicate error;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function AddCategory($mainCategoryName, $order)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            //우선순위 수정
            $query = "update category set `order`=`order`+1 where `order`>=:order";
            $stmt = $dbConnection->prepare($query);
            $stmt->execute([
                "order" => $order
            ]);

            //카테고리 추가
            $query = "insert into category (name, `order`)
            values
            (
               :name,
               :order
            );
            ";
            $stmt = $dbConnection->prepare($query);
            $stmt->execute([
                "name" => $mainCategoryName,
                "order" => $order
            ]);
            $id = $dbConnection->lastInsertId();
            $dbConnection->commit();

            return ReturnObject(1, CategoryManager::MakeInfoObject($id, $mainCategoryName, -1, $order));
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
    /*서브 카테고리를 추가한다.
    메인카테고리로 id를 받는다.
    success ->  1 : add category succesfully;
                2 : duplicate error;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function AddSubCategoryById($mainCategoryId, $subCategoryName, $order)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            //우선순위 수정
            $query = "update category_sub set `order`=`order`+1 where `order`>=:order and `parent_id`=:parent_id";
            $stmt = $dbConnection->prepare($query);
            $stmt->execute([
                "parent_id" => $mainCategoryId,
                "order" => $order
            ]);
            $query = "insert into category_sub (`parent_id`, `name`, `order`)
            values
            (
                :parent_id,
                :name,
                :order
            )";
            $stmt = $dbConnection->prepare($query);
            echo "$mainCategoryId\n$subCategoryName\n$order";
            $success = $stmt->execute([
                "parent_id" => $mainCategoryId,
                "name" => $subCategoryName,
                "order" => $order
            ]);
            if ($success) {
                $id = $dbConnection->lastInsertId();
                $dbConnection->commit();
                return ReturnObject(1, CategoryManager::MakeInfoObject($id, $subCategoryName, $mainCategoryId, $order));
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*서브 카테고리를 추가한다.
    success ->  1 : add category succesfully;
                2 : duplicate error;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function AddSubCategory($mainCategoryName, $subCategoryName)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            $query = "insert into category (name)
            values
            (
               :name
            ) 
            on duplicate key update id=LAST_INSERT_ID(`id`)
            ";
            $stmt = $dbConnection->prepare($query);
            $stmt->execute([
                "name" => $mainCategoryName
            ]);
            $query = "insert into category_sub (parent_id, name)
            values
            (
                last_insert_id(),
                :name
            )";
            $stmt = $dbConnection->prepare($query);
            $success = $stmt->execute([
                "name" => $subCategoryName
            ]);
            $dbConnection->commit();
            return ReturnObject(1);
        } catch (\PDOException $e) {
            $dbConnection->rollBack();
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function ModifyCategory($id, $mainCategoryName, $order = 0)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            if ($order > 0) {
                $query = "update category set `order` = `order`+1 where `order`>=:order";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":order", $order, \PDO::PARAM_INT);
                if (!$stmt->execute()) {
                    $dbConnection->rollBack();
                    return ReturnObject(0, 0);
                }
            }
            $query = "update category set
                name=:name";
            if ($order > 0) {
                $query .= ",`order`=:order";
            }
            $query .= " where id = :idx;";
            $stmt = $dbConnection->prepare($query);
            if ($order > 0) {
                $result = $stmt->execute([
                    "name" => $mainCategoryName,
                    "order" => $order,
                    "idx" => $id
                ]);
            } else {
                $result = $stmt->execute([
                    "name" => $mainCategoryName,
                    "idx" => $id
                ]);
            }
            if (!$result) {
                $dbConnection->rollBack();
                return ReturnObject(0, 0);
            }
            $dbConnection->commit();
            return ReturnObject(1);
        } catch (\PDOException $e) {
            Logger::logErr($e);
            $dbConnection->rollBack();
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function ModifySubCategory($subCategoryId, $subCategoryName, $mainCategoryId, $order = 0)
    {
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            if ($order > 0) {
                $query = "update category_sub set `order` = `order`+1 where `order`>=:order and parent_id=:parent_id";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":order", $order, \PDO::PARAM_INT);
                $stmt->bindParam(":parent_id", $mainCategoryId, \PDO::PARAM_INT);
                if (!$stmt->execute()) {
                    $dbConnection->rollBack();
                    return ReturnObject(0, 0);
                }
            }
            $query = "update category_sub set
                name=:name";
            if ($order > 0) {
                $query .= ",`order`=:order";
            }
            $query .= " where id = :idx;";
            $stmt = $dbConnection->prepare($query);
            if ($order > 0) {
                $result = $stmt->execute([
                    "name" => $subCategoryName,
                    "order" => $order,
                    "idx" => $subCategoryId
                ]);
            } else {
                $result = $stmt->execute([
                    "name" => $subCategoryName,
                    "idx" => $subCategoryId
                ]);
            }
            if (!$result) {
                $dbConnection->rollBack();
                return ReturnObject(0, 0);
            }
            $dbConnection->commit();
            return ReturnObject(1);
        } catch (\PDOException $e) {
            $dbConnection->rollBack();
            if ($e->errorInfo[1] == DBError::DUPLICATE_ERROR) {
                return ReturnObject(2);
            }
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Error $e) {
            $dbConnection->rollBack();
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function DeleteSubCategory($parentID, $subCategoryName)
    {
        is_numeric($parentID) ? $isName = false : $isName = true;
        $db = new DB();
        $dbConnection = $db->shoppingAdminLogin("shopping_product");
        try {
            //bind query start wether or name
            $query = "delete from category_sub where ";
            if ($isName) {
                $query .= "name = :subName and parent_id exist " .
                    "(select id from category where name = :v2)";
            } else {
                $query .= "name = :subName and parent_id = :v2";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindValue(":v2", $parentID);
            $stmt->bindParam(":subName", $subCategoryName);
            if ($stmt->execute()) {
                $cnt = $stmt->rowCount();
                if ($cnt === 0) {
                    return ReturnObject(2);
                }
                return ReturnObject(1);
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
    */
    static public function DeleteMainCategory($id)
    {
        $db = new DB();
        $dbConnection = $db->shoppingAdminLogin("shopping_product");
        try {
            is_numeric($id) ? $isName = false : $isName = true;
            $query = "delete from category where ";
            if ($isName) {
                $query .= "name = :v1";
            } else {
                $query .= "id = :v1";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindValue(":v1", $id);
            if ($stmt->execute()) {
                $cnt = $stmt->rowCount();
                if ($cnt === 0) {
                    return ReturnObject(2);
                }
                return ReturnObject(1);
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    return  ->  카테고리정보(object)
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
            ->  1 : mainCategoryName is Numeric;
    */
    static public function GetMainCategoryById($id)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            $query = "select category.`id`,category.`name`,category.order,count(category_sub.id) as subCategoryCount,
                count(product_category.category_id) as goodsCount 
                from category 
                left join category_sub on category.id = category_sub.parent_id
                left join product_category on category.id = product_category.category_id
                where category.id = :idx
                group by category_sub.parent_id";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":idx", $id, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2, (object)array());
                }
                $result = $stmt->fetchObject();
                return ReturnObject(
                    1,
                    $result
                );
            }
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    return  ->  카테고리정보(object)
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
            ->  1 : mainCategoryName is Numeric;
    */
    static public function GetSubCategoryById($id)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            $query = "select cat.`id`,cat.`name`,cat.order,cat.parent_id,
                count(product_category.category_id) as goodsCount 
                from category_sub as cat
                left join product_category on cat.id = product_category.sub_category_id
                where cat.`id` = :idx";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":idx", $id, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2, (object)array());
                }
                $result = $stmt->fetchObject();
                return ReturnObject(
                    1,
                    $result
                );
            }
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetMainCategoryList($start = 0, $end = 0)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select category.`id`,category.`name`,category.order,count(category_sub.id) as subCategoryCount,
                count(product_category.category_id) as goodsCount 
                from category 
                left join category_sub on category.id = category_sub.parent_id
                left join product_category on category.id = product_category.category_id
                group by category.id
                order by `order` asc
                ";
            if (!($start == 0 && $end == 0)) {
                $query .= "limit :start, :end";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":start", $start, \PDO::PARAM_INT);
            $stmt->bindParam(":end", $end, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "categoryList" => array(),
                    "count" => $stmt->rowCount()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->categoryList, $row);
                }
                return ReturnObject(
                    1,
                    $result
                );
            }
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetMainCategoryCount()
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select count(category.id) as count from category";
            $stmt = $dbConnection->prepare($query);
            if ($stmt->execute()) {

                return ReturnObject(
                    1,
                    (object)array("count" => $stmt->fetchObject()->count)
                );
            }
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    /*
    return  ->  id(int)
    success ->  1 : query succesfully;
                2 : nothing category in table;
                0 : error;
    error   ->  0 : unknown error;
            ->  1 : mainCategoryName is Numeric;
    */
    static public function GetCategoryId($mainCategoryName, $subCategoryName = null)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            if ($subCategoryName === null) {
                $query = "select (id) from category where name=:v1";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":v1", $mainCategoryName, \PDO::PARAM_STR);
            } else {
                $query = "select sub.id from category_sub as sub 
                left join category as main 
                on main.name = :main_name
                where main.id = sub.parent_id and sub.name = :sub_name";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":main_name", $mainCategoryName, \PDO::PARAM_STR);
                $stmt->bindParam(":sub_name", $subCategoryName, \PDO::PARAM_STR);
            }
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2);
                }
                return ReturnObject(
                    1,
                    (object)[
                        "id" => (int)$stmt->fetchAll(\PDO::FETCH_COLUMN)[0]
                    ]
                );
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetCategoryName($id, $sub = false)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            if (!$sub) {
                $query = "select (name) from category where id=:id";
            } else {
                $query = "select (name) from category_sub where id=:id";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":id", $id, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2);
                }
                return ReturnObject(
                    1,
                    (object)[
                        "name" => $stmt->fetchAll(\PDO::FETCH_COLUMN)[0]
                    ]
                );
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetSubCategoryListById($idx)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            $query = "select sub.id, sub.name, sub.order,
                count(product_category.sub_category_id) as goodsCount
                from category_sub as sub
                left join product_category on sub.id = product_category.sub_category_id
                where sub.parent_id = :idx
                group by sub.id order by `order` asc";
            $stmt = $dbConnection->prepare($query);

            $stmt->bindParam(":idx", $idx, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "categoryList" => array()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->categoryList, $row);
                }
                return ReturnObject(
                    1,
                    $result
                );
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetSubCategoryList($mainCategoryName)
    {
        try {
            $db = new DB();
            $dbConnection = $db->shoppingAdminLogin("shopping_product");
            $query = "select sub.id from category_sub as sub 
            left join category as main 
            on main.name = :main_name 
            where main.id = sub.parent_id";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":main_name", $mainCategoryName, \PDO::PARAM_STR);
            if ($stmt->execute()) {
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(2);
                }
                return ReturnObject(
                    1,
                    (object)[
                        "id" => $stmt->fetchAll(\PDO::FETCH_COLUMN)
                    ]
                );
            }
            return ReturnObject(0, 0);
        } catch (\PDOException $e) {
            echo $e;
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
}