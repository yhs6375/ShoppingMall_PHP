<?php

namespace Server\File;

class FileUploader
{
    protected $uploadDir;
    protected $allowMime;
    protected $nameFunc;
    protected $limitSize;
    protected $limitTotalSize;
    public function __construct($uploadDir, $allowMime, $nameFunction, $limitSize = 5242880, $limitTotalSize = 0)
    {
        $this->uploadDir = $uploadDir;
        $this->allowMime = $allowMime;
        $this->nameFunc = $nameFunction;
        $this->limitSize = $limitSize;
        $this->limitTotalSize = $limitTotalSize;
        $this->uploadFileNames = array();
    }
    public function start($files)
    {
        if (!is_dir($this->uploadDir)) mkdir($this->uploadDir);
    }
    protected function upload($file)
    {
        while (true) {
            $fileName = call_user_func($this->nameFunc);
            $fullPath = $this->uploadDir . $fileName;
            if (!file_exists($fullPath)) break;
        }
        file_put_contents($fullPath, $file, FILE_APPEND | LOCK_EX);
        array_push($this->uploadFileNames, $fullPath);
        return $fileName;
    }
    public function getUploadDir()
    {
        return $this->uploadDir;
    }
    protected function cancel()
    {
        for ($i = 0; $i <= $this->index; $i++) {
            unlink($this->uploadFileNames[$i]);
        }
    }
}