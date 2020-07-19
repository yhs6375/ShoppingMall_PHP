<?php
//리턴시 결과의 유용한 정보를 담을 수 있는 Object 생성
function ReturnObject($type, $obj = -1, $errType = -1)
{
    if (is_array($obj)) {
        $obj = (object) $obj;
    }
    if (is_object($obj)) {
        $obj->type = $type;
        if ($errType != -1) {
            $obj->err = (object) [
                "type" => $errType
            ];
        }
    } else {
        if (is_numeric($obj)) {
            $err = $obj;
            $obj = (object) [
                "type" => $type
            ];
            $obj->err = (object) [
                "type" => $err
            ];
        }
    }
    return (object) $obj;
}