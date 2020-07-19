<?php
namespace Server\Log;
class Logger{
    static public function logErr($e){
        $msg = date("Y-m-d H:i:s")." : (".$e->getLine().")".$e->getFile().", ".$e->getMessage();
        $trace = $e->getTrace();
        if($trace){
            $msg .= "\n\tStack Trace";
            for($i = 0 ; $i < count($trace) ; $i++){
                $err = $trace[$i];
                if(array_key_exists("file", $err) && array_key_Exists("line", $err)){
                    $msg .= "\n\t#$i ".$err['file']."(".$err['line'].") : ";
                    if(array_key_exists("class", $err)){
                        $msg .= $err['class']."\\";
                    }
                    $msg .= $err['function'];
                }
            }
        }
        self::log($msg);
    }
    static public function log($data){
        if(!is_dir(LOG_DIR))mkdir(LOG_DIR);
        file_put_contents(LOG_FILE, $data."\n", FILE_APPEND | LOCK_EX);
    }
}
