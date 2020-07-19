<?php
require_server_safe("config.php");
require_error_process();
function rglob($pattern, $flags = 0) {
    $files = glob($pattern, $flags); 
    foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
        $files = array_merge($files, rglob($dir.'/'.basename($pattern), $flags));
    }
    return $files;
}
function require_document_safe($file, $subRequire = false){
    require_files_safe($file, $subRequire);
}
function require_server_safe($file, $subRequire = false){
    $file = $_SERVER["SERVER_DIR"].$file;
    require_files_safe($file, $subRequire);
}
function require_util_safe($file, $subRequire = false){
    $file = $_SERVER["UTIL_DIR"].$file;
    require_files_safe($file, $subRequire);
}
function require_error_safe($file, $subRequire = false){
    $file = $_SERVER["UTIL_DIR"]."error/".$file;
    require_files_safe($file, $subRequire);
}
function require_library_safe($file, $subRequire = false){
    $file = $_SERVER["LIBRARY_DIR"].$file;
    require_files_safe($file, $subRequire);
}
function require_files_safe($file, $subRequire = false){
    if($file[strlen($file)-1] == '\\' || $file[strlen($file)-1] == '/'){
        if($subRequire){
            $files = rglob($file."*.php");
            var_export($files);
        }else{
            $files = glob($file."*.php");
        }
        foreach($files as $file){
            require_safe($file);
        }
    }else{
        require_safe($file);
    }
}
function require_safe($file){
    if (file_exists($file) && is_readable($file)) {
        require_once $file;
    }else{
        throw new Exception("$file can't load.");
    }
}
function require_error_process(){
    require_once($_SERVER["UTIL_DIR"]."error/Error.php");
}
function go_main_page(){
    header("Location: http://test.hodofactory.com:8090/");
    die();
}
$AUTOLOAD_SUB_DIRECTORY = array(
    ["Server", $_SERVER["SERVER_DIR"]],
    ["Util", $_SERVER["UTIL_DIR"]]
);
spl_autoload_register(function ($class) use ($AUTOLOAD_SUB_DIRECTORY){
    $base_dir = $_SERVER["LIBRARY_DIR"];
    $relative_class = $class;
    foreach($AUTOLOAD_SUB_DIRECTORY as $subDirectory_info){
        $len = strlen($subDirectory_info[0]);
        if(strncmp($subDirectory_info[0], $class, $len) == 0){
            $base_dir = $subDirectory_info[1];
            $relative_class = substr($class, $len + 1);
            break;
        }
    }
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // 파일이 존재하면 불러옴
    if (file_exists($file)) {
        require $file;
    }
});
?>