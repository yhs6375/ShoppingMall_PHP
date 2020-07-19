<?php

namespace Util;

class ResponseMsg
{
    static public function makeSuccessObject($code, $data)
    {
        if (is_object($data)) {
            $data->code = $code;
        } else {
            $data = array(
                "code" => $code
            );
        }
        return $data;
    }
    static public function makeErrorObject($code, $data)
    {
        if (is_object($data)) {
            $data->error = array("code" => $code);
        } else {
            $data = array(
                "error" => array(
                    "code" => $code
                )
            );
        }
        return $data;
    }
    static public function responseSuccess($code, $data = null)
    {
        echo json_encode(self::makeSuccessObject($code, $data));
        return true;
    }
    static public function responseError($code, $data = null)
    {
        echo json_encode(self::makeErrorObject($code, $data));
        return false;
    }
}