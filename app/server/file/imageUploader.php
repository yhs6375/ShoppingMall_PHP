<?php

namespace Server\File;

class ImageUploader extends FileUploader
{
    protected $imageRectWidth;
    protected $imageRectHeight;
    public function __construct($uploadDir, $allowMime, $nameFunction, $imageRectWidth, $imageRectHeight, $limitSize = 5242880, $limitTotalSize = 0)
    {
        parent::__construct($uploadDir, $allowMime, $nameFunction, $limitSize, $limitTotalSize);
        $this->imageRectWidth = $imageRectWidth;
        $this->imageRectHeight = $imageRectHeight;
    }
    private function getImageData($fileName)
    {
        return base64_decode(str_replace("data:application/octec-stream;base64,", "", file_get_contents($fileName)));
    }
    public function start($files)
    {
        if (!is_dir($this->uploadDir)) mkdir($this->uploadDir);
        $this->index = 0;
        $fileNameArray = $files["tmp_name"];
        $isMultiple = is_array($fileNameArray);
        $filesLength = $isMultiple ? count($fileNameArray) : 1;
        $filesSize = 0;
        $fileSize = 0;
        $fileDatas = array();
        $returnData = array();
        if ($isMultiple) {
            for ($i = 0; $i < $filesLength; $i++) {
                $fileData = $this->getImageData($fileNameArray[$i]);
                array_push($fileDatas, $fileData);
                $fileSize = strlen($fileData);
                if ($fileSize > $this->limitSize) {
                    throw new FileException("File have exceeded the limited file size.", 1);
                }
                $fInfo = finfo_open(FILEINFO_MIME_TYPE);
                $mime = finfo_buffer($fInfo, $fileData);
                if (!in_array($mime, $this->allowMime)) {
                    throw new FileException("File is not a valid extension.", 3);
                }
                $filesSize += $fileSize;
            }
            if ($this->limitTotalSize != 0 && $this->limitTotalSize > $filesSize) {
                throw new FileException("The files have exceeded the limited total size.", 2);
            }
            while ($this->index < $filesLength) {
                if (!($fileName = $this->upload($fileDatas[$i]))) {
                    $this->cancel();
                    return false;
                }
                array_push($returnData, (object) ["name"->$fileName]);
                $this->index++;
            }
        } else {
            $fileData = $this->getImageData($fileNameArray);
            array_push($fileDatas, $fileData);
            $fileSize = strlen($fileData);
            if ($fileSize > $this->limitSize) {
                throw new FileException("File have exceeded the limited file size.", 1);
            }
            $fInfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_buffer($fInfo, $fileData);
            if (!in_array($mime, $this->allowMime)) {
                throw new FileException("File is not a valid extension.", 3);
            }
            if (!($fileName = $this->upload($fileDatas[0]))) {
                $this->cancel();
                return false;
            }
            array_push($returnData, (object) ["name" => $fileName]);
        }
        return $returnData;
    }
    protected function upload($file)
    {
        $uploadFileName = parent::upload($file);
        if (@($imgSizeInfo = getimagesize($this->uploadDir . $uploadFileName)) !== false) {
            if ($imgSizeInfo[0] <= $this->imageRectWidth && $imgSizeInfo[1] <= $this->imageRectHeight) {
                return $uploadFileName;
            } else {
                $this->cancel();
                throw new FileException("image dimension is larger than specific size.", 4);
            }
        } else {
            $this->cancel();
            throw new FileException("image dimension can't be checked.", 4);
        }
        return false;
    }
}