<?php
//상품 관련 api
namespace Server\Shopping\Product;

use Server\Log\Logger;
use Server\DB\DB;
use Server\DB\DBError;

class ProductManager
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
    static public function AddProduct($productInfo)
    {
        if (!isset($productInfo->hot)) $productInfo->hot = false;
        if (!isset($productInfo->new)) $productInfo->new = false;
        $db = new DB();
        $dbConnection = $db->memberAdminLogin("shopping_product");
        try {
            $dbConnection->beginTransaction();
            //상품 등록
            $query = "insert into product (name, price, discount_price, shipping_fee, hot, new, saved, stock)
            values
            (
               :name,
               :price,
               :discount_price,
               :shipping_fee,
               :hot,
               :new,
               :saved,
               :stock
            );
            ";

            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":name", $productInfo->name, \PDO::PARAM_STR);
            $stmt->bindParam(":price", $productInfo->price, \PDO::PARAM_INT);
            $stmt->bindParam(":discount_price", $productInfo->discount, \PDO::PARAM_INT);
            $stmt->bindParam(":shipping_fee", $productInfo->shipping, \PDO::PARAM_INT);
            $stmt->bindParam(":hot", $productInfo->hot, \PDO::PARAM_BOOL);
            $stmt->bindParam(":new", $productInfo->new, \PDO::PARAM_BOOL);
            $stmt->bindParam(":saved", $productInfo->saved, \PDO::PARAM_INT);
            $stmt->bindParam(":stock", $productInfo->stock, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $productId = $dbConnection->lastInsertId();
                //상품 옵션 적용
                $query = "insert into product_option (product_id, option_id)
                    values
                    (
                       :product_id,
                       :option_id
                    )";
                $stmt = $dbConnection->prepare($query);
                foreach ($productInfo->options as $option) {
                    $stmt->bindValue(":product_id", $productId);
                    $stmt->bindValue(":option_id", $option);
                    if (!$stmt->execute()) {
                        $dbConnection->rollBack();
                        return ReturnObject(0, 0);
                    }
                }
                //상품 카테고리 등록
                if (isset($productInfo->subCategoryId)) {
                    $query = "insert ignore into product_category (product_id, category_id, sub_category_id)
                    values
                    (
                       :product_id,
                       :category_id,
                       :sub_category_id
                    )";
                    $stmt = $dbConnection->prepare($query);
                    $stmt->bindValue(":product_id", $productId);
                    $stmt->bindValue(":category_id", $productInfo->categoryId);
                    $stmt->bindValue(":sub_category_id", $productInfo->subCategoryId);
                } else {
                    $query = "insert ignore into product_category (product_id, category_id)
                    values
                    (
                       :product_id,
                       :category_id
                    )";
                    $stmt = $dbConnection->prepare($query);
                    $stmt->bindValue(":product_id", (int)$productId);
                    $stmt->bindValue(":category_id", (int)$productInfo->categoryId);
                }
                if (!$stmt->execute()) {
                    $dbConnection->rollBack();
                    return ReturnObject(0, 0);
                }
                //상품 콘텐츠 등록
                $query = "insert ignore into product_content (product_id, html)
                values
                (
                   :product_id,
                   :html
                )";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":product_id", $productId, \PDO::PARAM_INT);
                $stmt->bindParam(":html", $productInfo->html, \PDO::PARAM_STR);
                if (!$stmt->execute()) {
                    $dbConnection->rollBack();
                    return ReturnObject(0, 0);
                }
                //상품 미리보기 이미지 등록
                $query = "insert ignore into product_preview_image (product_id, image_url)
                values
                (
                   :product_id,
                   :image_url
                )";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":product_id", $productId, \PDO::PARAM_INT);
                $stmt->bindParam(":image_url", $productInfo->mainImage, \PDO::PARAM_STR);
                if (!$stmt->execute()) {
                    $dbConnection->rollBack();
                    return ReturnObject(0, 0);
                }
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
    static public function GetProductList($start = 0, $count = 0)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select product.id, product.name, product.price,product.discount_price
                ,product.shipping_fee,product.registed_time,product.hot,product.new,product.saved
                ,product.stock, product_category.category_id,product_category.sub_category_id,
                product_preview_image.image_url 
                from product
                left join product_category on product.id = product_category.product_id
                left join product_preview_image on product.id = product_preview_image.product_id
                group by product.id
                order by id asc 
                ";
            if (!($start == 0 && $count == 0)) {
                $query .= "limit :start, :count";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":start", $start, \PDO::PARAM_INT);
            $stmt->bindParam(":count", $count, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "productList" => array(),
                    "count" => $stmt->rowCount()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->productList, $row);
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
    static public function GetProductListByCategory($mainCategoryId, $subCategoryId, $start = 0, $count = 0)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select product.id, product.name, product.price,product.discount_price
                ,product.shipping_fee,product.registed_time,product.hot,product.new,product.saved
                ,product.stock, product_category.category_id,product_category.sub_category_id,
                product_preview_image.image_url 
                from product
                left join product_category on product.id = product_category.product_id
                left join product_preview_image on product.id = product_preview_image.product_id
                where product_category.category_id = :main_id ";
            if ($subCategoryId > 0) {
                $query .= "and product_category.sub_category_id = :sub_id";
            }
            $query .= "group by product.id
                order by id asc 
                ";
            if (!($start == 0 && $count == 0)) {
                $query .= "limit :start, :count";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":main_id", $mainCategoryId, \PDO::PARAM_INT);
            if ($subCategoryId > 0) $stmt->bindParam(":sub_id", $subCategoryId, \PDO::PARAM_INT);
            $stmt->bindParam(":start", $start, \PDO::PARAM_INT);
            $stmt->bindParam(":count", $count, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "productList" => array(),
                    "count" => $stmt->rowCount()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->productList, $row);
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
    static public function GetHotProductList($start = 0, $count = 0)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select product.id, product.name, product.price,product.discount_price
                ,product.shipping_fee,product.registed_time,product.hot,product.new,product.saved
                ,product.stock, product_category.category_id,product_category.sub_category_id,
                product_preview_image.image_url 
                from product
                left join product_category on product.id = product_category.product_id
                left join product_preview_image on product.id = product_preview_image.product_id
                where product.hot = 1
                group by product.id
                order by id asc 
                ";
            if (!($start == 0 && $count == 0)) {
                $query .= "limit :start, :count";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":start", $start, \PDO::PARAM_INT);
            $stmt->bindParam(":count", $count, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "productList" => array(),
                    "count" => $stmt->rowCount()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->productList, $row);
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
    static public function GetNewProductList($start = 0, $count = 0)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select product.id, product.name, product.price,product.discount_price
                ,product.shipping_fee,product.registed_time,product.hot,product.new,product.saved
                ,product.stock, product_category.category_id,product_category.sub_category_id,
                product_preview_image.image_url 
                from product
                left join product_category on product.id = product_category.product_id
                left join product_preview_image on product.id = product_preview_image.product_id
                group by product.id
                order by product.registed_time desc 
                ";
            if (!($start == 0 && $count == 0)) {
                $query .= "limit :start, :count";
            }
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":start", $start, \PDO::PARAM_INT);
            $stmt->bindParam(":count", $count, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array(
                    "productList" => array(),
                    "count" => $stmt->rowCount()
                );
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                while ($row = $stmt->fetchObject()) {
                    array_push($result->productList, $row);
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
    static public function GetProductDetail($id)
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");
            //상품 상세정보전체 가져오기
            $query = "select product.name, product.price,product.discount_price
                ,product.shipping_fee,product.registed_time,product.hot,product.new,product.saved
                ,product.stock, product_category.category_id,product_category.sub_category_id,
                product_preview_image.image_url, product_content.html 
                from product
                left join product_category on product.id = product_category.product_id
                left join product_preview_image on product.id = product_preview_image.product_id
                left join product_content on product.id = product_content.product_id
                where product.id = :id 
                group by product.id;
                ";
            $stmt = $dbConnection->prepare($query);
            $stmt->bindParam(":id", $id, \PDO::PARAM_INT);
            if ($stmt->execute()) {
                $result = (object)array();
                if ($stmt->rowCount() === 0) {
                    return ReturnObject(1, $result);
                }
                $result->product = $stmt->fetchObject();
                //상품 옵션 가져오기
                $query = "select option.name, option.value
                    from product_option
                    left join option on option.id = product_option.option_id
                    where product_option.product_id = :id
                    ";
                $stmt = $dbConnection->prepare($query);
                $stmt->bindParam(":id", $id, \PDO::PARAM_INT);
                if ($stmt->execute()) {
                    $options = array();
                    if ($stmt->rowCount() === 0) {
                        $result->product->options = $options;
                        return ReturnObject(1, $result);
                    }
                    //상품 옵션 병합 정렬
                    while ($row = $stmt->fetchObject()) {
                        $find = false;
                        foreach ($options as $option) {
                            if ($option->name == $row->name) {
                                $find = true;
                                array_push($option->values, $row->value);
                                break;
                            }
                        }
                        if (!$find) {
                            array_push($options, (object)array(
                                "name" => $row->name,
                                "values" => array($row->value)
                            ));
                        }
                    }
                    $result->product->options = $options;
                    return ReturnObject(
                        1,
                        $result
                    );
                }
                return ReturnObject(0, 0);
            }
        } catch (\PDOException $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        } catch (\Exception $e) {
            Logger::logErr($e);
            return ReturnObject(0, 0);
        }
    }
    static public function GetProductCount()
    {
        try {
            $db = new DB();
            $dbConnection = $db->memberAdminLogin("shopping_product");

            $query = "select count(product.id) as count from product";
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
}