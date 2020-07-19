(function (global, HSeditor) {
    HSeditor(global);
})(typeof window !== undefined ? window : this, function (window, non) {
    var ieOn = false,
        ie9 = false,
        ffOn = false,
        agt = navigator.userAgent.toLowerCase();
    if (/trident\/5\.0/.test(agt)) ie9 = true;
    if (/trident\/[567]\.0/.test(agt)) ieOn = true;
    if (/firefox/.test(agt)) ffOn = true;
    var document = window.document,
        i = 0,
        tt = 0,
        editor,
        frames = [], //에디터만들때 그 프레임의 window가 저장됨
        styleOn = false,
        xhr,
        curWin,
        testtest = 0,
        testtest2 = 0,
        savedRange = null,
        classExr = /\S+/g,
        downTimeout,
        upTimeout,
        historyDown = false, //history에 down저장여부
        popup = {},
        self,
        colorPicker,
        colorPickerWidth = 423,
        uploadCount,
        imgPaths = [],
        save,
        HSedit = function () {
            return new HSedit.fn.init();
        };
    HSedit.range = {};
    HSedit.fn = HSedit.prototype = {};
    HSedit.fn.init = function () {
        //툴 관련 스크립트 시작
        this.Tool = {
            alignLeft: {
                disable: false,
                img:
                    "<i class='hs-align-left' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "left.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes(win);
                    i = 0;
                    while ((node = nodes[i++])) {
                        node.style.textAlign = "left";
                    }
                    editor.focus();
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            alignCenter: {
                disable: false,
                img:
                    "<i class='hs-align-center' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "center.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes(win);
                    i = 0;
                    while ((node = nodes[i++])) {
                        node.style.textAlign = "center";
                    }
                    editor.focus();
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            alignRight: {
                disable: false,
                img:
                    "<i class='hs-align-right' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "right.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes(win);
                    i = 0;
                    while ((node = nodes[i++])) {
                        node.style.textAlign = "right";
                    }
                    editor.focus();
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            alignJustify: {
                disable: false,
                img:
                    "<i class='hs-align-justify' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "justify.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes(win);
                    i = 0;
                    while ((node = nodes[i++])) {
                        node.style.textAlign = "justify";
                    }
                    editor.focus();
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            fontBold: {
                disable: false,
                img:
                    "<i class='hs-font-bold' style='background-image:url(" + HSset.assetsPath.image + "bold.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "strong");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            underline: {
                disable: false,
                img:
                    "<i class='hs-underline' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "underline.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "u");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            lineThrough: {
                disable: false,
                img:
                    "<i class='hs-line-through' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "strikethrough.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "s");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            inclineFont: {
                disable: false,
                img:
                    "<i class='hs-incline' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "incline.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "em");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            subFont: {
                disable: false,
                img: "<i class='hs-sub' style='background-image:url(" + HSset.assetsPath.image + "sub.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "sub");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            supFont: {
                disable: false,
                img: "<i class='hs-sup' style='background-image:url(" + HSset.assetsPath.image + "sup.svg)'></i>",
                active: function () {
                    var nodes,
                        win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    nodes = HSedit.getCurNodes2(win, "sup");
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            undo: {
                disable: false,
                img:
                    "<i id='hs-tool-undo' class='hs-undo' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "undo.svg)'></i>",
                active: function () {
                    var win = HSedit.getCurWin.apply(this.parentNode),
                        rem = win.remember;
                    (editor = win.document.body), (range = HSedit.getRange(win));
                    if (!range) {
                        win.document.body.focus();
                        range = HSedit.getRange(win);
                    }
                    HSrange.initialize(win);
                    if (rem.cur === rem.stack && !rem.undo) {
                        HSedit.pushRemember(win, rem, editor.innerHTML, true);
                        rem.undo = true;
                    }
                    if (rem.cur <= 1) return;
                    rem.cur--;
                    //html 복구
                    editor.innerHTML = rem.data[rem.cur - 1].html;
                    //range복구
                    HSrange.getRangeToOffset(win, rem.data[rem.cur - 1].range);
                    HSrange.setSel(range, true);
                    //포커싱
                    editor.focus();
                    if (rem.cur <= 1) {
                        HSedit.addClass(this.childNodes[0], "off");
                    } else {
                        HSedit.removeClass(this.childNodes[0], "off");
                    }
                    HSedit.removeClass(this.parentNode.childNodes[1].childNodes[0], "off");
                },
            },
            redo: {
                disable: false,
                img:
                    "<i id='hs-tool-redo' class='hs-redo' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "redo.svg)'></i>",
                active: function () {
                    var win = HSedit.getCurWin.apply(this.parentNode),
                        rem = win.remember;
                    (editor = win.document.body), (range = HSedit.getRange(win));
                    if (!range) {
                        win.document.body.focus();
                        range = HSedit.getRange(win);
                    }
                    HSrange.initialize(win);
                    if (rem.cur === rem.stack) return;
                    rem.cur++;
                    //html 복구
                    editor.innerHTML = rem.data[rem.cur - 1].html;
                    //range복구
                    HSrange.getRangeToOffset(win, rem.data[rem.cur - 1].range);
                    HSrange.setSel(range, true);
                    //포커싱
                    editor.focus();
                    if (rem.cur === rem.stack) {
                        HSedit.addClass(this.childNodes[0], "off");
                    }
                    HSedit.removeClass(this.parentNode.childNodes[0].childNodes[0], "off");
                },
            },
            imageIn: {
                disable: false,
                img:
                    "<i class='hs-image-insert' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "paint_c.svg)'></i>",
                active: function () {
                    var config = HSset.image,
                        popBody,
                        imgTable,
                        imgBox,
                        scrollWrap,
                        fileId,
                        images = [],
                        hsImgList = [],
                        imgReg1 = /image\/(jpeg|png)/,
                        accordOn = true,
                        selectImg = {},
                        widthTextBox,
                        heightTextBox,
                        optionCover,
                        imageInsert,
                        dragEnter,
                        dragOver,
                        dragDrop,
                        popHeader,
                        popWrap,
                        dragBox,
                        imgMod,
                        upload,
                        modify,
                        accordBox,
                        imgTableBody,
                        scrollEl,
                        fileClick,
                        curSize = 0,
                        accessUpload = 0,
                        progressName,
                        progressBar,
                        progressing,
                        progressStatus,
                        progressWarning,
                        progress,
                        self = this,
                        uploadHTML =
                            "<div id='hs-upload'><div id='hs-image-table' class='hs-image-table'><div id='hs-image-table-body' class='hs-image-table-body'><div id=hs-drag-box></div><div id='hs-drag-mark'></div></div></div>" +
                            "<div class='hs-image-option-table'><div class='hs-option-cover'></div><div class='hs-image-size'><div class='hs-size'><label class='hs-size-text'>가로</label><input type='text' class='hs-image-width hs-input'/><label class='hs-size-text'>px</label></div>" +
                            "<div class='hs-size'><label class='hs-size-text'>세로</label><input type='text' class='hs-image-height hs-input'/><label class='hs-size-text'>px</label></div>" +
                            "<div class='hs-size-accord'><hs-check class='hs-image-check hs-on'></hs-check><label class='hs-size-accord-text'>원본 비율 유지</label></div></div><div class='hs-bottom-box'><div class='hs-submit-wrap'><div class='hs-button hs-submit'>확인</div><div class='hs-cancel hs-button'>취소</div></div></div></div>" +
                            "<div id='hs-img-modify'><div id='hs-img-adjust'></div><div id='hs-img-adjust-option'></div></div>",
                        modifyHTML =
                            "<div id='hs-image-header' class='hs-select-header'><span class='hs-header-select hs-upload hs-select-on'>사진 업로드</span>" +
                            "<span id='hs-img-mod' class='hs-header-select hs-img-mod'>이미지 편집</span>";
                    //파일업로드 부분 시작
                    if (ie9) {
                        //ie9 지원
                        modifyHTML +=
                            "<embed id='HS-fl-img' src='image.swf' quality='high' bgcolor='#ffffff' width='90' height='30' name='hosung' align='middle' allowScriptAccess='sameDomain' allowFullScreen='false' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'/></div>";
                        var img_len,
                            allSize = 0,
                            upSize,
                            cur = 0;
                        window.HS_imageInsert = function (file, data, first, total, img_length) {
                            var fl = document.getElementById("HS-fl-img"),
                                file = JSON.parse(file),
                                size,
                                isGIF = false,
                                nData,
                                newWidth,
                                newHeight;
                            if (first) {
                                img_len = img_length;
                                progress = new Progress("이미지 업로드 중...");
                                popWrap.style.zIndex = 9996;
                                allSize = total;
                                upSize = 0;
                                progress.progressStatus.innerHTML =
                                    "0/" + img_len + "(0mb/" + HSedit.changeSize(allSize) + "mb)";
                            }
                            progress.progressName.innerHTML = file.name;
                            if (images.length === config.count) {
                                accessUpload = 1;
                                fl.transferStop();
                                stopProgress();
                                allSize = 0;
                            }
                            file.type = file.type.toLowerCase();
                            if (/(\.gif)|(\.jpg)|(\.png)/i.test(file.type)) {
                                if (file.type === ".jpg" || file.type === ".png") {
                                    size = new Image();
                                    if (file.type === ".jpg") {
                                        size.src = "data:image/jpeg;base64," + data;
                                        var type = "image/jpeg";
                                    }
                                    if (file.type === ".png") {
                                        size.src = "data:image/png;base64," + data;
                                        var type = "image/png";
                                    }
                                } else if (file.type === ".gif") {
                                    data = atob(data);
                                    header = subHexStr(data, 0, 6);
                                    if (header === "474946383761" || header === "474946383961") {
                                        isGIF = true;
                                    }
                                } else {
                                    accessUpload = 3;
                                }
                                if (curSize > config.maxSize === false) {
                                    curSize += parseInt(file.size);
                                } else if (accessUpload === 0 && curSize > config.maxSize) {
                                    //총 업로드된 이미지 사이즈가 maxSize일시 access 불가설정
                                    accessUpload = 2;
                                }
                                if (accessUpload === 0) {
                                    // 정상 접근
                                    upSize += file.size;
                                    if (isGIF) {
                                        //gif
                                        var gif = new GIF(data);
                                        nData = gif.data;
                                        newWidth = gif.width;
                                        newHeight = gif.height;
                                        gif = null;
                                    } else {
                                        //jpg,png
                                        var canvas, ctx;
                                        if (size.width > config.maxImageWidth) {
                                            //img 가로 최대사이즈 조정
                                            newWidth = config.maxImageWidth;
                                            newHeight = newWidth * (size.height / size.width);
                                        } else {
                                            newWidth = size.width;
                                            newHeight = size.height;
                                        }

                                        if (size.height > config.maxImageHeight) {
                                            //img 세로 최대사이즈 조정
                                            newHeight = config.maxImageHeight;
                                            newWidth = newHeight * (newWidth / newHeight);
                                        }
                                        canvas = document.createElement("canvas");
                                        canvas.width = newWidth;
                                        canvas.height = newHeight;
                                        ctx = canvas.getContext("2d");
                                        ctx.drawImage(size, 0, 0, size.width, size.height, 0, 0, newWidth, newHeight);
                                        nData = canvas.toDataURL(type).replace(type, "application/octec-stream");
                                    }
                                    hsImgList[images.length].innerHTML =
                                        "<img class='HSedit-image-table-image' src='" +
                                        nData +
                                        "'/><div class='HSedit-image-delete'></div>";
                                    images.push({
                                        data: nData,
                                        name: file.name,
                                        width: newWidth,
                                        height: newHeight,
                                        per: newWidth / newHeight,
                                    });
                                    progress.progressStatus.innerHTML =
                                        ++cur +
                                        "/" +
                                        img_len +
                                        "(" +
                                        HSedit.changeSize(upSize) +
                                        "MB/" +
                                        HSedit.changeSize(allSize) +
                                        "MB)";
                                    progress.progressing.style.width =
                                        progress.progressBar.clientWidth * (upSize / allSize) + "px";
                                    if (cur === img_len) {
                                        allSize = 0;
                                        popWrap.style.zIndex = 9999;
                                        HSAnim.animate(
                                            progress.uploadPop,
                                            { opacity: 0 },
                                            600,
                                            function () {
                                                document.body.removeChild(progress.uploadPop);
                                                progress = undefined;
                                                cur = 0;
                                                img_len = 0;
                                            },
                                            1
                                        );
                                    }
                                } else {
                                    fl.transferStop();
                                    stopProgress();
                                    allSize = 0;
                                }
                            } else {
                                fl.transferStop();
                                stopProgress();
                                allSize = 0;
                            }
                        };
                    } else {
                        //ie9가 아닐 경우
                        modifyHTML +=
                            "<HSfile><input id='HSedit-file-upload' name='filefile' type='file' multiple accept='.gif,.jpeg,.jpg,.png,.svg'/></HSfile></div>";
                        imageInsert = function (e) {
                            var imgReader = new FileReader(),
                                mimeReader = new FileReader(),
                                isGIF = false;
                            if (e.type === "change")
                                // Common Upload
                                files = fileId.files;
                            else if (e.type === "drop")
                                //드래그앤드랍
                                files = e.dataTransfer.files;

                            tt = 0;
                            if (files.length > 0) {
                                progress = new Progress("이미지 업로드 중...");
                                var allSize = 0,
                                    upSize = 0;
                                popWrap.style.zIndex = 9996;
                                for (i = 0; i < files.length; i++) {
                                    allSize += files[i].size;
                                }
                                progress.progressStatus.innerHTML =
                                    "0/" + files.length + "(0mb/" + HSedit.changeSize(allSize) + "mb)";
                                //이미지 개수가 max일시 access 불가설정
                                //이미지 client단에서 업로드
                                imgReader.onload = function (e) {
                                    var image, newWidth, newHeight, size, canvas, ctx, nData;
                                    var uploadStart;
                                    image = { file: files[tt - 1] };
                                    progress.progressName.innerHTML = image.file.name;
                                    if (curSize > config.maxSize === false) {
                                        curSize += image.file.size;
                                    } else if (accessUpload === 0 && curSize > config.maxSize) {
                                        //총 업로드된 이미지 사이즈가 maxSize일시 access 불가설정
                                        accessUpload = 2;
                                    }
                                    if (images.length + 1 === config.count) {
                                        accessUpload = 1;
                                    }
                                    if (accessUpload === 0) {
                                        uploadStart = function () {
                                            hsImgList[images.length].innerHTML =
                                                "<img class='HSedit-image-table-image' src='" +
                                                nData +
                                                "'/><div class='HSedit-image-delete'></div>";
                                            images.push({
                                                originalImage: new File([e.target.result], image.file.name, {
                                                    type: image.file.type,
                                                }),
                                                image: new File([nData], image.file.name, {
                                                    type: image.file.type,
                                                }),
                                                orgWidth: newWidth,
                                                orgHeight: newHeight,
                                                width: newWidth,
                                                height: newHeight,
                                                per: newWidth / newHeight,
                                            });
                                            progress.progressStatus.innerHTML =
                                                tt +
                                                "/" +
                                                files.length +
                                                "(" +
                                                HSedit.changeSize(upSize) +
                                                "MB/" +
                                                HSedit.changeSize(allSize) +
                                                "MB)";
                                            progress.progressing.style.width =
                                                progress.progressBar.clientWidth * (upSize / allSize) + "px";
                                            if (tt < files.length) {
                                                mimeReader.readAsArrayBuffer(files[tt]);
                                            }
                                            tt++;
                                            //업로드가 끝난후 업로드 progress popup 종료
                                            if (tt - 1 === files.length) {
                                                popWrap.style.zIndex = 9999;
                                                fileId.value = ""; //file 초기화
                                                HSAnim.animate(
                                                    progress.uploadPop,
                                                    { opacity: 0 },
                                                    600,
                                                    function () {
                                                        document.body.removeChild(progress.uploadPop);
                                                        progress = undefined;
                                                    },
                                                    1
                                                );
                                            }
                                        };
                                        upSize += image.file.size;
                                        if (imgReg1.test(image.file.type)) {
                                            //jpeg, png
                                            console.log("jpeg 또는 png");
                                            //이미지 사이즈 조정
                                            h_image = new Image();
                                            //이미지 로딩시간이 존재하므로 src에 파일 삽입 후 로딩 완료까지 시간이 필요함
                                            h_image.onload = function () {
                                                if (this.width > config.maxImageWidth) {
                                                    //img 가로 최대사이즈 조정
                                                    newWidth = config.maxImageWidth;
                                                    newHeight = newWidth * (this.height / this.width);
                                                } else {
                                                    newWidth = this.width;
                                                    newHeight = this.height;
                                                }
                                                if (this.height > config.maxImageHeight) {
                                                    //img 세로 최대사이즈 조정
                                                    newHeight = config.maxImageHeight;
                                                    newWidth = newHeight * (newWidth / newHeight);
                                                }
                                                //canvas를 통해 이미지 resize
                                                canvas = document.createElement("canvas");
                                                canvas.width = newWidth;
                                                canvas.height = newHeight;
                                                ctx = canvas.getContext("2d");
                                                ctx.drawImage(
                                                    this,
                                                    0,
                                                    0,
                                                    h_image.width,
                                                    h_image.height,
                                                    0,
                                                    0,
                                                    newWidth,
                                                    newHeight
                                                );
                                                if (image.file.type !== "image/gif") {
                                                    nData = canvas
                                                        .toDataURL(image.file.type)
                                                        .replace(image.file.type, "application/octec-stream");
                                                } else {
                                                    nData = canvas.toDataURL();
                                                }
                                                uploadStart();
                                            };
                                            h_image.src = this.result;
                                        } else if (image.file.type === "image/gif") {
                                            var gif = new GIF(e.target.result);
                                            nData = gif.data;
                                            newWidth = gif.width;
                                            newHeight = gif.height;
                                            gif = null;
                                            uploadStart();
                                        }
                                    } else {
                                        stopProgress();
                                    }
                                };
                                //mime 검사
                                mimeReader.onload = function (e) {
                                    var mime,
                                        header = "",
                                        gifCheck = "",
                                        i;
                                    //이미지의 mime type 검사
                                    mime = new Uint8Array(e.target.result).subarray(0, 6);
                                    for (i = 0; i < mime.length; i++) {
                                        gifCheck += mime[i] < 16 ? "0" + mime[i].toString(16) : mime[i].toString(16);
                                    }
                                    header = gifCheck.substr(0, 8);
                                    if (
                                        header !== "89504e47" &&
                                        header !== "47494638" &&
                                        header !== "ffd8ffe0" &&
                                        header !== "ffd8ffe1" &&
                                        header !== "ffd8ffe2" &&
                                        header !== "ffd8ffe3"
                                    ) {
                                        accessUpload = 3;
                                    }
                                    if (header === "47494638") {
                                        if (gifCheck === "474946383761" || gifCheck === "474946383961") {
                                            isGIF = true;
                                        }
                                    }
                                    imgReader.readAsDataURL(files[tt - 1]);
                                };
                                tt = 1;
                                //첫번째 이미지 클라이언트 업로드 시작
                                accessUpload === 0 ? mimeReader.readAsArrayBuffer(files[0]) : stopProgress();
                            }
                        };
                    }
                    function stopProgress() {
                        if (accessUpload === 1) {
                            progress.progressWarning.innerHTML =
                                "이미지는 최대 " + config.count + "개 까지 업로드 가능합니다.";
                        } else if (accessUpload === 2) {
                            progress.progressWarning.innerHTML =
                                "이미지는 최대 " + HSedit.changeSize(config.maxSize) + "MB까지 업로드 가능합니다.";
                        } else if (accessUpload === 3) {
                            progress.progressWarning.innerHTML = "이미지의 확장자가 불확실합니다. 파일을 확인해주세요.";
                        }
                        accessUpload = 0;
                        progress.stop();
                        progress = undefined;
                    }
                    dragEnter = function (e) {};
                    dragOver = function (e) {
                        e.preventDefault();
                    };
                    dragDrop = function (e) {
                        //파일드래그 업로드
                        e.preventDefault();
                        if (ie9) {
                            if (file === false) {
                                alert("드래그는 지원하지 않습니다.");
                                return false;
                            }
                        }
                        imageInsert(e);
                    };
                    //파일 업로드 부분 끝
                    popup.setPopup(609, 528, "이미지 첨부하기", 88);
                    popup.getPopup();
                    popHeader = popup.getPopupHeader();
                    popBody = popup.getPopupBody();
                    popHeader.childNodes[1].innerHTML = modifyHTML;
                    popBody.innerHTML = uploadHTML;
                    popWrap = popup.pop;
                    var preview = new Preview("이미지 미리보기", popWrap);
                    imgTable = document.getElementById("hs-image-table");
                    imgTableBody = document.getElementById("hs-image-table-body");
                    widthTextBox = HS.find(popBody, ".hs-image-width")[0];
                    heightTextBox = HS.find(popBody, ".hs-image-height")[0];
                    optionCover = HS.find(popBody, ".hs-option-cover")[0];
                    imgMod = document.getElementById("hs-img-mod");
                    upload = document.getElementById("hs-upload");
                    modify = document.getElementById("hs-img-modify");
                    dragBox = document.getElementById("hs-drag-box");
                    dragMark = document.getElementById("hs-drag-mark");
                    bSubmit = HS.find(popBody, ".hs-submit")[0];
                    bCancel = HS.find(popBody, ".hs-cancel")[0];
                    for (tt = 0; tt < config.count; tt++) {
                        //이미지 리스트 생성&설정
                        imgBox = document.createElement("hs-img");
                        imgBox.count = tt;
                        imgTableBody.appendChild(imgBox);
                        hsImgList.push(imgBox);
                        imgBox.addEventListener("mousedown", downCode);
                        imgBox.addEventListener("dragstart", function (e) {
                            e.preventDefault();
                            return false;
                        });
                    }
                    popWrap.addEventListener("dragover", dragOver);
                    popWrap.addEventListener("drop", dragDrop);
                    popup.test = imgTable;
                    //Width 조절
                    widthTextBox.addEventListener("focusout", function () {
                        if (selectImg.count >= 0) {
                            var per, reader, blob, newWidth, newHeight;
                            if (accordOn) {
                                newWidth = this.value;
                                per = newHeight = newWidth / images[selectImg.count].per;
                                heightTextBox.value = Math.round(per);
                            } else {
                                newWidth = this.value;
                                newHeight = heightTextBox.value;
                            }
                            if (newWidth > config.maxImageWidth) {
                                //img 가로 최대사이즈 조정
                                newWidth = config.maxImageWidth;
                                if (accordOn) {
                                    newHeight =
                                        newWidth * (images[selectImg.count].height / images[selectImg.count].width);
                                    heightTextBox.value = Math.round(newHeight);
                                }
                                this.value = Math.round(newWidth);
                            }
                            if (newHeight > config.maxImageHeight) {
                                //img 세로 최대사이즈 조정
                                newHeight = config.maxImageHeight;
                                if (accordOn) {
                                    newWidth =
                                        newHeight * (images[selectImg.count].width / images[selectImg.count].height);
                                    this.value = Math.round(newWidth);
                                }
                                heightTextBox.value = Math.round(newHeight);
                            }

                            images[selectImg.count].width = newWidth;
                            images[selectImg.count].height = newHeight;

                            reader = new FileReader();
                            reader.onloadend = function (e) {
                                if (e.target.readyState == FileReader.DONE) {
                                    var type = images[selectImg.count].image.type;
                                    if (type === "image/gif") {
                                        var gif = new GIF(
                                            e.target.result,
                                            images[selectImg.count].width,
                                            images[selectImg.count].height
                                        );
                                        images[selectImg.count].image = new File(
                                            [gif.data],
                                            images[selectImg.count].image.name
                                        );
                                    } else {
                                        //이미지 사이즈 조정
                                        var h_image = new Image();
                                        //이미지 로딩시간이 존재하므로 src에 파일 삽입 후 로딩 완료까지 시간이 필요함
                                        h_image.onload = function () {
                                            var canvas, ctx, newData;
                                            //canvas를 통해 이미지 resize
                                            canvas = document.createElement("canvas");
                                            canvas.width = newWidth;
                                            canvas.height = newHeight;
                                            ctx = canvas.getContext("2d");
                                            ctx.drawImage(
                                                this,
                                                0,
                                                0,
                                                this.width,
                                                this.height,
                                                0,
                                                0,
                                                newWidth,
                                                newHeight
                                            );
                                            newData = canvas.toDataURL(type).replace(type, "application/octec-stream");
                                            images[selectImg.count].image = new File(
                                                [newData],
                                                images[selectImg.count].originalImage.name,
                                                { type: type }
                                            );
                                        };
                                        h_image.src = this.result; //this.result == e.target.result
                                    }
                                }
                            };
                            blob = images[selectImg.count].originalImage.slice(
                                0,
                                images[selectImg.count].originalImage.size
                            );
                            reader.readAsBinaryString(blob);
                        }
                    });
                    //Height 조절
                    heightTextBox.addEventListener("focusout", function () {
                        if (selectImg.count >= 0) {
                            var per, reader, blob, newWidth, newHeight;
                            if (accordOn) {
                                newHeight = this.value;
                                per = newWidth = newHeight * images[selectImg.count].per;
                                widthTextBox.value = Math.round(per);
                            } else {
                                newHeight = this.value;
                                newWidth = widthTextBox.value;
                            }
                            if (newHeight > config.maxImageHeight) {
                                //img 세로 최대사이즈 조정
                                newHeight = config.maxImageHeight;
                                if (accordOn) {
                                    newWidth =
                                        newHeight * (images[selectImg.count].width / images[selectImg.count].height);
                                    widthTextBox.value = Math.round(newWidth);
                                }
                                this.value = Math.round(newHeight);
                            }
                            if (newWidth > config.maxImageWidth) {
                                //img 가로 최대사이즈 조정
                                newWidth = config.maxImageWidth;
                                if (accordOn) {
                                    newHeight =
                                        newWidth * (images[selectImg.count].height / images[selectImg.count].width);
                                    this.value = Math.round(newHeight);
                                }
                                widthTextBox.value = Math.round(newWidth);
                            }

                            images[selectImg.count].width = newWidth;
                            images[selectImg.count].height = newHeight;

                            reader = new FileReader();
                            reader.onloadend = function (e) {
                                if (e.target.readyState == FileReader.DONE) {
                                    var type = images[selectImg.count].image.type;
                                    if (type === "image/gif") {
                                        var gif = new GIF(
                                            e.target.result,
                                            images[selectImg.count].width,
                                            images[selectImg.count].height
                                        );
                                        images[selectImg.count].image = new File(
                                            [gif.data],
                                            images[selectImg.count].image.name
                                        );
                                    } else {
                                        //이미지 사이즈 조정
                                        var h_image = new Image();
                                        //이미지 로딩시간이 존재하므로 src에 파일 삽입 후 로딩 완료까지 시간이 필요함
                                        h_image.onload = function () {
                                            var canvas, ctx, newData;
                                            //canvas를 통해 이미지 resize
                                            canvas = document.createElement("canvas");
                                            canvas.width = newWidth;
                                            canvas.height = newHeight;
                                            ctx = canvas.getContext("2d");
                                            ctx.drawImage(
                                                this,
                                                0,
                                                0,
                                                this.width,
                                                this.height,
                                                0,
                                                0,
                                                newWidth,
                                                newHeight
                                            );
                                            newData = canvas.toDataURL(type).replace(type, "application/octec-stream");
                                            images[selectImg.count].image = new File(
                                                [newData],
                                                images[selectImg.count].originalImage.name,
                                                { type: type }
                                            );
                                        };
                                        h_image.src = this.result; //this.result == e.target.result
                                    }
                                }
                            };
                            blob = images[selectImg.count].originalImage.slice(
                                0,
                                images[selectImg.count].originalImage.size
                            );
                            reader.readAsBinaryString(blob);
                        }
                    });
                    accordBox = HS.find(popBody, "hs-check")[0];
                    accordBox.addEventListener("click", function () {
                        if (HSedit.hasClass(this, "hs-on")) {
                            HSedit.removeClass(this, "hs-on");
                            accordOn = false;
                        } else {
                            HSedit.addClass(this, "hs-on");
                            accordOn = true;
                            if (selectImg.count >= 0) {
                                var per;
                                per = images[selectImg.count].height =
                                    images[selectImg.count].width / images[selectImg.count].per;
                                heightTextBox.value = Math.round(per);
                            }
                        }
                    });
                    imgMod.addEventListener("click", function () {
                        upload.style.display = "none";
                        modify.style.display = "block";
                    });
                    //파일업로드 딜레이가있을 경우 대비
                    if (!ie9) {
                        fileId = document.getElementById("HSedit-file-upload");
                        fileId2 = document.getElementsByTagName("hsfile")[0];
                        //파일 업로드시도시 이벤트 발생
                        fileId.addEventListener("change", imageInsert);
                        //파일 업로드 버튼 클릭이벤트
                        fileId2.addEventListener("click", function (e) {
                            if (!fileClick) {
                                fileClick = true;
                                fileId.focus();
                                fileId.click();
                                setTimeout(function () {
                                    fileClick = false;
                                }, 1500);
                            } else {
                                e.preventDefault();
                            }
                        });
                        fileId.addEventListener("click", function (e) {
                            e.stopPropagation();
                        });
                        fileId2.addEventListener("mousedown", function (e) {
                            e.stopPropagation();
                        });
                    }
                    //////////////////////////////////////////////////////
                    scrollEl = HSScroll.make({
                        width: 11,
                        railDisplay: false,
                        scrollTarget: imgTableBody,
                        scrollAppendNode: imgTable,
                        //railOpacity:0.5,
                        scrollOpacity: 0.8,
                        over: {
                            scrollOpacity: 1.0,
                            railOpacity: 0.9,
                            overWidth: 14,
                        },
                        fade: true,
                        tickButton: {
                            display: false,
                        },
                    });
                    modify.style.display = "none";
                    popup.show();
                    preview.show();
                    popup.cur = 0;
                    bSubmit.addEventListener("click", function () {
                        var imageCount = images.length;
                        save = self;
                        uploadCount = 0;
                        imageUpload(imageCount, images);
                    });
                    bCancel.addEventListener("click", function () {
                        //취소버튼 누를시에 발생하는 이벤트
                        popup.closePopup();
                    });
                    function sizeModifyOff() {
                        widthTextBox.disabled = true;
                        heightTextBox.disabled = true;
                        widthTextBox.value = "";
                        heightTextBox.value = "";
                    }
                    function sizeModifyOn() {
                        widthTextBox.disabled = false;
                        heightTextBox.disabled = false;
                    }
                    var scrX,
                        scrY,
                        n,
                        arrI = [],
                        arrImg = [],
                        arrImgBox = [],
                        clickCheck,
                        shiftCheck,
                        lastI,
                        n,
                        x,
                        y,
                        y2,
                        inX,
                        inY,
                        aa,
                        bb,
                        dragCheck = 0,
                        dragEl,
                        q,
                        a,
                        b,
                        pointEl,
                        dragEl;
                    function downCode(e) {
                        if (this.children[0]) {
                            scrX = e.screenX;
                            scrY = e.screenY;
                            n = this.count;
                            selectImg = { count: n, width: images[n].width, height: images[n].height };
                            optionCover.style.visibility = "visible";
                            widthTextBox.value = Math.round(selectImg.width);
                            heightTextBox.value = Math.round(selectImg.height);
                            optionCover.style.visibility = "hidden";
                            x = HS.find(popBody, ".hs-img-select");
                            if (e.ctrlKey && !HSedit.hasClass(this, "hs-img-select")) {
                                shiftCheck = 0;
                                arrI[arrI.length] = n;
                                arrImg[arrImg.length] = selectImg;
                                arrImgBox[arrImgBox.length] = this;
                                HSedit.addClass(this, "hs-img-select");
                                clickCheck = 1;
                                lastI = null;
                            } else if (e.shiftKey) {
                                if (x.length > 0) {
                                    //처음부터 선택
                                    if (shiftCheck === 0) q = arrI[arrI.length - 1];
                                    for (i = 0; i < x.length; i++) {
                                        HSedit.removeClass(x[i], "hs-img-select");
                                    }
                                    arrI = [];
                                    arrImg = [];
                                    arrImgBox = [];
                                    if (lastI)
                                        //쉬프트 특징
                                        q = lastI;
                                    if (q < n) {
                                        for (i = q; i < n + 1; i++) {
                                            selectImg = { count: i, width: images[i].width, height: images[i].height };
                                            arrImg[arrImg.length] = selectImg;
                                            arrI[arrI.length] = i;
                                            arrImgBox[arrImgBox.length] = hsImgList[i];
                                            HSedit.addClass(hsImgList[i], "hs-img-select");
                                        }
                                    } else if (q > n) {
                                        for (i = q; i > n - 1; i--) {
                                            selectImg = { count: i, width: images[i].width, height: images[i].height };
                                            arrImg[arrImg.length] = selectImg;
                                            arrI[arrI.length] = i;
                                            arrImgBox[arrImgBox.length] = hsImgList[i];
                                            HSedit.addClass(hsImgList[i], "hs-img-select");
                                        }
                                    }
                                    if (shiftCheck === 0) {
                                        shiftCheck = 1;
                                        lastI = null;
                                    }
                                } else {
                                    //아무것도 클릭 안된 상태에서 shift누르고 이미지 클릭시.
                                    arrImg = [];
                                    for (i = 0; i < n + 1; i++) {
                                        selectImg = { count: i, width: images[i].width, height: images[i].height };
                                        arrImg[arrImg.length] = selectImg;
                                        arrI[arrI.length] = i;
                                        arrImgBox[arrImgBox.length] = hsImgList[i];
                                        HSedit.addClass(hsImgList[i], "hs-img-select");
                                    }
                                }
                            } else if (!HSedit.hasClass(this, "hs-img-select")) {
                                shiftCheck = 0;
                                arrI = [];
                                arrImg = [];
                                arrImgBox = [];
                                for (i = 0; i < x.length; i++) {
                                    HSedit.removeClass(x[i], "hs-img-select");
                                }
                                HSedit.addClass(this, "hs-img-select");
                                arrI[arrI.length] = n;
                                arrImg[0] = selectImg;
                                arrImgBox[0] = this;
                                clickCheck = 1;
                            }
                            dragEl = this;
                            document.addEventListener("mousemove", dragCode);
                            document.addEventListener("mouseup", upCode);
                        }
                    }
                    function dragCode(e) {
                        (a = e.screenX), (b = e.screenY);
                        if (a > scrX + 4 || a < scrX - 4 || b < scrY - 4 || b > scrY + 4) {
                            (x = e.pageX), (y = e.pageY);

                            clickCheck = 0;
                            for (i = 0; i < arrImgBox.length; i++) {
                                arrImgBox[i].style.opacity = "0.3";
                            }
                            dragEl.opacity = "0.1";
                            inX = popWrap.offsetLeft + 3; //popWrap안에서 image-table까지의 거리
                            inY = popWrap.offsetTop + 61;
                            y2 = y - window.scrollY;
                            aa = inX + imgTableBody.offsetWidth;
                            bb = inY + imgTableBody.offsetHeight;
                            if (x > inX && y > inY && x < aa && y < bb) {
                                if (x < inX) {
                                    x = inX;
                                } else if (x >= inX + 390) {
                                    x = inX + 390;
                                } else if ((x - inX) % 129 >= 0 && (x - inX) % 129 < 2) {
                                    x += 3;
                                } else if ((x - inX) % 129 >= 127 && (x - inX) % 129 < 129) {
                                    x -= 3;
                                } else if ((y2 - inY) % 131 >= 125 && (y2 - inY) % 131 < 129) {
                                    y2 -= 5;
                                } else if ((y2 - inY) % 131 >= 129 && (y2 - inY) % 131 < 131) {
                                    y2 += 5;
                                }
                            }
                            dragBox.style.visibility = "hidden";
                            pointEl = document.elementFromPoint(x, y2);
                            dragBox.style.visibility = "visible";
                            dragMark.style.visibility = "visible";
                            if (pointEl) {
                                if (pointEl.tagName === "IMG") {
                                    pointEl = pointEl.parentNode;
                                }
                                if (pointEl.children[0]) {
                                    m = pointEl.count;
                                }
                                dragBox.style.left = x - inX + "px";
                                dragBox.style.top = y - inY + "px";
                                dragBox.style.display = "block";
                                if (x <= inX || y <= inY || x >= aa || y >= bb) {
                                    dragBox.style.display = "none";
                                    dragMark.style.display = "none";
                                } else if (pointEl && pointEl.tagName === "HS-IMG") {
                                    dragX = x < inX + pointEl.offsetLeft + 61.5; //pointEl의 중간을 넘었나 안넘었나 체크
                                    if (pointEl.children[0]) {
                                        dragMark.style.display = "block";
                                        if (dragX) {
                                            //pointEl의 왼쪽에 마우스커서가 있을경우
                                            dragMark.style.left = pointEl.offsetLeft - 3 + "px";
                                            dragMark.style.top = pointEl.offsetTop + "px";
                                        } else {
                                            //pointEl의 오른쪽에 마우스커서가 있을경우
                                            dragMark.style.left = pointEl.offsetLeft + 126 + "px";
                                            dragMark.style.top = pointEl.offsetTop + "px";
                                        }
                                    }
                                }
                            }
                            dragCheck = 1;
                        }
                    }
                    function upCode(e) {
                        (x = e.pageX), (y = e.pageY);
                        for (i = 0; i < arrImgBox.length; i++) {
                            arrImgBox[i].style.opacity = "1.0";
                        }
                        if (dragCheck === 1) {
                            if (
                                y < inY + imgTableBody.clientHeight &&
                                y > inY &&
                                x > inX - 1 &&
                                x < inX - 1 + imgTableBody.clientWidth
                            ) {
                                if (pointEl && pointEl.children[0]) {
                                    if (dragEl !== pointEl) {
                                        n = arrI.length;
                                        if (dragX) {
                                            for (i = 0; i < n; i++) {
                                                HSedit.before(pointEl, arrImgBox[i]);
                                                HSedit.removeClass(arrImgBox[i], "hs-img-select");
                                            }
                                        } else {
                                            for (i = n - 1; i >= 0; i--) {
                                                HSedit.after(pointEl, arrImgBox[i]);
                                                HSedit.removeClass(arrImgBox[i], "hs-img-select");
                                            }
                                        }
                                        hsImgList = document.getElementsByTagName("hs-img");
                                        for (i = 0; i < hsImgList.length; i++) {
                                            hsImgList[i].count = i;
                                        }
                                    } else {
                                        HSedit.removeClass(dragEl, "hs-img-select");
                                    }
                                    arrI = [];
                                    arrImg = [];
                                    arrImgBox = [];
                                }
                            }
                            dragCheck = 0;
                            sizeModifyOff();
                        } else {
                            if (e.ctrlKey && HSedit.hasClass(dragEl, "hs-img-select")) {
                                //ctrl키 눌렀을때
                                if (clickCheck !== 1) {
                                    shiftCheck = 0;
                                    for (i = 0; ; i++) {
                                        if (arrI[i] === n) {
                                            arrI.splice(i, 1);
                                            lastI = n; //n=this.count;
                                            arrImg.splice(i, 1);
                                            arrImgBox.splice(i, 1);
                                            break;
                                        }
                                    }
                                    HSedit.removeClass(dragEl, "hs-img-select");
                                }
                            }
                            console.log(arrI);
                            if (arrI.length === 1) {
                                sizeModifyOn();
                            } else {
                                sizeModifyOff();
                            }
                        }
                        clickCheck = 0;
                        dragMark.style.display = "none";
                        dragBox.style.display = "none";
                        document.removeEventListener("mousemove", dragCode);
                        document.removeEventListener("mouseup", upCode);
                        pointEl = null;
                    }
                },
            },
            youtube: {
                disable: false,
                img:
                    "<i class='hs-youtube' style='background-image:url(" + HSset.assetsPath.image + "Video2.svg)'></i>",
                active: function () {
                    var popHeader,
                        popBody,
                        urlBox,
                        config = HSset.video,
                        width,
                        height,
                        widthBox,
                        heightBox,
                        popHeader,
                        popBottom,
                        previewOn,
                        previewBody,
                        submit,
                        cancle,
                        self = this,
                        uploadHTML =
                            "<div id='hs-video-url' class='hs-pop-body'><div id='hs-video-url'><label class='hs-strong-text'>주소(url)</label><input type='text' id='hs-url-input' class='hs-input'/>" +
                            "<label class='hs-small-text'>Youtube주소는 자동변환 됩니다.</label></div>" +
                            "<div class='hs-line'></div><div id='hs-video-size'><label class='hs-normal-text hs-left'>가로</label><input type='text' id='hs-video-width' class='hs-input'/>" +
                            "<label class='hs-normal-text hs-left'>세로</label><input type='text' id='hs-video-height' class='hs-input'/></div>" +
                            "<div class='hs-line'></div><div id='hs-video-css'><label class='hs-normal-text'>스타일시트(css)</label><input type='text' id='hs-video-css-text' class='hs-input'/></div>" +
                            "</div>";
                    popHeaderHTML =
                        "<div id='hs-video-header' class='hs-select-header'><span class='hs-header-select hs-upload hs-select-on'>주소 입력</span>" +
                        "<span id='hs-video-upload' class='hs-header-select hs-video-upload'>동영상 업로드</span></div>";
                    popBottomHTML =
                        "<div class='hs-submit-wrap'><div class='hs-button hs-submit'>확인</div><div class='hs-cancel hs-button'>취소</div></div>";
                    popup.setPopup(330, 209, "동영상 첨부하기", 0);
                    popup.getPopup(true);
                    popup.setPreview("동영상 미리보기");
                    popup.getPreview();
                    popHeader = popup.getPopupHeader();
                    popBody = popup.getPopupBody();
                    popBottom = document.getElementById("hs-popup-bottom");
                    popBody.innerHTML = uploadHTML;
                    popHeader.childNodes[1].innerHTML = popHeaderHTML;
                    popBottom.innerHTML = popBottomHTML;
                    popup.show();
                    popup.showPreview(popup.pop);
                    popup.cur = 1;
                    urlBox = document.getElementById("hs-url-input");
                    widthBox = document.getElementById("hs-video-width");
                    heightBox = document.getElementById("hs-video-height");
                    previewBody = document.getElementById("HSedit-preview-body");
                    submit = HS.find(popBottom, ".hs-submit")[0];
                    cancel = HS.find(popBottom, ".hs-cancel")[0];
                    urlBox.addEventListener("focusout", function () {
                        var match, newURL, pass;
                        if (HSedit.trim(this.value) === "") {
                            return false;
                        }
                        newURL = this.value;
                        i = 0;
                        while (config.videoReg[i] && config.videoReg[i].test(this.value)) {
                            config.match = config.matchReg[i].exec(this.value);
                            newURL = "//www.youtube.com/embed/" + config.match[5] + "?wmode=opaque";
                            pass = true;
                            i++;
                        }
                        if (!config.notIncludePass && !pass) {
                            if (previewOn) {
                                previewBody.removeChild(previewBody.children[0]);
                                previewOn = null;
                            }
                            return false;
                        }
                        width = width || 640;
                        height = height || 360;
                        popup.preview.style.width = width + "px";
                        popup.preview.style.height = height + 30 + "px";
                        widthBox.value = width;
                        heightBox.value = height;
                        previewBody.innerHTML =
                            "<iframe width='" +
                            width +
                            "' height='" +
                            height +
                            "' src='" +
                            newURL +
                            "' frameborder='0' allowfullscreen></iframe>";
                        previewOn = true;
                    });
                    widthBox.addEventListener("focusout", function () {
                        if (this.value > 1600) {
                            this.value = 1600;
                        }
                        if (this.value < 20) {
                            this.value = 20;
                        }
                        width = this.value;
                        if (previewOn) {
                            popup.preview.style.width = width + "px";
                            if (previewOn) {
                                previewBody.children[0].style.width = width + "px";
                            }
                        }
                    });
                    heightBox.addEventListener("focusout", function () {
                        if (this.value > 1600) {
                            this.value = 1600;
                        }
                        if (this.value < 20) {
                            this.value = 20;
                        }
                        height = this.value;
                        if (previewOn) {
                            popup.preview.style.height = parseInt(height) + 30 + "px";
                            if (previewOn) {
                                console.dir(previewBody);
                                previewBody.children[0].style.height = height + "px";
                            }
                        }
                    });
                    submit.addEventListener("click", function (e) {
                        if (e.which === 1 && previewOn) {
                            var win = HSedit.getCurWin.apply(self);
                            console.log(self);
                            HSedit.insertContents(win, previewBody.children[0]);
                            popup.closePopup();
                        }
                    });
                    cancel.addEventListener("click", function (e) {
                        if (e.which === 1) {
                            popup.closePopup();
                        }
                    });
                },
            },
            fontFamily: {
                disable: false,
                base: "글꼴",
                box: { id: "hs-font-family", width: "70px" },
                contents: [
                    {
                        text: "Sans Serif",
                        size: "13px",
                        font: "sans-serif",
                        title: "Sans Serif",
                    },
                    {
                        text: "Arial",
                        size: "13px",
                        font: "Arial,Helvetica,sans-serif",
                        title: "Arial",
                    },
                    {
                        text: "Comic Sans MS",
                        size: "13px",
                        font: "Comic Sans MS,cursive",
                        title: "Comic Sans MS",
                    },
                    {
                        text: "Courier New",
                        size: "13px",
                        font: "Courier New,Courier,monospace",
                        title: "Courier New",
                    },
                    {
                        text: "Georgia",
                        size: "13px",
                        font: "Georgia,serif",
                        title: "Georgia",
                    },
                    {
                        text: "Lucida Sans Unicode",
                        size: "13px",
                        font: "Lucida Sans Unicode,Lucida Grande,sans-serif",
                        title: "Lucida Sans Unicode",
                    },
                    {
                        text: "Tahoma",
                        size: "13px",
                        font: "Tahoma,Geneva,sans-serif",
                        title: "Tahoma",
                    },
                    {
                        text: "Times New Roman",
                        size: "13px",
                        font: "Times New Roman,Times,serif",
                        title: "Times New Roman",
                    },
                    {
                        text: "Trebuchet MS",
                        size: "13px",
                        font: "Trebuchet MS,Helvetica,sans-serif",
                        title: "Trebuchet MS",
                    },
                    {
                        text: "Verdana",
                        size: "13px",
                        font: "Verdana,Geneva,sans-serif",
                        title: "Verdana",
                    },
                ],
                option: "font",
                addEvent: function (font, button) {
                    var active;
                    active = function (e) {
                        var win = HSedit.getCurWin.apply(this),
                            editor = win.document.body;
                        HSedit.getCurNodes3(win, "SPAN", "fontFamily", font);
                        HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                        win.remember.undo = true;
                    };
                    button.addEventListener("click", active);
                },
            },
            fontSize: {
                disable: false,
                base: "글자크기",
                box: { id: "hs-font-size", width: "70px" },
                contents: [
                    {
                        text: "6",
                        size: "6px",
                        title: "6",
                    },
                    {
                        text: "7",
                        size: "7px",
                        title: "7",
                    },
                    {
                        text: "8",
                        size: "8px",
                        title: "8",
                    },
                    {
                        text: "9",
                        size: "9px",
                        title: "9",
                    },
                    {
                        text: "10",
                        size: "10px",
                        title: "10",
                    },
                    {
                        text: "11",
                        size: "11px",
                        title: "11",
                    },
                    {
                        text: "12",
                        size: "12px",
                        title: "12",
                    },
                    {
                        text: "14",
                        size: "14px",
                        title: "14",
                    },
                    {
                        text: "16",
                        size: "16px",
                        title: "16",
                    },
                    {
                        text: "18",
                        size: "18px",
                        title: "18",
                    },
                    {
                        text: "20",
                        size: "20px",
                        title: "20",
                    },
                    {
                        text: "22",
                        size: "22px",
                        title: "22",
                    },
                    {
                        text: "24",
                        size: "24px",
                        title: "24",
                    },
                    {
                        text: "26",
                        size: "26px",
                        title: "26",
                    },
                    {
                        text: "28",
                        size: "28px",
                        title: "28",
                    },
                    {
                        text: "30",
                        size: "30px",
                        title: "30",
                    },
                    {
                        text: "36",
                        size: "36px",
                        title: "36",
                    },
                    {
                        text: "42",
                        size: "42px",
                        title: "42",
                    },
                    {
                        text: "48",
                        size: "48px",
                        title: "48",
                    },
                    {
                        text: "60",
                        size: "60px",
                        title: "60",
                    },
                    {
                        text: "72",
                        size: "72px",
                        title: "72",
                    },
                ],
                option: "size",
                addEvent: function (size, button) {
                    var active;
                    active = function (e) {
                        var win = HSedit.getCurWin.apply(this),
                            editor = win.document.body;
                        HSedit.getCurNodes3(win, "SPAN", "fontSize", size);
                        HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                        win.remember.undo = true;
                    };
                    button.addEventListener("click", active);
                },
            },
            table: {
                disable: false,
                opener:
                    "<i class='hs-table' style='background-image:url(" + HSset.assetsPath.image + "table.svg)'></i>",
                popup: function (setting) {
                    var pop = setting.popup,
                        option,
                        preview,
                        popupHTML =
                            "<div class='HSedit-open-pop-header'><label class='hs-mini-text hs-strong-text'>표 만들기</label></div><div id='HSedit-table-setting'>" +
                            "<div id='hs-table-size'><label class='hs-strong-text hs-mini-text'>행</label><input type='text' id='hs-table-row-text' class='hs-input'/>" +
                            "<label class='hs-strong-text hs-mini-text'>열</label><input type='text' id='hs-table-col-text' class='hs-input'/></div>" +
                            "<div class='hs-line'></div><label class='hs-strong-text'>스타일 지정</label><div id='hs-table-style'></div></div>";
                    console.log(setting);
                    setting.popSet("200px", "150px", popupHTML);
                    function createStyleM(i) {
                        var node = document.createElement("div"),
                            node2,
                            node3;
                        HSedit.addClass(node, "hs-list-mem");
                        (node2 = document.createElement("div")).style.height = "15px";
                        node.appendChild(node2);
                        switch (i) {
                            case 0:
                                node2.style.fontSize = "11px";
                                node2.style.textAlign = "center";
                                node2.innerHTML = "표 스타일 없음";
                                break;
                            case 1:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px solid black;width:51px;padding-top:6px;margin:0 auto;'></div>";
                                break;
                            case 2:
                                node2.innerHTML =
                                    "<div style='border-bottom:3px double black;width:51px;padding-top:5px;margin:0 auto;'></div>";
                                break;
                            case 3:
                                node2.innerHTML =
                                    "<div style='border-bottom:3px double black;width:51px;padding-top:4px;margin:0 auto;'></div><div style='width:51px;padding-top:1px;margin:0 auto;border-bottom:1px solid black;'>";
                                break;
                            case 4:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px dotted black;width:51px;padding-top:6px;margin:0 auto;'></div>";
                                break;
                            case 5:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px dotted black;width:51px;padding-top:5px;margin:0 auto;'></div><div style='border-bottom:1px dotted black;width:51px;padding-top:1px;margin:0 auto;'></div>";
                                break;
                            case 6:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px dotted black;width:51px;padding-top:6px;margin:0 auto;'></div>";
                                break;
                            case 7:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px dashed black;width:51px;padding-top:6px;margin:0 auto;'></div>";
                                break;
                            case 8:
                                node2.innerHTML =
                                    "<div style='border-bottom:1px dashed black;width:51px;padding-top:5px;margin:0 auto;'></div><div style='border-bottom:1px dashed black;width:51px;padding-top:1px;margin:0 auto;'></div>";
                                break;
                            case 9:
                                node2.innerHTML =
                                    "<div style='border-bottom:3px groove #aaa;width:51px;padding-top:5px;margin:0 auto;'></div>";
                                break;
                            case 10:
                                node2.innerHTML =
                                    "<div style='border-bottom:3px groove #aaa;width:51px;padding-top:3px;margin:0 auto;'></div><div style='border-bottom:3px ridge #aaa;width:51px;padding-top:1px;margin:0 auto;'></div>";
                                break;
                            case 11:
                                node2.innerHTML =
                                    "<div style='border-bottom:3px ridge #aaa;width:51px;padding-top:5px;margin:0 auto;'></div>";
                                break;
                        }
                        return { node: node, event: function () {} };
                    }
                    var box = new Box({
                        id: "hs-table-border-style",
                        baseText: "표스타일이",
                        width: "80px",
                        members: [
                            createStyleM(0),
                            createStyleM(1),
                            createStyleM(2),
                            createStyleM(3),
                            createStyleM(4),
                            createStyleM(5),
                            createStyleM(6),
                            createStyleM(7),
                            createStyleM(8),
                            createStyleM(9),
                            createStyleM(10),
                            createStyleM(11),
                        ],
                        parent: setting.popup.children[1],
                    });
                    var preview = document.createElement("div");
                    HSedit.addClass(preview, "hs-table-preview");
                    pop.appendChild(preview);
                    setting.open();
                    pop.style.left = setting.editor.clientWidth - (pop.offsetLeft + pop.offsetWidth + 300) + "px";

                    //preview.show();
                    setting.preview = preview.preview;
                    option = {
                        box: {
                            id: "hs-table-style-border",
                        },
                        base: ["span"],
                    };
                },
                active: function (e) {},
            },
            fontColor: {
                disable: false,
                opener:
                    "<i class='hs-font-color' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "fontcolor.svg)'></i><div id='hs-font-color2'></div>",
                end: function () {
                    HSedit.removeClass(this.pickerOpen, "hs-opened");
                    if (colorPicker && colorPicker.wrap.parentNode) {
                        colorPicker.wrap.parentNode.removeChild(colorPicker.wrap);
                        this.popup.style.width = "";
                        this.popup.style.left = "";
                    }
                },
                popup: function (setting) {
                    var config = HSset.color,
                        baseColorWrap,
                        i,
                        color,
                        active = setting.setting.active,
                        submit,
                        cancel,
                        pop = setting.popup,
                        popupHTML =
                            "<div class='HSedit-open-pop-header'><label class='hs-mini-text hs-strong-text'>글자 색상</label></div><div id='HSedit-color-setting'>" +
                            "<div class='hs-base-color-wrap'></div></div>";
                    setting.popSet("200px", "200px", popupHTML);
                    baseColorWrap = HS.find(pop, ".hs-base-color-wrap")[0];
                    for (i = 0; i < config.base.length; i++) {
                        color = HSedit.domMake([
                            "span",
                            { class: "hs-base-color", style: "background-color:" + config.base[i] },
                        ]);
                        baseColorWrap.appendChild(color);
                        color.addEventListener("click", function () {
                            active.call(this);
                            setting.close();
                        });
                    }
                    color = HSedit.domMake([
                        "span",
                        { class: "hs-base-color hs-open-picker" },
                        ["img", { src: HSset.assetsPath.image + "etc.svg" }],
                    ]);
                    baseColorWrap.appendChild(color);
                    setting.pickerOpen = color;
                    color.addEventListener("click", function () {
                        if (HSedit.hasClass(this, "hs-opened")) {
                            HSedit.removeClass(this, "hs-opened");
                            HSAnim.animate(pop, { left: 0 }, 150);
                            HSAnim.animate(pop, { width: 200 }, 150);
                            pop.removeChild(colorPicker.wrap);
                        } else {
                            HSedit.addClass(this, "hs-opened");
                            var popOffset = pop.offsetLeft + pop.offsetWidth + colorPickerWidth;
                            if (!colorPicker) {
                                colorPicker = new ColorPicker(pop);
                                submit = HS.find(pop, ".hs-submit")[0];
                                cancel = HS.find(pop, ".hs-cancel")[0];
                                submit.addEventListener("click", function () {
                                    colorFun.call(this, colorPicker.cur.offset);
                                    colorSet.close();
                                });
                                cancel.addEventListener("click", function () {
                                    colorSet.close();
                                });
                            } else {
                                pop.appendChild(colorPicker.wrap);
                            }
                            colorPicker.wrap.style.opacity = 0;
                            HSAnim.animate(pop, { left: setting.editor.clientWidth - popOffset }, 150);
                            HSAnim.animate(pop, { width: 625 }, 150, function () {
                                HSAnim.animate(colorPicker.wrap, { opacity: 1 }, 200, null, 0);
                            });
                            colorFun = active;
                            colorSet = setting;
                        }
                    });
                    setting.open();
                },
                active: function (offset) {
                    var win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    HSedit.getCurNodes3(win, "SPAN", "color", offset || this.style.backgroundColor);
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
            backgroundColor: {
                disable: false,
                opener:
                    "<i class='hs-background-color' style='background-image:url(" +
                    HSset.assetsPath.image +
                    "fontcolor.svg)'></i><div id='hs-background-color2'></div>",
                end: function () {
                    HSedit.removeClass(this.pickerOpen, "hs-opened");
                    if (colorPicker && colorPicker.wrap.parentNode) {
                        colorPicker.wrap.parentNode.removeChild(colorPicker.wrap);
                        this.popup.style.width = "";
                        this.popup.style.left = "";
                    }
                },
                popup: function (setting) {
                    var config = HSset.color,
                        baseColorWrap,
                        i,
                        color,
                        active = setting.setting.active,
                        submit,
                        cancel,
                        pop = setting.popup,
                        popupHTML =
                            "<div class='HSedit-open-pop-header'><label class='hs-mini-text hs-strong-text'>글자 색상</label></div><div id='HSedit-color-setting'>" +
                            "<div class='hs-base-color-wrap'></div></div>";
                    setting.popSet("200px", "200px", popupHTML);
                    baseColorWrap = HS.find(pop, ".hs-base-color-wrap")[0];
                    for (i = 0; i < config.base.length; i++) {
                        color = HSedit.domMake([
                            "span",
                            { class: "hs-base-color", style: "background-color:" + config.base[i] },
                        ]);
                        baseColorWrap.appendChild(color);
                        color.addEventListener("click", function () {
                            active.call(this);
                            setting.close();
                        });
                    }
                    color = HSedit.domMake([
                        "span",
                        { class: "hs-base-color hs-open-picker" },
                        ["img", { src: HSset.assetsPath.image + "etc.svg" }],
                    ]);
                    baseColorWrap.appendChild(color);
                    setting.pickerOpen = color;
                    color.addEventListener("click", function () {
                        if (HSedit.hasClass(this, "hs-opened")) {
                            HSedit.removeClass(this, "hs-opened");
                            HSAnim.animate(pop, { left: 0 }, 150);
                            HSAnim.animate(pop, { width: 200 }, 150);
                            pop.removeChild(colorPicker.wrap);
                        } else {
                            HSedit.addClass(this, "hs-opened");
                            var popOffset = pop.offsetLeft + pop.offsetWidth + colorPickerWidth;
                            if (!colorPicker) {
                                colorPicker = new ColorPicker(pop);
                                submit = HS.find(pop, ".hs-submit")[0];
                                cancel = HS.find(pop, ".hs-cancel")[0];
                                submit.addEventListener("click", function () {
                                    colorFun.call(this, colorPicker.cur.offset);
                                    colorSet.close();
                                });
                                cancel.addEventListener("click", function () {
                                    colorSet.close();
                                });
                            } else {
                                pop.appendChild(colorPicker.wrap);
                            }
                            colorPicker.wrap.style.opacity = 0;
                            HSAnim.animate(pop, { left: setting.editor.clientWidth - popOffset }, 150);
                            HSAnim.animate(
                                pop,
                                { width: 625 },
                                150,
                                function () {
                                    HSAnim.animate(colorPicker.wrap, { opacity: 1 }, 200, null, 0);
                                },
                                0
                            );
                            colorFun = active;
                            colorSet = setting;
                        }
                    });
                    setting.open();
                },
                active: function (offset) {
                    var win = HSedit.getCurWin.apply(this),
                        editor = win.document.body;
                    HSedit.getCurNodes3(win, "SPAN", "backgroundColor", offset || this.style.backgroundColor);
                    HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
                    win.remember.undo = true;
                },
            },
        };
        //툴 관련 스크립트 끝
    };
    var colorFun, colorSet;
    HSedit.fn.init.prototype = HSedit.fn;
    HSedit.extend = HSedit.fn.extend = HSedit.range.extend = popup.extend = function () {
        var options = arguments[0],
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = this,
            i = 0,
            deep = false;
        for (name in options) {
            target[name] = options[name];
        }
        return target;
    };

    //유틸 메서드 시작
    //saveRange설정
    HSedit.range.extend({
        initialize: function (win) {
            HSedit.range.win = win;
            HSedit.range.start = null;
            HSedit.range.startOffset = 0;
            HSedit.range.end = null;
            HSedit.range.endOffset = 0;
            HSedit.range.childCount = 0;
            HSedit.range.dummy = 0;
        },
        setSel: function (range, type) {
            var sel;
            sel = HSrange.win.getSelection();
            if (!type) {
                range.setStart(HSrange.start, HSrange.startOffset);
                range.setEnd(HSrange.end, HSrange.endOffset);
            } else {
                range.setStart(HSrange.start, HSrange.startOffset);
                range.setEnd(HSrange.end, HSrange.endOffset);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        },
        getOffsetToRange: function (win, range) {
            //range를 offset으로 변환
            var start = range.startContainer,
                end = range.endContainer,
                startOffset = range.startOffset,
                i,
                endOffset = range.endOffset,
                node,
                saveNode,
                editor = win.document.body,
                newRange = {},
                startPar,
                endPar;

            //startNode paragraph 체크
            i = 0;
            while ((node = editor.childNodes[i++]) && !(HSedit.contains(node, start) || node === start)) {
                //goodgood!!
            }
            startPar = --i;

            //endNode paragraph 체크
            i = 0;
            while ((node = editor.childNodes[i++]) && !(HSedit.contains(node, end) || node === end)) {}
            endPar = --i;

            //startOffset,start 변환
            node = start;
            while (node && node.parentNode !== editor) {
                while (node) {
                    saveNode = node;
                    node = node.previousSibling;
                    if (node) {
                        startOffset += node.textContent.length;
                    }
                }
                node = saveNode.parentNode;
            }
            //endOffset,end 변환
            node = end;
            while (node && node.parentNode !== editor) {
                while (node) {
                    saveNode = node;
                    node = node.previousSibling;
                    if (node) {
                        endOffset += node.textContent.length;
                    }
                }
                node = saveNode.parentNode;
            }
            return (newRange = {
                start: startOffset === 0 ? startOffset : startOffset - 1,
                end: endOffset === 0 ? endOffset : endOffset - 1,
                startPar: startPar,
                endPar: endPar,
                collapse: start === end ? true : false,
            });
        },
        getRangeToOffset: function (win, range) {
            //offset을 range로 변환
            var parentNode,
                editor = win.document.body,
                startOffset = range.start,
                endOffset = range.end,
                node;
            parentNode = editor.childNodes[range.startPar];
            if (range.start === 0 && range.end === 0) {
                //빈줄일경우
                HSrange.start = parentNode;
                HSrange.end = parentNode;
                HSrange.startOffset = 0;
                HSrange.endOffset = 0;
                return true;
            }

            //start range 설정
            node = HSedit.getFirstTextNode(parentNode.childNodes[0]);
            while (node) {
                if (
                    node.nodeType === 3 &&
                    (startOffset - node.textContent.length < 0 ||
                        (startOffset - node.textContent.length <= 0 && range.collapse))
                ) {
                    HSrange.start = node;
                    HSrange.startOffset = startOffset;
                    node = null;
                    break;
                } else {
                    startOffset = startOffset - node.textContent.length;
                }
                node = HSedit.nextTextNode(node);
            }

            //end range 설정
            parentNode = editor.childNodes[range.endPar];
            node = HSedit.getFirstTextNode(parentNode.childNodes[0]);
            while (node) {
                if (
                    node.nodeType === 3 &&
                    (endOffset - node.textContent.length <= 0 ||
                        (endOffset - node.textContent.length <= 0 && range.collapse))
                ) {
                    HSrange.end = node;
                    HSrange.endOffset = endOffset;
                    node = null;
                    break;
                } else {
                    endOffset = endOffset - node.textContent.length;
                }
                node = HSedit.nextTextNode(node);
            }
        },
    });
    var HSrange = HSedit.range;
    //popup 시작
    popup.extend({
        pop: null,
        preview: null,
        test: null,
        cover: null,
        cur: null,
        setting: {
            width: 0,
            height: 0,
            title: "",
        },
        setPopup: function (width, height, title, headerBottomHeight) {
            popup.setting.width = width;
            popup.setting.height = height;
            popup.setting.title = title;
            popup.setting.headerBottomHeight = headerBottomHeight;
        },
        getPopup: function (isPopupBottom) {
            var pop,
                cover,
                name,
                popHead,
                popBody,
                headerMoveFun,
                headerDownFun,
                headerUpFun,
                header,
                bottomHTML = "",
                bottomR1 = "",
                bottomR2 = "";
            if (!(pop = HS.find(document.body, "#HSedit-popup"))) {
                if (isPopupBottom) {
                    bottomR2 = " hs-bottom-radius";
                    bottomHTML = "<div id='hs-popup-bottom' class='hs-popup-bottom" + bottomR2 + "'></div>";
                } else {
                    bottomR1 = " hs-bottom-radius";
                }
                pop = document.createElement("div");
                pop.id = "HSedit-popup";
                HSedit.addClass(pop, "HSedit-popup");
                pop.innerHTML =
                    "<div id='HSedit-popup-header' class='HSedit-popup-header'><div id='HSedit-header-top'></div><div id='HSedit-popup-header-bottom' class='HSedit-popup-header-bottom'></div></div>" +
                    "<div class='HSedit-popup-body" +
                    bottomR1 +
                    "'></div>" +
                    bottomHTML;
                document.body.appendChild(pop);
                cover = document.createElement("div");
                cover.id = "HSedit-cover";
                HSedit.addClass(cover, "HSedit-cover");
                document.body.appendChild(cover);
                popup.pop = pop;
                popup.cover = cover;
            }
            popup.cover.style.height = document.body.scrollHeight + "px";
            popBody = pop.childNodes[1];
            popHead = document.getElementById("HSedit-header-top");
            pop.style.width = popup.setting.width + "px";
            pop.style.height = popup.setting.height + "px";
            popHead.innerHTML =
                "<label class='HSedit-popup-title'>" + popup.setting.title + "</label><div id='hs-popup-close'></div>";
            if (popup.setting.headerBottomHeight !== 0) {
                popBody.style.height = popup.setting.height - popup.setting.headerBottomHeight + "px";
            } else {
                popBody.style.height = popup.setting.height - 30 + "px";
            }
            document.getElementById("hs-popup-close").addEventListener("click", function () {
                popup.closePopup();
            });
            header = document.getElementById("HSedit-popup-header");
            headerDownFun = function (e) {
                if (e.which === 1) {
                    var top = parseInt(pop.style.top || 0),
                        left = parseInt(pop.style.left || 0);
                    popup.preview.style.zIndex = 9998;
                    pop.style.zIndex = 9999;
                    headerUpFun = function () {
                        document.removeEventListener("mousemove", headerMoveFun);
                        document.removeEventListener("mouseup", headerUpFun);
                    };
                    headerMoveFun = function (e2) {
                        pop.style.top = top + (e2.pageY - e.pageY) + "px";
                        pop.style.left = left + (e2.pageX - e.pageX) + "px";
                    };
                    document.addEventListener("mousemove", headerMoveFun);
                    document.addEventListener("mouseup", headerUpFun);
                }
                e.preventDefault();
            };
            popHead.addEventListener("mousedown", headerDownFun);
        },
        getPopupHeader: function () {
            return document.getElementById("HSedit-popup-header");
        },
        getPopupBody: function () {
            return HS.find(document.body, ".HSedit-popup-body")[0];
        },
        show: function () {
            var pop = popup.pop,
                cover = popup.cover;
            pop.style.display = "block";
            cover.style.display = "block";
            if (window.innerWidth > popup.setting.width + 200) {
                pop.style.left = window.innerWidth / 2 - (pop.offsetWidth / 2 + 100) + "px";
            } else {
                pop.style.left = 0;
            }
            pop.style.top = window.innerHeight / 2 - pop.offsetHeight / 2 + "px";
        },
        closePopup: function () {
            popup.cover.style.display = "none";
            popup.pop.style.display = "none";
            if (popup.isPreviewOn === true) {
                popup.preview.style.display = "none";
                popup.preview.parentNode.removeChild(popup.preview);
                popup.isPreviewOn = false;
            }
            popup.pop.parentNode.removeChild(popup.pop);
            popup.cover.parentNode.removeChild(popup.cover);
        },
    });
    Preview.prototype.show = function () {
        var preview;
        preview = this.preview;
        preview.style.display = "block";
        preview.style.zIndex = "9998";
        preview.style.left = this.target.offsetLeft + this.target.offsetWidth + 3 + "px";
        preview.style.top = this.target.offsetTop + "px";
    };
    function Preview(title, target) {
        var preview,
            previewHead,
            headerDownFun,
            headerUpFun,
            headerMoveFun,
            headerDownAgain,
            header,
            ff,
            self = this;
        if (!(pop = document.getElementById("HSedit-preview"))) {
            preview = document.createElement("div");
            preview.id = "HSedit-preview";
            HSedit.addClass(preview, "HSedit-preview");
            preview.innerHTML = "<div id='HSedit-preview-header'></div><div id='HSedit-preview-body'></div>";
            target.parentNode.appendChild(preview);
            preview.style.width = 200 + "px";
            preview.style.height = 30 + "px";
            previewHead = preview.childNodes[0];
            previewHead.innerHTML =
                "<label class='HSedit-popup-title'>" + title + "</label><div id='hs-preview-minify'></div>";
            this.preview = preview;
            this.target = target;
            if ((target = popup.pop)) {
                popup.preview = this.preview;
                popup.isPreviewOn = true;
            }

            //preview 이벤트 등록
            header = document.getElementById("HSedit-preview-header");
            headerDownFun = function (e) {
                if (e.which === 1) {
                    var top = parseInt(preview.style.top || 0),
                        left = parseInt(preview.style.left || 0);
                    preview.style.zIndex = 9999;
                    self.target.style.zIndex = 9998;
                    headerUpFun = function () {
                        ff = null;
                        document.removeEventListener("mousemove", headerMoveFun);
                        document.removeEventListener("mouseup", headerUpFun);
                    };
                    headerMoveFun = function (e2) {
                        ff = true;
                        preview.style.top = top + (e2.pageY - e.pageY) + "px";
                        preview.style.left = left + (e2.pageX - e.pageX) + "px";
                    };
                    document.addEventListener("mousemove", headerMoveFun);
                    document.addEventListener("mouseup", headerUpFun);
                }
                e.preventDefault();
            };
            header.addEventListener("mousedown", headerDownFun);
        }
        return pop;
    }
    //popup 끝
    //progress 시작
    Progress.prototype.stop = function () {
        //업로드가 끝난후 업로드 progress popup 종료
        var submitBut = HS.find(this.uploadPop, ".hs-disable")[0],
            uploadPop = this.uploadPop;
        HSedit.removeClass(submitBut, "hs-disable");
        HSedit.addClass(submitBut, "hs-submit");
        submitBut.addEventListener("click", function (e) {
            var popup = document.getElementById("HSedit-popup");
            popup.style.zIndex = 9999;
            document.body.removeChild(uploadPop);
        });
    };
    function Progress(title) {
        var uploadPopHTML =
                "<div id='hs-up-pro-title' class='hs-mini-text'>" +
                title +
                "</div><div id='hs-up-pro-body'>" +
                "<div id='hs-progress-name' class='hs-small-text'></div><div id='hs-progress-bar'><div id='hs-progressing'></div></div>" +
                "<div id='hs-progress-status' class='hs-small-text'></div><div id='hs-progress-warning'></div></div>" +
                "<div class='hs-progress-pop-bottom'><div class='hs-button hs-disable hs-center'>확인</div></div>",
            uploadPop = (this.uploadPop = document.createElement("div"));
        uploadPop.id = "hs-upload-progress";
        uploadPop.innerHTML = uploadPopHTML;
        document.body.appendChild(uploadPop);
        this.progressName = document.getElementById("hs-progress-name");
        this.progressBar = document.getElementById("hs-progress-bar");
        this.progressing = document.getElementById("hs-progressing");
        this.progressStatus = document.getElementById("hs-progress-status");
        this.progressWarning = document.getElementById("hs-progress-warning");
    }
    //progress 끝
    //Ajax 시작
    //이미지 업로드 메서드
    function imageUpload(count, images) {
        if (count > 0) {
            var imgData;
            if (ie9) {
                imgData = images[uploadCount].data;
            } else {
                imgData = new FormData();
                imgData.append("file", images[uploadCount].image);
            }
            ajaxStart(HSset.image.uploadURL, imgData, imageUpload, --count, images);
        } else if (count === 0 && images.length > 0) {
            var win = HSedit.getCurWin.apply(save),
                editor = win.document.body,
                i,
                img;
            for (i = 0; i < imgPaths.length; i++) {
                img = document.createElement("img");
                img.src = imgPaths[i];
                console.dir(imgPaths[i]);
                HSedit.insertContents(win, img);
            }
            HSedit.pushRemember(win, win.remember, editor.innerHTML, true);
            win.remember.undo = true;
            popup.closePopup();
            imgPaths = [];
        }
    }
    xhr = new XMLHttpRequest();

    xhr.ontimeout = function () {};
    function ajaxStart(url, file, callback, count, files) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                imgPaths[imgPaths.length] = xhr.responseText;
                uploadCount++;
                callback(count, files);
            }
        };
        xhr.open("POST", url, true);
        xhr.timeout = 5000;
        if (ie9) {
            var boundary = generateBoundary();
            xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);
            file = buildMessage(files[count], boundary);
        }
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        //xhr.setRequestHeader("Accept","");
        xhr.send(file);
    }
    //ie9지원
    if (ie9) {
        function generateBoundary() {
            return "AJAX-----------------------" + new Date().getTime();
        }
        function buildMessage(file, boundary) {
            var CRLF = "\r\n",
                part;
            part = "--" + boundary + CRLF;
            part += "Content-Disposition: form-data; ";
            part += 'name="file"; ';
            part += 'filename="' + file.name + '"' + CRLF;
            part += "Content-Type: application/octet-stream";
            part += CRLF + CRLF;
            part += file.data + CRLF;
            part += "--" + boundary + "--" + CRLF;
            return part;
        }
    }
    //Ajax 끝
    //바이너리 시작
    function stringToHex(str) {
        var hex = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) < 16) {
                hex += "0" + str.charCodeAt(i).toString(16);
            } else {
                hex += "" + str.charCodeAt(i).toString(16);
            }
        }
        return hex;
    }
    function hexStringToint(hex, little) {
        var i,
            num,
            str = "";
        if (little) {
            for (i = 0; i !== hex.length; ) {
                i += 2;
                str += hex.substr(hex.length - i, 2);
            }
        }
        num = parseInt(str || hex, 16);
        return num;
    }
    function hexStringTobit(hex) {
        var a = hexStringToint(hex).toString(2),
            i;
        if (a.length < 8) {
            for (i = 0; i < 8 - a.length; i++) {
                a = "0" + a;
            }
        }
        return a;
    }
    function hexStringToPartbit(hex, start, end) {
        var bin = "";
        for (; start <= end; start++) {
            bin += hexStringTobit(hex).charAt(start);
        }
        return bin;
    }
    function hexStringToArray(str) {
        var i,
            arr = [];
        for (i = 0; i < str.length; i += 2) {
            arr.push(str.substr(i, 2));
        }
        return arr;
    }
    function hexStringToString(str) {
        var nStr = "",
            i;
        for (i = 0; i < str.length; i += 2) {
            nStr += String.fromCharCode(parseInt(str.substr(i, 2), 16));
        }
        return nStr;
    }
    function intToStr(data, little, forceLen) {
        var str = (nStr = data.toString(16)),
            i;
        if (str.length % 2 === 1) {
            str = "0" + str;
        }
        if (little) {
            nStr = "";
            for (i = 2; i < str.length + 2; i += 2) {
                nStr += str.substr(str.length - i, 2);
            }
            if (forceLen) {
                for (i = nStr.length; i < forceLen * 2; i += 2) {
                    nStr += "00";
                }
            }
        } else {
            if (forceLen) {
                for (i = nStr.length; i < forceLen * 2; i += 2) {
                    nStr = "00" + nStr;
                }
            }
        }
        return hexStringToString(nStr);
    }
    function toint(a) {
        return ~~a;
    }
    //바이너리 끝
    //base64 시작
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    if (typeof window.btoa === "undefined") {
        window.btoa = function (input) {
            var str = String(input);
            for (
                var block, charCode, idx = 0, map = chars, output = "";
                str.charAt(idx | 0) || ((map = "="), idx % 1);
                output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
            ) {
                charCode = str.charCodeAt((idx += 3 / 4));
                block = (block << 8) | charCode;
            }
            return output;
        };
    }
    if (typeof window.atob === "undefined") {
        window.atob = function (input) {
            var str = String(input).replace(/=+$/, "");
            for (
                var bc = 0, bs, buffer, idx = 0, output = "";
                (buffer = str.charAt(idx++));
                ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
                    ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                    : 0
            ) {
                buffer = chars.indexOf(buffer);
            }
            return output;
        };
    }

    //base64 끝
    //gif이미지 관련 시작
    GIF.prototype.dataReplace = function (start, end, char) {
        this.data = this.data.substr(0, start) + char + this.data.substr(end);
    };
    String.prototype.dataReplace = function (start, end, char) {
        return this.substr(0, start) + char + this.substr(start + end);
    };
    GIF.prototype.isgifHeaderB = function (imData) {
        //1차적으로 gif의 header block을 체크
        var hB = stringToHex(imData.substr(0, 6));
        if (hB === "474946383961" || hB === "474946383761") {
            this.moveCursor(6);
            this.newData = imData.substr(0, 6);
            return true;
        }
        return false;
    };
    GIF.prototype.getGCT = function () {
        //global color table
        var gctSize = (1 << (parseInt(hexStringToPartbit(subHexStr(this.data, 10, 1), 5, 7), 2) + 1)) * 3,
            i,
            str,
            arr = [];
        this.moveCursor(gctSize);
        str = subHexStr(this.data, 13, gctSize);
        for (i = 0; i < str.length; i += 6) {
            arr.push([
                parseInt(str.substr(i, 2), 16),
                parseInt(str.substr(i + 2, 2), 16),
                parseInt(str.substr(i + 4, 2), 16),
            ]);
        }
        return arr;
    };
    GIF.prototype.getLCT = function (size) {
        //local color table을 각 image data에 저장
        var str,
            i,
            arr = this.gifData[3][this.gifData[3].length - 1];
        arr = arr.lct = [];
        this.moveCursor(1);
        str = subHexStr(this.data, this.cursor, size);
        for (i = 0; i < str.length; i += 6) {
            arr.push([
                parseInt(str.substr(i, 2), 16),
                parseInt(str.substr(i + 2, 2), 16),
                parseInt(str.substr(i + 4, 2), 16),
            ]);
        }
        this.moveCursor(size); //local color table의 사이즈만큼 건너뛴다.
    };
    GIF.prototype.moveCursor = function (value) {
        this.cursor += value;
        this.cursor2 += value;
    };
    GIF.prototype.imageDataEncode = function (width, height, index) {
        var END = -1;
        var pixels = this.pixels,
            maxbit = 12,
            maxTableSize = 1 << maxbit,
            pixSize,
            n_bits,
            cursor = 0,
            minLZWSize = hexStringToint(subHexStr(this.gifData[3][index].data, 0, 1)),
            codeSize = minLZWSize + 1,
            codeSize2,
            clear_flg = false,
            maxCode,
            clear,
            eof,
            dictNum,
            hshift,
            fcode,
            hsize_reg,
            result = [], //결과
            pixel, //픽셀 단위
            ent,
            cur_accum = 0,
            masks = [
                0x0000,
                0x0001,
                0x0003,
                0x0007,
                0x000f,
                0x001f,
                0x003f,
                0x007f,
                0x00ff,
                0x01ff,
                0x03ff,
                0x07ff,
                0x0fff,
                0x1fff,
                0x3fff,
                0x7fff,
                0xffff,
            ],
            cur_bits = 0,
            accum = [],
            a_count = 0,
            hashTable = [],
            codeTable = [],
            disp;

        function output(code) {
            cur_accum &= masks[cur_bits];
            if (cur_bits > 0) cur_accum |= code << cur_bits;
            else cur_accum = code;
            cur_bits += n_bits;
            while (cur_bits >= 8) {
                char_out(cur_accum & 0xff);
                cur_accum >>= 8;
                cur_bits -= 8;
            }
            if (dictNum > maxCode || clear_flg) {
                if (clear_flg) {
                    maxCode = getMaxCode((n_bits = g_init_bits));
                    clear_flg = false;
                } else {
                    ++n_bits;
                    if (n_bits == maxbit) maxCode = 4096;
                    else maxCode = getMaxCode(n_bits);
                }
            }
            if (code == eof) {
                while (cur_bits > 0) {
                    char_out(cur_accum & 0xff);
                    cur_accum >>= 8;
                    cur_bits -= 8;
                }
                flush_char();
            }
        }
        function flush_char() {
            if (a_count > 0) {
                result.push(a_count);
                for (i = 0; i < a_count; i++) {
                    result.push(accum[i]);
                }
                a_count = 0;
            }
        }
        function char_out(code) {
            accum[a_count++] = code;
            if (a_count >= 255) flush_char();
        }
        function cl_block(outs) {
            cl_hash();
            dictNum = clear + 2;
            clear_flg = true;
            output(clear);
        }
        function cl_hash() {
            var i;
            for (i = 0; i < 5003; ++i) hashTable[i] = -1;
        }
        function getMaxCode(n_bits) {
            return (1 << n_bits) - 1;
        }
        function nextPixel() {
            if (pixSize === 0) return END;
            --pixSize;
            return pixels[cursor++];
        }

        result.push(minLZWSize);
        pixSize = width * height;
        g_init_bits = codeSize;
        n_bits = g_init_bits;
        maxCode = getMaxCode(n_bits);
        clear = 1 << (n_bits - 1);
        eof = clear + 1;
        dictNum = clear + 2;
        hshift = 4;
        hsize_reg = 5003;
        ent = nextPixel();
        output(clear);
        outer_loop: while ((pixel = nextPixel()) !== END) {
            fcode = (pixel << maxbit) + ent;
            i = (pixel << 4) ^ ent;
            if (hashTable[i] == fcode) {
                ent = codeTable[i];
                continue;
            } else if (hashTable[i] >= 0) {
                disp = hsize_reg - i;
                if (i === 0) disp = 1;
                do {
                    if ((i -= disp) < 0) i += hsize_reg;
                    if (hashTable[i] == fcode) {
                        ent = codeTable[i];
                        continue outer_loop;
                    }
                } while (hashTable[i] >= 0);
            }
            output(ent);
            ent = pixel;
            if (dictNum < 4096) {
                codeTable[i] = dictNum++;
                hashTable[i] = fcode;
            } else cl_block();
        }
        output(ent);
        output(eof);
        result.push(0);
        return result;
    };
    GIF.prototype.imageDecode = function (index) {
        var imData = this.gifData[3],
            j,
            k,
            cursor = 0;
        if (imData && imData.length < 1 === false) {
            var size =
                    hexStringToint(subHexStr(this.data, imData[index].width, 2), true) *
                    hexStringToint(subHexStr(this.data, imData[index].height, 2), true),
                minLZWsize = hexStringToint(subHexStr(imData[index].data, 0, 1), true),
                in_code,
                MaxStackSize = 4096,
                clear = 1 << minLZWsize,
                code = clear,
                end_of_information = clear + 1,
                available = clear + 2,
                code_size = minLZWsize + 1,
                code_mask = (1 << code_size) - 1,
                datum = 0,
                top = 0,
                bits = 0,
                count = 0,
                bCount,
                block = [],
                str,
                bi = 0,
                null_code = -1,
                pixelStack = [],
                old_code = null_code,
                first,
                prefix = [],
                suffix = [],
                pixels = [], //디코딩한 최종결과값을 넣는다
                pi = 0, //pixel index 3씩쌓이면서 pixels[]에 rgb를 넣는다.
                ct; //color table;
            for (code = 0; code < clear; code++) {
                prefix[code] = 0;
                suffix[code] = code;
            }
            cursor = 1;
            if (size < 1 === false) {
                for (j = 0; j < size; ) {
                    if (top === 0) {
                        if (bits < code_size) {
                            if (count === 0) {
                                count = hexStringToint(subHexStr(imData[index].data, cursor, 1));
                                cursor++;
                                if (count > 0) {
                                    str = subHexStr(imData[index].data, cursor, count);
                                    cursor += count;
                                    for (k = 0; k < count * 2; k += 2) {
                                        block.push(str.substr(k, 2));
                                    }
                                } else {
                                    break;
                                }
                            }
                            datum += parseInt(block[bi], 16) << bits;
                            bits += 8;
                            bi++;
                            count--;
                            continue;
                        }
                        code = datum & code_mask;
                        datum >>= code_size;
                        bits -= code_size;
                        if (code > available || code == end_of_information) {
                            break;
                        }
                        if (code == clear) {
                            code_size = minLZWsize + 1;
                            code_mask = (1 << code_size) - 1;
                            available = clear + 2;
                            old_code = null_code;
                            continue;
                        }
                        if (old_code == null_code) {
                            pixelStack[top++] = suffix[code];
                            old_code = code;
                            first = code;
                            continue;
                        }
                        in_code = code;
                        if (code == available) {
                            pixelStack[top++] = first;
                            code = old_code;
                        }
                        while (code > clear) {
                            pixelStack[top++] = suffix[code];
                            code = prefix[code];
                        }
                        first = suffix[code];
                        if (available >= MaxStackSize) {
                            break;
                        }
                        pixelStack[top++] = first;
                        prefix[available] = old_code;
                        suffix[available] = first;
                        available++;
                        if ((available & code_mask) == 0 && available < MaxStackSize) {
                            //code table 길이가 code_size+1이 되면 code_size를 1올린다.code_size는 12보다 클수없다.
                            code_size++;
                            code_mask += available;
                        }
                        old_code = in_code;
                    }
                    top--;
                    pixels[pi++] = pixelStack[top];
                    j++;
                }
            }
            this.pixels = pixels;
        } else {
            return false;
        }
    };
    GIF.prototype.scaleImage = function (i) {
        var j,
            xfactor = this.scaleWidth / this.width,
            yfactor = this.scaleHeight / this.height,
            newPixels,
            image = this.gifData[3][i],
            drawWidth = image.width,
            drawHeight = image.height,
            new_left,
            new_top,
            new_right,
            new_bottom,
            newW,
            newH,
            leftV,
            topV,
            result,
            str = "",
            frame = this.gifData[2][this.gifData[2].length - 1],
            self = this;
        //사이즈 업데이트
        var SCALE_FACTOR = 1024,
            scaled_xstep = SCALE_FACTOR * xfactor + 0.5,
            scaled_ystep = SCALE_FACTOR * yfactor + 0.5;
        new_left = (scaled_xstep * image.left) >> 10;
        new_top = (scaled_ystep * image.top) >> 10;
        new_right = (scaled_xstep * (image.left + image.width)) >> 10;
        new_bottom = (scaled_ystep * (image.top + image.height)) >> 10;
        newW = new_right - new_left;
        newH = new_bottom - new_top;
        if (newW === 0) {
            newW = 1;
            new_right = new_left + 1;
        }
        if (newH === 0) {
            newH = 1;
            new_bottom = new_top + 1;
        }
        frame.data = frame.data.dataReplace(1, 2, intToStr(new_left, true, 2));
        frame.data = frame.data.dataReplace(3, 2, intToStr(new_top, true, 2));
        frame.data = frame.data.dataReplace(5, 2, intToStr(newW, true, 2));
        frame.data = frame.data.dataReplace(7, 2, intToStr(newH, true, 2));
        //사이즈 업데이트 끝
        function scaling() {
            var i,
                j,
                result = [],
                cursor,
                scaled_new_y = scaled_ystep * image.top,
                scaled_new_x,
                new_y = new_top,
                new_x,
                pixels = self.pixels;
            for (j = 0; j < image.height; j++) {
                var x_delta,
                    y_delta,
                    yinc,
                    in_line = pixels.slice(j * image.width, (j + 1) * image.width);
                scaled_new_y += scaled_ystep;
                if (j === image.height - 1) scaled_new_y = new_bottom << 10;
                if (scaled_new_y < (new_y + 1) << 10) continue;
                y_delta = (scaled_new_y - (new_y << 10)) >> 10;
                new_x = new_left;
                scaled_new_x = scaled_xstep * image.left;
                cursor = (new_y - new_top) * newW + (new_x - new_left);
                for (i = 0; i < image.width; i++) {
                    scaled_new_x += scaled_xstep;
                    if (i === image.width - 1) scaled_new_x = new_right << 10;
                    x_delta = (scaled_new_x - (new_x << 10)) >> 10;
                    for (; x_delta > 0; new_x++, x_delta--, cursor++)
                        for (yinc = 0; yinc < y_delta; yinc++) result[cursor + yinc * newW] = in_line[i];
                }
                new_y += y_delta;
            }
            return result;
        }

        this.pixels = scaling(); //scale 알고리즘 시작
        result = this.imageDataEncode(newW, newH, i);
        for (j = 0; j < result.length; j++) {
            str += String.fromCharCode(result[j]);
        }
        this.gifData[3][i].data = str;
    };
    GIF.prototype.findTableRGB = function (r, g, b) {
        var c = b | (g << 8) | (r << 16),
            minpos = 0,
            len = this.curCT.length,
            r2,
            g2,
            b2,
            ct = this.curCT,
            i,
            closestM,
            curMin = 256 * 256 * 256,
            index = 0;
        for (i = 0; i < len; i++) {
            r2 = r - ct[i][0];
            g2 = g - ct[i][1];
            b2 = b - ct[i][2];
            closestM = r2 * r2 + g2 * g2 + b2 * b2;
            if (closestM < curMin) {
                curMin = closestM;
                index = i;
            }
        }
        return index;
    };
    GIF.prototype.make = function () {
        var gifData = this.gifData[2],
            i,
            ct,
            frame;
        function ctToStr(ct) {
            var str = "",
                i,
                j;
            for (i = 0; i < ct.length; i++) {
                str += String.fromCharCode(ct[i][0]);
                str += String.fromCharCode(ct[i][1]);
                str += String.fromCharCode(ct[i][2]);
            }
            return str;
        }
        this.data = this.data.substr(0, 13);

        this.dataReplace(6, 8, intToStr(this.scaleWidth, true, 2));
        this.dataReplace(8, 10, intToStr(this.scaleHeight, true, 2));

        if (this.gct) {
            this.data += ctToStr(this.gct);
        }
        for (i = 0; i < gifData.length; i++) {
            if (gifData[i].data) {
                this.data += gifData[i].data;
            } else {
                this.data += gifData[i];
            }
            if (gifData[i].type === "desc") {
                console.log("아?");
                frame = this.gifData[3][gifData[i].frame];
                if ((ct = frame.lct)) {
                    this.data += ctToStr(ct);
                }
                this.data += frame.data;
            }
        }
        this.data += String.fromCharCode(59); //3B
    };
    function subHexStr(data, cursor, length) {
        return stringToHex(data.substr(cursor, length));
    }
    //직접 GIF 분석해서 만든거(힘들었다)
    function GIF(imData, rW, rH) {
        this.gifData = [[], {}, [], []];
        this.cursor = 0;
        this.cursor2 = 0;
        var nImBlock,
            nImData,
            byteSize,
            gifSize,
            curFrame = 0,
            imageCount = 0; //애니메이션된 이미지의경우 현재 몇번째 이미지를 가리키고있는지 체크
        if (/data:image\/gif;base64,/.test(imData.substr(0, 22))) {
            try {
                imData = atob(imData.substr(22));
            } catch (e) {
                return false;
            }
        } else if (/data:application\/octec-stream;base64,/.test(imData.substr(0, 37))) {
            try {
                imData = atob(imData.substr(37));
            } catch (e) {
                return false;
            }
        }
        this.data = nImData = imData;
        function subHex(cursor, length) {
            return subHexStr(nImData, cursor, length);
        }
        function dataSplice() {
            nImData = nImData.substr(this.cursor2);
            this.cursor2 = 0;
        }

        if (this.isgifHeaderB(imData)) {
            // header block이 gif이면
            gifSize = this.data.length;
            if ((nImBlock = subHex(this.cursor2, 2)) !== "2f2a" && gifSize <= HSset.image.maxSize && gifSize > 0) {
                this.width = hexStringToint(nImBlock, true);
                this.moveCursor(2);
                this.height = hexStringToint(subHex(this.cursor2, 2), true);
                this.moveCursor(2);
                //이미지 리사이징 사이즈 미리 캡쳐
                if ((rW && rH) || this.width > HSset.image.maxImageWidth || this.height > HSset.image.maxImageHeight) {
                    var resize = true;
                    if (rW) {
                        this.scaleWidth = rW;
                        this.scaleHeight = rH;
                    } else {
                        var factor;
                        if (this.width > HSset.image.maxImageWidth) {
                            this.scaleWidth = HSset.image.maxImageWidth;
                            factor = this.scaleWidth / this.width;
                            this.scaleHeight = this.height * factor;

                            if (this.scaleHeight > HSset.image.maxImageHeight) {
                                var oldHeight = this.scaleHeight;
                                this.scaleHeight = HSset.image.maxImageHeight;
                                factor = this.scaleHeight / oldHeight;
                                this.scaleWidth *= factor;
                            }
                        } else if (this.height > HSset.image.maxImageHeight) {
                            this.scaleHeight = HSset.image.maxImageHeight;
                            factor = this.scaleHeight / this.height;
                            this.scaleWidth = this.width * factor;
                        }
                    }
                    this.scaleWidth = Math.floor(this.scaleWidth);
                    this.scaleHeight = Math.floor(this.scaleHeight);
                }

                nImBlock = subHex(this.cursor2, 1);
                this.gifData[0].push(this.data.substr(this.cursor2, 3));
                this.moveCursor(3); //GCT시작지점으로 이동
                if (hexStringTobit(nImBlock).charAt(0) === "1") {
                    //global color table 유무체크
                    this.gct = this.getGCT();
                }
                dataSplice.call(this);
                while ((nImBlock = subHex(this.cursor2, 1)) !== "3b" && this.cursor <= gifSize) {
                    //종료코드3B가 나올때까지 반복
                    if (nImBlock === "21") {
                        this.moveCursor(1);
                        if ((nImBlock = subHex(this.cursor2, 1)) === "f9") {
                            //graphic control extension 진행
                            this.moveCursor(1);
                            if ((nImBlock = subHex(this.cursor2, 1)) === "04") {
                                // gce필드는 21 f9 04로 시작해야한다.
                                this.gifData[2][this.gifData[2].length] = {
                                    type: "GCE",
                                    frame: curFrame,
                                    data: this.data.substr(this.cursor - 2, 8),
                                };
                                this.gifData[3][imageCount] = {};
                                this.moveCursor(1);
                                this.gifData[3][imageCount].pField = this.cursor; //packedField를 가리키는 위치 저장
                                this.moveCursor(1);
                                this.gifData[3][imageCount].delay = this.cursor; //다음 이미지로 넘어갈때 걸리는 delay를 지정하는 hex 위치 저장
                                this.moveCursor(3);
                                if (subHex(this.cursor2, 1) !== "00") {
                                    //8번째 byte가 terminate hex인지 체크
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else if (nImBlock === "fe" || nImBlock === "01") {
                            //자잘한 이미지에들어가는 내용
                            this.moveCursor(1);
                            nImBlock = subHex(this.cursor2, 1);
                            this.moveCursor(1);
                            byteSize = hexStringToint(nImBlock);
                            this.gifData[2].push(nImData.substr(this.cursor2 - 3, byteSize + 3));
                            this.moveCursor(byteSize);
                            while ((nImBlock = subHex(this.cursor2, 1)) !== "00") {
                                //terminate block이 나올때까지 반복
                                this.moveCursor(1);
                                byteSize = hexStringToint(nImBlock);
                                this.gifData[2][this.gifData[2].length - 1] += nImData.substr(
                                    this.cursor2 - 1,
                                    byteSize + 1
                                );
                                this.moveCursor(byteSize);
                            }
                            this.gifData[2][this.gifData[2].length - 1] += String.fromCharCode(0);
                        } else if (nImBlock === "ff") {
                            //application extension block
                            this.moveCursor(1);
                            if (stringToHex(nImData.substr(this.cursor2, 14)) === "0b4e45545343415045322e300301") {
                                this.gifData[2][this.gifData[2].length] = {
                                    type: "applicationExt",
                                    data: this.data.substr(this.cursor - 2, 19),
                                };
                                this.moveCursor(14); //애니메이션된 이미지인 경우 몇번 반복할지 지정하는 hex값으로 이동 (0일시 무한반복)
                                this.gifData[1].repeat = this.cursor; //repeat 코드위치 저장
                                this.moveCursor(2);
                            } else {
                                byteSize = hexStringToint(subHex(this.cursor2, 1));
                                this.moveCursor(1);
                                this.gifData[2].push(nImData.substr(this.cursor2 - 3, byteSize + 3));
                                this.moveCursor(byteSize);
                                while ((nImBlock = subHex(this.cursor2, 1)) !== "00") {
                                    this.moveCursor(1);
                                    byteSize = hexStringToint(nImBlock);
                                    this.gifData[2][this.gifData[2].length - 1] += nImData.substr(
                                        this.cursor2 - 1,
                                        byteSize + 1
                                    );
                                    this.moveCursor(byteSize);
                                }
                                this.gifData[2][this.gifData[2].length - 1] += String.fromCharCode(0);
                            }
                        }
                    } else if (nImBlock === "2c") {
                        //image descriptor 진행
                        this.gifData[2][this.gifData[2].length] = {
                            type: "desc",
                            frame: curFrame++,
                            data: this.data.substr(this.cursor, 10),
                        };
                        this.moveCursor(1);
                        //this.gifData[3][imageCount]={};
                        this.gifData[3][imageCount].left = hexStringToint(subHexStr(this.data, this.cursor, 2), true); //그리기 시작하는 위치지정
                        this.moveCursor(2);
                        this.gifData[3][imageCount].top = hexStringToint(subHexStr(this.data, this.cursor, 2), true);
                        this.moveCursor(2);
                        this.gifData[3][imageCount].width = hexStringToint(subHexStr(this.data, this.cursor, 2), true); //그리기 시작하는 위치로부터 그려지는 사이즈 지정
                        this.moveCursor(2);
                        this.gifData[3][imageCount].height = hexStringToint(subHexStr(this.data, this.cursor, 2), true);
                        this.moveCursor(2);
                        this.gifData[3][imageCount].descPField = this.cursor; //local color table의 유무와 몇가지 정보가 들어있는 field
                        nImBlock = subHex(this.cursor2, 1);
                        if (hexStringTobit(nImBlock).charAt(0) === "1") {
                            //local color table 유무체크
                            gctSize = (1 << (parseInt(hexStringToPartbit(nImBlock, 5, 7), 2) + 1)) * 3;
                            this.getLCT(gctSize);
                        } else {
                            this.moveCursor(1);
                        }

                        //이제부터 진짜 LZW압축된 image data가 나온다.
                        this.gifData[3][imageCount].data = nImData.substr(this.cursor2, 1); //LZW minimum code 저장
                        this.moveCursor(1);
                        while ((nImBlock = subHex(this.cursor2, 1)) !== "00") {
                            byteSize = hexStringToint(nImBlock);
                            this.gifData[3][imageCount].data += nImData.substr(this.cursor2, byteSize + 1);
                            this.moveCursor(byteSize + 1);
                        }

                        if (resize) {
                            this.imageDecode(imageCount);
                            this.scaleImage(imageCount);
                        }

                        imageCount++;
                    }
                    this.moveCursor(1);
                }
            }
        }
        if (resize) this.make();
        this.data = "data:application/octec-stream;base64," + btoa(this.data);
        //this.data="data:image/gif;base64,"+btoa(this.data);
        this.pixels = undefined;
        this.newData = undefined;
        this.gct = undefined;
        this.gifData = undefined;
        this.cursor = undefined;
        this.cursor2 = undefined;
    }

    //이미지 관련 끝
    //컬러피커 시작
    function rgbTohsb() {
        var r, g, b, h, s, v, min, delta;
        if (arguments.length === 1) {
            (r = arguments[0].r), (g = arguments[0].g), (b = arguments[0].b);
        } else {
            (r = arguments[0]), (g = arguments[1]), (b = arguments[2]);
        }
        if (r > g) {
            v = Math.max(r, b);
            min = Math.min(g, b);
        } else {
            v = Math.max(g, b);
            min = Math.min(r, b);
        }
        delta = v - min;
        if (v == 0.0) {
            s = 0.0;
        } else {
            s = delta / v;
        }
        if (s == 0.0) {
            h = 0.0;
        } else {
            if (r == v) {
                h = (60.0 * (g - b)) / delta;
            } else if (g == v) {
                h = 120 + (60.0 * (b - r)) / delta;
            } else {
                h = 240 + (60.0 * (r - g)) / delta;
            }
            if (h < 0.0) {
                h += 360.0;
            }
            if (h > 360.0) {
                h -= 360.0;
            }
        }
        h = h;
        s = s * 100.0;
        v = (v / 255.0) * 100.0;
        if (h == 360) {
            h = 0;
        }
        return { h: h, s: s, b: v };
    }
    hsbTorgb = function () {
        if (arguments.length === 1) {
            hue = arguments[0].h;
            saturation = arguments[0].s;
            value = arguments[0].b;
        } else {
            hue = arguments[0];
            saturation = arguments[1];
            value = arguments[2];
        }
        saturation = (saturation / 100.0) * 255.0;
        value = (value / 100.0) * 255.0;
        var h, s, v, h_temp;
        var f, p, q, t;
        var i;
        if (saturation === 0) {
            hue = value;
            saturation = value;
            value = value;
        } else {
            h = hue;
            s = saturation / 255.0;
            v = value / 255.0;
            if (h == 360) {
                h_temp = 0;
            } else {
                h_temp = h / 60;
            }
            i = Math.floor(h_temp);
            f = h_temp - i;
            vs = v * s;
            p = value - value * s;
            switch (i) {
                case 0:
                    t = v - vs * (1 - f);
                    hue = Math.round(value);
                    saturation = Math.round(t * 255.0);
                    value = Math.round(p);
                    break;
                case 1:
                    q = v - vs * f;
                    hue = Math.round(q * 255.0);
                    saturation = Math.round(value);
                    value = Math.round(p);
                    break;
                case 2:
                    t = v - vs * (1 - f);
                    hue = Math.round(p);
                    saturation = Math.round(value);
                    value = Math.round(t * 255.0);
                    break;
                case 3:
                    q = v - vs * f;
                    hue = Math.round(p);
                    saturation = Math.round(q * 255.0);
                    value = Math.round(value);
                    break;
                case 4:
                    t = v - vs * (1 - f);
                    hue = Math.round(t * 255.0);
                    saturation = Math.round(p);
                    value = Math.round(value);
                    break;
                case 5:
                    q = v - vs * f;
                    hue = Math.round(value);
                    saturation = Math.round(p);
                    value = Math.round(q * 255.0);
                    break;
            }
        }
        return { r: hue, g: saturation, b: value };
    };
    function hex(v) {
        v = parseInt(v).toString(16);
        return v.length < 2 ? "0" + v : v;
    }
    function ColorPicker(picker) {
        this.createColorPicker(picker);
    }
    ColorPicker.prototype.createColorPicker = function (picker) {
        var self = this,
            paletteDownFun,
            paletteMoveFun,
            paletteUpFun,
            barDownFun,
            barMoveFun,
            barUpFun,
            ctx,
            colorBar,
            palette,
            wrap,
            paletteHTML =
                "<div id='hs-picker'><div id='hs-palette-picker' class='hs-palette'></div>" +
                "<div id='hs-palette-cover' class='hs-palette' style='background:url(\"" +
                HSset.assetsPath.image +
                "color_palette.png\");'></div><div id='hs-palette-pick'></div></div>" +
                "<div id='hs-color-set'><div id='hs-color-offsetPreview'><div id='hs-color-preview-wrap'><div id='hs-color-preview'></div></div>" +
                "<input type='text' id='hs-color-offset'/></div><div id='hs-color-value-wrap'>" +
                "<div id='hs-color-rgb' class='hs-col-val-wrap'><div id='hs-rgb-r'><label class='hs-mini-text hs-left hs-size1'>R</label><input type='text' class='hs-input hs-left'/></div>" +
                "<div id='hs-rgb-g'><label class='hs-mini-text hs-left hs-size1'>G</label><input type='text' class='hs-input hs-left'/></div>" +
                "<div id='hs-rgb-b'><label class='hs-mini-text hs-left hs-size1'>B</label><input type='text' class='hs-input hs-left'/></div></div>" +
                "<div id='hs-color-hsb' class='hs-col-val-wrap'><div id='hs-hsb-h'><label class='hs-mini-text hs-left hs-size1'>H</label><input type='text' class='hs-input hs-left'/></div>" +
                "<div id='hs-hsb-s'><label class='hs-mini-text hs-left hs-size1'>S</label><input type='text' class='hs-input hs-left'/></div>" +
                "<div id='hs-hsb-b'><label class='hs-mini-text hs-left hs-size1'>B</label><input type='text' class='hs-input hs-left'/></div></div>" +
                "</div><div class='hs-submit-wrap'><div class='hs-button hs-submit'>적용</div><div class='hs-button hs-cancel'>취소</div></div></div><canvas id='hs-color-bar' width='255' height='10'></canvas>",
            offsetReg = /[^#a-f\d]/i,
            valueReg = /[^0-9]/;
        wrap = document.createElement("div");
        HSedit.addClass(wrap, "hs-color-picker-wrap");
        wrap.innerHTML = paletteHTML;
        picker.appendChild(wrap);
        this.wrap = wrap;
        this.picker = wrap.children[0].children[0];
        var ctx,
            colorBar = HS.find(picker, "#hs-color-bar"),
            palette = HS.find(picker, "#hs-palette-cover");
        ctx = colorBar.getContext("2d");
        this.palette = {
            cur: palette.nextElementSibling,
            x: 254,
            y: 0,
        };

        this.bar = {
            canvas: colorBar,
            rgb: {
                r: 255,
                g: 0,
                b: 0,
            },
        };
        this.preview = {
            offset: HS.find(picker, "#hs-color-offset", 1),
            rgb: {
                r: HS.find(picker, "#hs-rgb-r").children[1],
                g: HS.find(picker, "#hs-rgb-g").children[1],
                b: HS.find(picker, "#hs-rgb-b").children[1],
            },
            hsb: {
                h: HS.find(picker, "#hs-hsb-h").children[1],
                s: HS.find(picker, "#hs-hsb-s").children[1],
                b: HS.find(picker, "#hs-hsb-b").children[1],
            },
        };
        this.palette.cur.style.left = "254px";
        this.changeColor({ r: 255, g: 0, b: 0 });
        var grd = ctx.createLinearGradient(0, 0, 255, 10);
        grd.addColorStop(0, "#ff0000");
        grd.addColorStop(0.166, "#ffff00");
        grd.addColorStop(0.333, "#00ff00");
        grd.addColorStop(0.5, "#00ffff");
        grd.addColorStop(0.666, "#0000ff");
        grd.addColorStop(0.834, "#ff00ff");
        grd.addColorStop(1, "#ff0000");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 255, 10);

        paletteDownFun = function (e) {
            if (e.which === 1) {
                e.preventDefault();
                var frames, rgb;
                self.x = e.screenX;
                self.y = e.screenY;
                self.palette.offX = e.offsetX;
                self.palette.offY = e.offsetY;
                self.palette.cur.style.left = e.offsetX + "px";
                self.palette.cur.style.top = e.offsetY + "px";
                rgb = self.getColor(e.offsetX, e.offsetY);
                self.changeColor(rgb);
                frames = document.getElementsByTagName("iframe");
                document.addEventListener("mousemove", paletteMoveFun);
                document.addEventListener("mouseup", paletteUpFun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.addEventListener("mousemove", paletteMoveFun);
                    frames[i].contentDocument.addEventListener("mouseup", paletteUpFun);
                }
            }
        };
        paletteMoveFun = function (e) {
            self.paletChange(e.screenX, e.screenY);
        };
        paletteUpFun = function (e) {
            var frames;
            self.paletChange(e.screenX, e.screenY);
            frames = document.getElementsByTagName("iframe");
            document.removeEventListener("mousemove", paletteMoveFun);
            document.removeEventListener("mouseup", paletteUpFun);
            for (i = 0; i < frames.length; i++) {
                frames[i].contentDocument.removeEventListener("mousemove", paletteMoveFun);
                frames[i].contentDocument.removeEventListener("mouseup", paletteUpFun);
            }
        };
        barDownFun = function (e) {
            if (e.which === 1) {
                e.preventDefault();
                var i, frames, pix;
                self.x = e.screenX;
                self.y = e.screenY;
                self.offX = e.offsetX;
                self.offY = e.offsetY;
                pix = hsbTorgb(self.barGetColor(e.offsetX), 100, 100);
                self.pickerColorChange(pix);

                rgb = self.getColor(self.palette.x, self.palette.y);
                self.changeColor(rgb);
                frames = document.getElementsByTagName("iframe");
                document.addEventListener("mousemove", barMoveFun);
                document.addEventListener("mouseup", barUpFun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.addEventListener("mousemove", barMoveFun);
                    frames[i].contentDocument.addEventListener("mouseup", barUpFun);
                }
            }
        };
        barMoveFun = function (e) {
            var pix,
                moveX = (e.screenX - self.x) / window.devicePixelRatio,
                moveY = (e.screenY - self.y) / window.devicePixelRatio,
                x,
                y,
                rgb;
            x = self.offX + moveX;
            y = self.offY + moveY;
            if (x < 0) {
                x = 0;
            } else if (x > 254) {
                x = 254;
            }
            if (y < 0) {
                y = 0;
            } else if (y > 9) {
                y = 9;
            }
            pix = hsbTorgb(self.barGetColor(x), 100, 100);
            self.pickerColorChange(pix);
            rgb = self.getColor(self.palette.x, self.palette.y);
            self.changeColor(rgb);
        };
        barUpFun = function (e) {
            var frames;
            frames = document.getElementsByTagName("iframe");
            document.removeEventListener("mousemove", barMoveFun);
            document.removeEventListener("mouseup", barUpFun);
            for (i = 0; i < frames.length; i++) {
                frames[i].contentDocument.removeEventListener("mousemove", barMoveFun);
                frames[i].contentDocument.removeEventListener("mouseup", barUpFun);
            }
        };
        offsetChange = function () {
            var value = this.value,
                plus,
                i,
                rgb;
            if (
                offsetReg.test(value) ||
                (value.charAt(0) === "#" && (value.length > 7 || value.length < 4)) ||
                (value.charAt(0) !== "#" && (value.length > 6 || value.length < 3))
            ) {
                var offset = "#" + hex(self.cur.rgb.r) + hex(self.cur.rgb.g) + hex(self.cur.rgb.b);
                self.cur.offset = offset;
                self.preview.offset.value = offset;
                return;
            } else if (value.charAt(0) === "#") {
                if (value.length !== 7) {
                    plus = value.charAt(value.length - 1);
                    for (i = value.length; i < 7; i++) {
                        value = value.concat(plus);
                    }
                }
            } else {
                if (value.length !== 6) {
                    plus = value.charAt(value.length - 1);
                    for (i = value.length; i < 6; i++) {
                        value = value.concat(plus);
                    }
                }
                value = "#".concat(value);
            }
            this.value = value;
            rgb = {
                r: parseInt(value.substr(1, 2), 16),
                g: parseInt(value.substr(3, 2), 16),
                b: parseInt(value.substr(5, 2), 16),
            };
            self.changeColor(rgb);
            self.changeLeft(rgb);
        };
        rgbChange = function () {
            var value = parseInt(this.value);
            if (valueReg.test(value)) {
                self.previewChange(self.cur.rgb);
                return;
            } else if (
                this.parentNode.parentNode.id === "hs-color-rgb" &&
                (parseInt(value) > 255 || parseInt(value) < 0)
            ) {
                self.previewChange(self.cur.rgb);
                return;
            } else if (
                (this.parentNode.id === "hs-hsb-s" || this.parentNode.id === "hs-hsb-b") &&
                (parseInt(value) > 100 || parseInt(value) < 0)
            ) {
                self.previewChange(self.cur.rgb);
                return;
            } else if (this.parentNode.id === "hs-hsb-h" && (parseInt(value) > 360 || parseInt(value) < 0)) {
                self.previewChange(self.cur.rgb);
                return;
            }
            var id = this.parentNode.id;
            if (id === "hs-rgb-r") {
                self.cur.rgb.r = value;
            } else if (id === "hs-rgb-g") {
                self.cur.rgb.g = value;
            } else if (id === "hs-rgb-b") {
                self.cur.rgb.b = value;
            } else if (id === "hs-hsb-h") {
                if (value === 360) {
                    value = this.value = 0;
                }
                self.cur.hsb.h = value;
            } else if (id === "hs-hsb-s") {
                self.cur.hsb.s = value;
            } else if (id === "hs-hsb-b") {
                self.cur.hsb.b = value;
            }
            if (this.parentNode.parentNode.id === "hs-color-hsb") {
                self.cur.rgb = hsbTorgb(self.cur.hsb);
            }
            self.changeColor(self.cur.rgb);
            self.changeLeft(self.cur.rgb);
        };
        palette.addEventListener("mousedown", paletteDownFun);
        colorBar.addEventListener("mousedown", barDownFun);
        this.preview.offset.addEventListener("focusout", offsetChange);
        this.preview.rgb.r.addEventListener("focusout", rgbChange);
        this.preview.rgb.g.addEventListener("focusout", rgbChange);
        this.preview.rgb.b.addEventListener("focusout", rgbChange);
        this.preview.hsb.h.addEventListener("focusout", rgbChange);
        this.preview.hsb.s.addEventListener("focusout", rgbChange);
        this.preview.hsb.b.addEventListener("focusout", rgbChange);
    };
    ColorPicker.prototype.barGetColor = function (x) {
        return Math.round((x / (this.bar.canvas.clientWidth - 1)) * 360.0);
    };
    ColorPicker.prototype.getColor = function (x, y) {
        var r = this.bar.rgb.r,
            g = this.bar.rgb.g,
            b = this.bar.rgb.b,
            w = this.picker.clientWidth,
            h = this.picker.clientHeight,
            perX = x / w,
            perY = y / h;
        r = 255 - ((255 - r) / (w - 1)) * x;
        g = 255 - ((255 - g) / (w - 1)) * x;
        b = 255 - ((255 - b) / (w - 1)) * x;
        r = r - r * (y / (h - 1));
        g = g - g * (y / (h - 1));
        b = b - b * (y / (h - 1));
        return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
    };
    ColorPicker.prototype.changeColor = function (rgb) {
        var hsv,
            preview = HS.find(this.wrap, "#hs-color-preview");
        hsb = rgbTohsb(rgb);
        this.cur = {
            rgb: {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b,
            },
            hsb: {
                h: hsb.h,
                s: hsb.s,
                b: hsb.b,
            },
        };
        preview.style.backgroundColor = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
        this.previewChange(rgb);
    };
    ColorPicker.prototype.changeLeft = function (rgb, option) {
        var hsb,
            save,
            pal = this.palette;
        if (option) {
            save = rgb;
            if (option === "r") {
                rgb = this.cur.rgb;
                rgb.r = save;
            } else if (option === "g") {
                rgb = this.cur.rgb;
                rgb.g = save;
            } else if (option === "b") {
                rgb = this.cur.rgb;
                rgb.b = save;
            } else if (option === "h") {
                hsb = this.cur.hsb;
                hsb.h = save;
            } else if (option === "s") {
                hsb = this.cur.hsb;
                hsb.s = save;
            } else if (option === "b") {
                hsb = this.cur.hsb;
                hsb.b = save;
            }
        }
        if (hsb) {
            rgb = hsbTorgb(hsb);
        } else {
            hsb = rgbTohsb(rgb);
        }

        this.pickerColorChange(hsbTorgb(hsb.h, 100, 100), hsb);
        x = Math.round((hsb.s / 100.0) * this.picker.clientWidth - 1);
        y = this.picker.clientHeight - 1 - Math.round((hsb.b / 100.0) * this.picker.clientHeight - 1);
        pal.cur.style.left = x + "px";
        pal.cur.style.top = y + "px";
        pal.x = x;
        pal.y = y;
    };
    ColorPicker.prototype.pickerColorChange = function (backrgb, hsb) {
        var x, y;
        this.picker.style.backgroundColor = "rgb(" + backrgb.r + "," + backrgb.g + "," + backrgb.b + ")";
        this.bar.rgb = {
            r: backrgb.r,
            g: backrgb.g,
            b: backrgb.b,
        };
    };
    ColorPicker.prototype.paletChange = function (scrX, scrY) {
        var x,
            y,
            moveX = scrX - this.x,
            moveY = scrY - this.y,
            rgb,
            pal = this.palette;
        x = pal.offX + moveX / window.devicePixelRatio;
        y = pal.offY + moveY / window.devicePixelRatio;
        if (x < 0) {
            x = 0;
        } else if (x > this.picker.clientWidth - 1) {
            x = 254;
        }
        if (y < 0) {
            y = 0;
        } else if (y > this.picker.clientHeight - 1) {
            y = 169;
        }
        rgb = this.getColor(x, y);
        this.changeColor(rgb);
        pal.cur.style.left = x + "px";
        pal.cur.style.top = y + "px";
        pal.x = x;
        pal.y = y;
    };
    ColorPicker.prototype.previewChange = function (rgb) {
        var r = rgb.r,
            g = rgb.g,
            b = rgb.b;
        var offset = "#" + hex(r) + hex(g) + hex(b);
        this.cur.offset = offset;
        this.preview.offset.value = offset;
        this.preview.rgb.r.value = r;
        this.preview.rgb.g.value = g;
        this.preview.rgb.b.value = b;
        this.preview.hsb.h.value = Math.round(this.cur.hsb.h);
        this.preview.hsb.s.value = Math.round(this.cur.hsb.s);
        this.preview.hsb.b.value = Math.round(this.cur.hsb.b);
    };
    //컬러피커 끝

    HSedit.extend({
        changeSize: function (size) {
            return (size / 1024 / 1024).toFixed(2);
        },
        isArrayEqual: function (a, b) {
            var i,
                equal = true;
            if (a.length === b.length) {
                for (i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) {
                        equal = false;
                        break;
                    }
                }
            } else {
                equal = false;
            }
            return equal;
        },
        isArray: function (a) {
            return Array.isArray(a);
        },
        split: function (a, option) {
            if (HSedit.trim(a) !== "") {
                var b = a.split(option);
                for (var i = 0; i < b.length; i++) {
                    b[i] = HSedit.trim(b[i]);
                    if (b[i] === "") {
                        b.splice(i, 1);
                    }
                }
                return b;
            } else {
                return false;
            }
        },
        domMake: function (desc) {
            var name = desc[0],
                attributes = desc[1],
                el = document.createElement(name),
                start = 1,
                i;
            if (typeof attributes === "object" && attributes !== null && !HSedit.isArray(attributes)) {
                for (var attr in attributes) {
                    if (attr === "class") {
                        HSedit.addClass(el, attributes[attr]);
                    } else {
                        el.setAttribute(attr, attributes[attr]);
                    }
                }
                start = 2;
            }
            for (i = start; i < desc.length; i++) {
                if (HSedit.isArray(desc[i])) {
                    el.appendChild(HSedit.domMake(desc[i]));
                } else {
                    el.appendChild(document.createTextNode(desc[i]));
                }
            }
            return el;
        },
        //
        contains: function (a, b) {
            //compareDocumentPosition = contains Support차이 a에 b가있는지 체크
            var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
            return (
                a === bup ||
                !!(
                    bup &&
                    bup.nodeType === 1 &&
                    (adown.contains
                        ? adown.contains(bup)
                        : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16)
                )
            );
        },
        isInclude: function (a, b) {
            if (a === b || HSedit.contains(a, b)) {
                return true;
            }
            return false;
        },
        domProcess: function (target, node, callBack) {
            var dumNode,
                i = 0;
            if (typeof node === "string") {
                dumNode = target.ownerDocument.createElement("div");
                dumNode.innerHTML = node;
                while ((node = dumNode.childNodes[0])) {
                    callBack(target, node);
                }
            } else {
                callBack(target, node);
            }
        },
        before: function (target, node) {
            HSedit.domProcess(target, node, function (target, node) {
                target.parentNode.insertBefore(node, target);
            });
        },
        after: function (target, node) {
            HSedit.domProcess(target, node, function (target, node) {
                target.parentNode.insertBefore(node, target.nextSibling);
            });
        },
        first: function (target, node) {
            HSedit.domProcess(target, node, function (target, node) {
                target.insertBefore(node, target.firstChild);
            });
        },
        globalEvent: function (type, fun, type2) {
            var frames, i;
            frames = document.getElementsByTagName("iframe");
            if (type2) {
                document.addEventListener(type, fun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.addEventListener(type, fun);
                }
            } else {
                document.removeEventListener(type, fun);
                for (i = 0; i < frames.length; i++) {
                    frames[i].contentDocument.removeEventListener(type, fun);
                }
            }
        },
        getCurWin: function () {
            var editors = HS.find(this.ownerDocument, "hsedit");
            for (var i = 0; i < editors.length; i++) {
                if (HSedit.contains(editors[i], this)) {
                    return editors[i].children[1].children[0].contentWindow;
                }
            }
        },
        setNodeToText: function (node, type) {
            var newNode;
            newNode = node.ownerDocument.createElement("p");
            if (type === 1) {
                node.parentNode.insertBefore(newNode, node);
            } else {
                node.parentNode.insertBefore(newNode, node.nextSibling);
            }
            newNode.appendChild(node);
            return newNode;
        },
        getRange: function (win) {
            if (!win.range) {
                sel = win.getSelection();
                if (sel && sel.rangeCount > 0) {
                    return sel.getRangeAt(0);
                }
            } else {
                return win.range;
            }
        },
        isBody: function (node) {
            return node.tagName && node.tagName === "BODY";
        },
        pushRemember: function (win, rem, html, plus, key) {
            var sel, range;
            if (!win.range) {
                sel = win.getSelection();
                if (sel && sel.rangeCount > 0) {
                    range = sel.getRangeAt(0);
                }
            } else {
                range = win.range;
            }
            rem.stack = rem.cur;
            if (!range) {
                win.document.body.focus();
            }

            if (rem.stack === 20) {
                rem.data.shift();
                rem.stack--;
            }
            range2 = HSrange.getOffsetToRange(win, range);
            if (key) {
                range2.start = range2.end - (range.endOffset - range.startOffset);
                if (ieOn) {
                    range2.start++;
                    range2.end++;
                }
            }

            if (plus) {
                range2.start++;
                range2.end++;
            }
            rem.data[rem.stack] = {
                range: {
                    start: range2.start,
                    end: range2.end,
                    startPar: range2.startPar,
                    endPar: range2.endPar,
                    collapse: range2.collapse,
                },
                html: html,
            };
            rem.stack++;
            rem.cur = rem.stack;
        },
        previousTextNode: function (node) {
            //다음에 만날 textNode를 가져오는 함수
            var saveNode;
            saveNode = node;
            node = node.previousSibling;
            while (!node) {
                node = saveNode.parentNode;
                saveNode = node;
                node = node.previousSibling;
            }
            node = HSedit.getLastTextNode(node);
            return node;
        },
        nextTextNode: function (node) {
            //다음에 만날 textNode를 가져오는 함수
            var saveNode;
            saveNode = node;
            node = node.nextSibling;
            while (!node) {
                node = saveNode.parentNode;
                saveNode = node;
                node = node.nextSibling;
            }
            node = HSedit.getFirstTextNode(node);
            return node;
        },
        getFirstTextNode: function (node) {
            //nodeType이 1일경우 그노드의 첫번째텍스트노드 get
            while (node && node.nodeType === 1) {
                if (node.childNodes.length > 0) {
                    node = node.childNodes[0];
                } else break; //이미지나 동영상인경우
            }
            return node;
        },
        getLastTextNode: function (node) {
            while (node && node.nodeType === 1) {
                node = node.childNodes[node.childNodes.length - 1];
            }
            return node;
        },
        restoreSel: function (win, range) {
            var sel;
            sel = win.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        },
        overlapNodeReplace: function (newNode, type, option) {
            var i, j, node, a;
            i = 0; // 중복 type 노드 제거
            if (newNode) {
                overlapNodes = HS.find(newNode, type);
                if (type === newNode.tagName) {
                    var check;
                    for (i = 0; i < overlapNodes.length; i++) {
                        if (option) {
                            check = HSedit.compareStyleOnlyName(newNode, overlapNodes[i]);
                            if (!check) {
                                overlapNodes.splice(i, 1);
                                i--;
                            } else if (HSedit.isArray(check)) {
                                for (j = 0; j < check.length; j++) {
                                    HSedit.removeStyle(overlapNodes[i], check[j]);
                                }
                                overlapNodes.splice(i, 1);
                                i--;
                            }
                        } else {
                            check = HSedit.compareStyle(newNode, overlapNodes[i]);
                            if (!check) {
                                overlapNodes.splice(i, 1);
                                i--;
                            } else if (HSedit.isArray(check)) {
                                for (j = 0; j < check.length; j++) {
                                    HSedit.removeStyle(overlapNodes[i], check[j]);
                                }
                                overlapNodes.splice(i, 1);
                                i--;
                            }
                        }
                    }
                }
                i = 0;
                while ((node = overlapNodes[i++])) {
                    a = node.parentNode;
                    j = 0;

                    while (node.childNodes[0]) {
                        HSedit.before(node, node.childNodes[0]);
                        if (j === 0 && node.previousSibling.nodeType === 1) {
                            HSedit.previousNodeCombine(node.previousSibling, node.previousSibling.tagName);
                        }
                        if (node.childNodes.length === 0 && node.previousSibling.nodeType === 1) {
                            HSedit.nextNodeCombine(node.previousSibling, node.previousSibling.tagName);
                        }
                        j++;
                    }
                    node.parentNode.removeChild(node);
                    a.normalize();
                }
            }
        },
        tagOnlyRemove: function (nodes) {
            var saveNode;
            i = 0;
            while ((node = nodes.childNodes[0])) {
                HSedit.before(nodes, node);
                //HSedit.previousNodeCombine(node,node.tagName);
            }
            nodes.parentNode.removeChild(nodes);
        },
        trashNodeRemove: function (node, type) {
            var oldNode;
            if (node && node.nodeType === 3 && node.textContent === "") {
                oldNode = node;
                if (type === 0) {
                    node = node.previousSibling;
                } else {
                    node = node.nextSibling;
                }
                oldNode.parentNode.removeChild(oldNode);
            }
            return node;
        },
        getAttributeStyleProperty: function (node) {
            //스타일 and Font태그의 style의 이름,값을 배열로 가져오는 메서드(2차배열)
            var a = node.getAttribute("style"),
                b,
                c = [];
            a ? (a = a.toLowerCase()) : false;
            b = HSedit.split(a, ";");
            if (node.tagName === "FONT") {
                if ((a = node.getAttribute("face"))) {
                    b[b.length] = ("font-family:" + a).toLowerCase();
                }
                if ((a = node.getAttribute("size"))) {
                    b[b.length] = "font-size:-1".toLowerCase();
                }
                if ((a = node.getAttribute("color"))) {
                    b[b.length] = ("color:" + a).toLowerCase();
                }
            }
            return b;
        },
        getAttributeStyleName: function (node) {
            //스타일 and Font태그의 style의 이름만 배열로 가져오는 메서드
            var b = [],
                a = HSedit.getAttributeStyleProperty(node);
            for (var i = 0; i < a.length; i++) {
                b.push(HSedit.split(a[i], ":")[0]);
            }
            return b;
        },
        compareStyle: function (node, node2) {
            //두 노드가 Style(스타일값 포함)이 같은 경우 true;
            if (
                (node.nodeType === 3 && node2.nodeType === 3) ||
                (node.nodeType === 1 &&
                    !node.getAttribute("style") &&
                    node2.nodeType === 1 &&
                    !node2.getAttribute("style")) ||
                (node.nodeType === 1 && !node.getAttribute("style") && node2.nodeType === 3) ||
                (node2.nodeType === 1 && !node2.getAttribute("style") && node.nodeType === 3)
            ) {
                return 2;
            } else if (
                node.nodeType === 1 &&
                node2.nodeType === 1 &&
                node.getAttribute("style") &&
                node2.getAttribute("style")
            ) {
                var i,
                    j,
                    e = [],
                    f = true,
                    a,
                    b,
                    c = [],
                    d = [],
                    styleReg;
                styleReg = /(?:\s*)([^:\s]+)(?:\s*):(?:\s*)([^;]+)(?:\s*);/g;
                while ((a = styleReg.exec(node.getAttribute("style")))) {
                    c.push(a[1], a[2]);
                }
                for (i = 0; i < c.length; i += 2) {
                    for (j = 0; j < c.length && f; j += 2) {
                        if (i === j) {
                            j += 2;
                        }
                        if (c[i] === c[j]) {
                            c.splice(i, 2);
                            f = false;
                            i -= 2;
                            j -= 2;
                        }
                    }
                    f = true;
                }
                while ((b = styleReg.exec(node2.getAttribute("style")))) {
                    d.push(b[1], b[2]);
                }
                for (i = 0; i < d.length; i += 2) {
                    for (j = 0; j < d.length && f; j += 2) {
                        if (i === j) {
                            j += 2;
                        }
                        if (d[i] === d[j]) {
                            d.splice(i, 2);
                            f = false;
                            i -= 2;
                            j -= 2;
                        }
                    }
                    f = true;
                }
                for (var i = 0; i < c.length; i += 2) {
                    for (var j = 0; j < d.length; j += 2) {
                        if (c[i] === d[j] && c[i + 1] === d[j + 1]) {
                            e.push(c[i]);
                        }
                    }
                }

                if (e.length > d.length / 2) {
                    return 1;
                } else if (e.length === d.length / 2) {
                    return 2;
                } else if (e.length < d.length / 2) {
                    return e;
                } else if (e.length === 0) {
                    return false;
                }
            } else {
                return false;
            }
        },
        compareStyleOnlyName: function (node, node2) {
            //두 노드가 Style(스타일값 미포함)이 같은 경우 true;
            var a = HSedit.getAttributeStyleName(node),
                b = HSedit.getAttributeStyleName(node2);
            if (a.length === 0 && b.length === 0) {
                return 2;
            }
            if ((a.length === 0 && b.length !== 0) || (a.length !== 0 && b.length === 0)) {
                return false;
            }
            var i,
                j,
                c = [],
                d = true;
            for (i = 0; i < a.length; i++) {
                for (j = 0; j < b.length; j++) {
                    if (a[i] === b[j]) {
                        c.push(a[i]);
                    }
                }
            }
            for (i = 0; i < c.length; i++) {
                for (j = 0; j < c.length && d; j++) {
                    if (i === j) {
                        j++;
                    }
                    if (c[i] === c[j]) {
                        c.splice(i, 1);
                        d = false;
                        i--;
                        j--;
                    }
                }
                d = true;
            }
            if (c.length > b.length) {
                return 1;
            } else if (c.length === b.length) {
                return 2;
            } else if (c.length < b.length) {
                return c;
            } else if (c.length === 0) {
                return false;
            }
        },
        compareNodeType: function (node, node2, option) {
            //두 노드가 tagName Style(스타일값도포함)까지 같은 경우 true;
            if (
                node.nodeType === 1 &&
                node2.nodeType === 1 &&
                HSedit.compareStyle(node, node2) > 0 &&
                node.tagName === node2.tagName &&
                HSedit.stopChangeTag(node)
            ) {
                if (option === 1) {
                    if (HSedit.compareStyle(node, node2) > 0) {
                        return true;
                    }
                } else if (option === 2) {
                    if (HSedit.compareStyle(node, node2) === 2) {
                        return true;
                    }
                }
            }
            return false;
        },
        stopChangeTag: function (node) {
            return node.tagName !== "IMG" && node.tagName !== "IFRAME" && node.tagName !== "P";
        },
        isParagraphTag: function (node) {
            return (
                node.tagName === "DIV" ||
                node.tagName === "P" ||
                node.tagName === "PRE" ||
                node.tagName === "XMP" ||
                node.tagName === "PLAINTEXT" ||
                node.tagName === "LISTING"
            );
        },
        previousNodeSeparate: function (node, topNode, option) {
            var doc = node.ownerDocument,
                saveNode,
                first = true,
                second = false,
                extendNode,
                saveExtendNode,
                newNode;
            while (node && node !== topNode) {
                saveNode = node.parentNode;
                node = node.previousSibling;
                if (second === true) {
                    saveExtendNode = doc.createElement(saveNode.tagName);
                    if (saveNode.getAttribute("style")) {
                        saveExtendNode.setAttribute("style", saveNode.getAttribute("style"));
                    }
                    if (saveNode.tagName === "FONT") {
                        if ((a = saveNode.getAttribute("face"))) {
                            saveExtendNode.setAttribute("face", a);
                        }
                        if ((a = saveNode.getAttribute("size"))) {
                            saveExtendNode.setAttribute("size", a);
                        }
                        if ((a = saveNode.getAttribute("color"))) {
                            saveExtendNode.setAttribute("color", a);
                        }
                    }
                    HSedit.before(newNode, saveExtendNode);
                    saveExtendNode.appendChild(newNode);
                    newNode = saveExtendNode;
                    second = false;
                }
                if (first === true) {
                    if (node) {
                        newNode = doc.createElement(saveNode.tagName);
                        if (saveNode.getAttribute("style")) {
                            newNode.setAttribute("style", saveNode.getAttribute("style"));
                        }
                        if (saveNode.tagName === "FONT") {
                            if ((a = saveNode.getAttribute("face"))) {
                                newNode.setAttribute("face", a);
                            }
                            if ((a = saveNode.getAttribute("size"))) {
                                newNode.setAttribute("size", a);
                            }
                            if ((a = saveNode.getAttribute("color"))) {
                                newNode.setAttribute("color", a);
                            }
                        }
                        HSedit.before(topNode, newNode);
                        extendNode = node.previousSibling;
                        newNode.appendChild(node);
                        node = extendNode;
                        first = false;
                    }
                }
                while (node) {
                    extendNode = node.previousSibling;
                    if (newNode.childNodes.length !== 0) HSedit.before(newNode.childNodes[0], node);
                    node = extendNode;
                }
                if (first === false) second = true;
                node = saveNode;
            }
            if (option) {
                newNode.style[option.option] = option.value;
            }
        },
        nextNodeSeparate: function (node, topNode, option) {
            var doc = node.ownerDocument,
                saveNode,
                first = true,
                second = false,
                on = false,
                a,
                extendNode,
                saveExtendNode,
                newNode;
            while (node && node !== topNode) {
                saveNode = node.parentNode;
                node = node.nextSibling;
                if (second === true) {
                    saveExtendNode = doc.createElement(saveNode.tagName);
                    if (saveNode.getAttribute("style")) {
                        saveExtendNode.setAttribute("style", saveNode.getAttribute("style"));
                    }
                    if (saveNode.tagName === "FONT") {
                        if ((a = saveNode.getAttribute("face"))) {
                            saveExtendNode.setAttribute("face", a);
                        }
                        if ((a = saveNode.getAttribute("size"))) {
                            saveExtendNode.setAttribute("size", a);
                        }
                        if ((a = saveNode.getAttribute("color"))) {
                            saveExtendNode.setAttribute("color", a);
                        }
                    }
                    HSedit.before(newNode, saveExtendNode);
                    saveExtendNode.appendChild(newNode);
                    newNode = saveExtendNode;
                    second = false;
                }
                if (first === true) {
                    if (node) {
                        newNode = doc.createElement(saveNode.tagName);
                        if (saveNode.getAttribute("style")) {
                            newNode.setAttribute("style", saveNode.getAttribute("style"));
                        }
                        if (saveNode.tagName === "FONT") {
                            if ((a = saveNode.getAttribute("face"))) {
                                newNode.setAttribute("face", a);
                            }
                            if ((a = saveNode.getAttribute("size"))) {
                                newNode.setAttribute("size", a);
                            }
                            if ((a = saveNode.getAttribute("color"))) {
                                newNode.setAttribute("color", a);
                            }
                        }
                        HSedit.after(topNode, newNode);
                        first = false;
                    }
                }
                while (node) {
                    extendNode = node.nextSibling;
                    newNode.appendChild(node);
                    node = extendNode;
                    on = true;
                }
                if (first === false) second = true;
                node = saveNode;
            }
            if (option) {
                newNode.style[option.option] = option.value;
            }
        },
        previousNodeCombine: function (newNode, type, save) {
            var node,
                i = 0,
                child;
            if (newNode.nodeType === 1 && (node = HSedit.trashNodeRemove(newNode.previousSibling, 0))) {
                var rangeOn = true,
                    oldNode,
                    extendNode,
                    saveNode,
                    node2,
                    childNode,
                    rangeNode;
                while (
                    type &&
                    node &&
                    node.tagName === type.toUpperCase() &&
                    HSedit.stopChangeTag(node) &&
                    HSedit.compareStyle(newNode, node) === 2
                ) {
                    child = true;
                    oldNode = node;
                    if (save === "start" && rangeOn) {
                        if (HSrange.start.nodeType === 1) HSrange.start = newNode;
                        else HSrange.start = newNode.firstChild;
                    } else if (save === "end" && rangeOn) {
                        if (HSrange.end.nodeType === 1 && newNode.childNodes[HSrange.endOffset - 1].nodeType === 3) {
                            HSrange.end = newNode.childNodes[HSrange.endOffset - 1];
                        } else if (HSrange.end.nodeType === 3) {
                        } else {
                            var isEndNode = true;
                            HSrange.end = newNode;
                        }
                    }
                    if (isEndNode) {
                        HSrange.end = node;
                        HSrange.endOffset = node.childNodes.length + 1;
                    }

                    saveNode = newNode.firstChild;
                    //while(saveNode=newNode.firstChild){
                    if (rangeOn && save) {
                        //range 확대
                        var childNode, rangeNode;
                        extendNode = oldNode.lastChild; //newNode.previousSibling 보관
                        HSedit.overlapNodeReplace(oldNode, oldNode.tagName);

                        if (saveNode.nodeType === 3) {
                            //newNode의 firstChild가 nodeType=3일경우
                            if (extendNode.nodeType === 3) {
                                if (save === "start" || save === "all") {
                                    HSrange.startOffset += extendNode.textContent.length;
                                    HSrange.start = extendNode;
                                }
                                if (save === "end" || save === "all") {
                                    HSrange.endOffset += extendNode.textContent.length;
                                    HSrange.end = extendNode;
                                }
                            } else rangeOn = false;

                            while (rangeOn && extendNode.previousSibling && extendNode.previousSibling.nodeType === 3) {
                                extendNode = extendNode.previousSibling;
                                if (save === "start") {
                                    HSrange.start = extendNode;
                                    HSrange.startOffset += extendNode.textContent.length;
                                } else if (save === "end") {
                                    HSrange.end = extendNode;
                                    HSrange.endOffset += extendNode.textContent.length;
                                }
                            }
                            oldNode.normalize();
                            extendNode = oldNode.lastChild;
                            if (extendNode.previousSibling && extendNode.previousSibling.nodeType === 1)
                                rangeOn = false;
                        } else if (saveNode.nodeType === 1) {
                            //newNode의 firstChild가 nodeType=1일경우
                            childNode = extendNode; //newNode.previousSibling.lastChild;
                            rangeNode = saveNode; //newNode.firstChild;

                            while (
                                rangeOn && HSedit.compareNodeType(rangeNode, childNode, 2) ? true : (rangeOn = false)
                            ) {
                                if (childNode.nodeType === 1) {
                                    childNode.normalize();
                                    if (
                                        childNode.previousSibling &&
                                        HSedit.compareNodeType(childNode.previousSibling, childNode, 2)
                                    ) {
                                        extendNode = childNode.previousSibling;
                                        HSedit.previousNodeCombine(childNode, childNode.tagName);
                                        childNode = extendNode;
                                    }
                                }
                                if (!childNode.firstChild && !rangeNode.firstChild) {
                                    if (childNode.tagName === "IMG" && rangeNode.tagName === "IMG") {
                                        if (save === "start" || save === "all") {
                                            HSrange.start = oldNode;
                                            HSrange.startOffset = oldNode.childNodes.length;
                                        }
                                        if (save === "end" || save === "all") {
                                            HSrange.end = oldNode;
                                            HSrange.endOffset = oldNode.childNodes.length + 1;
                                        }
                                    }
                                    rangeOn = false;
                                    break;
                                }
                                childNode = childNode.lastChild || childNode;
                                rangeNode = rangeNode.firstChild || rangeNode;
                                if (childNode.nodeType === 3 && rangeNode.nodeType === 3) {
                                    if (save === "start") {
                                        HSrange.start = childNode;
                                        HSrange.startOffset += childNode.textContent.length;
                                    } else if (save === "end") {
                                        HSrange.end = childNode;
                                        HSrange.endOffset += childNode.textContent.length;
                                    }
                                    break;
                                }
                                if (
                                    !HSedit.compareNodeType(childNode, rangeNode, 2) ||
                                    (childNode.nodeType === 1 && rangeNode.nodeType === 3) ||
                                    (childNode.nodeType === 3 && rangeNode.nodeType === 1)
                                ) {
                                    rangeOn = false;
                                }
                            }

                            while (rangeOn && childNode !== saveNode) {
                                if (childNode.previousSibling !== null) {
                                    rangeOn = false;
                                }
                                childNode = childNode.parentNode;
                            }
                        }
                    }

                    i = 0;
                    while ((saveNode = newNode.childNodes[0])) {
                        oldNode.appendChild(saveNode);
                    }
                    oldNode.normalize();
                    //}

                    node2 = oldNode.childNodes;
                    while (node2[i] && node2[i + 1]) {
                        if (HSedit.compareNodeType(node2[i], node2[i + 1], 2) && node2[i].tagName !== "IMG") {
                            HSedit.nextNodeCombine(node2[i], node2[i].tagName);
                        } else i++;
                    }
                    newNode.parentNode.removeChild(newNode);
                    newNode = oldNode;
                    node = HSedit.trashNodeRemove(newNode.previousSibling, 0);
                }
            }

            if (!child) {
                //nextNodeCombine이 한번도 성립되지 않을경우 자기자식검사
                newNode = newNode.childNodes;
                while (newNode[i] && newNode[i + 1]) {
                    //자식들 검사(자식중에도 합칠 노드가있나 검사)
                    if (HSedit.compareNodeType(newNode[i], newNode[i + 1], 2) && newNode[i].tagName !== "IMG") {
                        HSedit.nextNodeCombine(newNode[i], newNode[i].tagName);
                    } else i++;
                }
            }
        },
        nextNodeCombine: function (newNode, type, save) {
            //다음노드의 태그의 스타일과 똑같으면 합체
            var oldNode,
                node,
                child,
                i = 0;
            if (newNode.nodeType === 1 && (node = HSedit.trashNodeRemove(newNode.nextSibling, 1))) {
                while (
                    node &&
                    node.nodeType === 1 &&
                    node.tagName === type.toUpperCase() &&
                    HSedit.stopChangeTag(node) &&
                    HSedit.compareStyle(newNode, node) === 2
                ) {
                    child = true;
                    oldNode = node;
                    while (oldNode.childNodes[0]) {
                        //합침을 당하는 노드쪽에있는 자식들 전부 합치는 노드로 이동
                        newNode.appendChild(oldNode.childNodes[0]);
                        newNode.normalize();
                    }
                    node = HSedit.trashNodeRemove(node.nextSibling, 1);
                    oldNode.parentNode.removeChild(oldNode);

                    oldNode = newNode.childNodes;
                    while (oldNode[i] && oldNode[i + 1]) {
                        //자식들 검사(자식중에도 합칠 노드가있나 검사)
                        if (HSedit.compareNodeType(oldNode[i], oldNode[i + 1], 2) && oldNode[i].tagName !== "IMG") {
                            HSedit.nextNodeCombine(oldNode[i], oldNode[i].tagName);
                        } else i++;
                    }
                }
            }

            if (!child) {
                //nextNodeCombine이 한번도 성립되지 않을경우 자기자식검사
                newNode = newNode.childNodes;
                while (newNode[i] && newNode[i + 1]) {
                    //자식들 검사(자식중에도 합칠 노드가있나 검사)
                    if (HSedit.compareNodeType(newNode[i], newNode[i + 1], 2) && newNode[i].tagName !== "IMG") {
                        HSedit.nextNodeCombine(newNode[i], newNode[i].tagName);
                    } else i++;
                }
            }
        },
        getIncludeNodeAttr: function (node, type, option) {
            var saveNode;
            while (node.parentNode.tagName !== "BODY") {
                node = node.parentNode;
                if (node.tagName === type && node.style[option] !== "") {
                    saveNode = node;
                }
            }
            return saveNode;
        },
        rangeIncludeNode: function (range, a, b) {
            // startContainer와 endContainer포함 노드 찾기
            var node, start, end, textStart, textEnd;
            start = a || range.startContainer;
            end = b || range.endContainer;
            if (start.nodeType === 3) {
                node = start;
            } else node = start.childNodes[range.startOffset];
            start = node;
            if (end.nodeType === 1) end = end.childNodes[range.endOffset - 1];

            if (start === end) {
                return start;
            }
            while (node) {
                if (HSedit.contains(node, start) && HSedit.contains(node, end)) {
                    return node;
                }
                node = node.parentNode;
            }
        },
        changeNode: function (range, node, type, soe, newNode) {
            var overlapNodes, i, j, a, saveNode;
            if (typeof node === "number" && soe === 0) {
                var start = range.startContainer;
                start.splitText(node);
                HSrange.start = start.nextSibling;
                HSrange.startOffset = 0;
                HSedit.after(start.nextSibling, newNode);
                newNode.appendChild(start.nextSibling);
            } else if (typeof node === "number" && soe === 1) {
                var end = range.endContainer;
                end.splitText(node);
                if (end.parentNode.tagName !== type.toUpperCase()) {
                    newNode = end.ownerDocument.createElement(type);
                    HSedit.before(end, newNode);
                    newNode.appendChild(end);
                } else {
                    newNode = end;
                }
            } else {
                if (node.tagName !== type.toUpperCase()) {
                    var newNode = node.ownerDocument.createElement(type);
                    HSedit.before(node, newNode);
                    newNode.appendChild(node);
                }
            }
            HSedit.overlapNodeReplace(newNode, type);

            return newNode || node;
        },
        createSpanCover: function (range, node, type, option) {
            var node2,
                option1 = option[0],
                option2 = option[1],
                overlap;
            node2 = HSedit.getIncludeNodeAttr(node);
        },
        getCurNodes: function (win) {
            var newNode,
                container,
                body,
                range,
                sel,
                nodeStart = true,
                nodes = [],
                start,
                end,
                i,
                doc = win.document,
                saveNode,
                extendNode;
            range = HSedit.getRange(win);
            if (!range) {
                win.document.body.focus();
                range = HSedit.getRange(win);
            }
            HSrange.initialize(win);
            container = range.commonAncestorContainer;
            start = range.startContainer;
            end = range.endContainer;

            if (start.tagName === "BODY") {
                //start 설정
                saveNode = start;
                start = start.childNodes[range.startOffset];
            }

            if (end.tagName === "BODY") {
                //end 설정
                end = end.childNodes[range.endOffset - 1];
            }

            node = start;
            i = 0;
            while (node.parentNode.tagName && node.parentNode.tagName !== "BODY") {
                //시작 노드 설정
                if (i === 0) {
                    node = start.parentNode;
                    i++;
                } else {
                    node = node.parentNode;
                }
            }

            if (container.nodeType === 3 || container.tagName !== "BODY") {
                nodes[0] = node;
                HSedit.restoreSel(win, range);
                return nodes;
            }

            extendNode = false;
            while (node) {
                // nodes배열에 변환할 node담기
                if (HSedit.contains(node, start) || node === start) {
                    HSrange.start = start;
                    if (saveNode) {
                        HSrange.startOffset = 0;
                    } else {
                        HSrange.startOffset = range.startOffset;
                    }
                }
                if (node.nodeType === 1 && node.tagName === "P") {
                    //node가 <p>태그일 경우
                    nodes[nodes.length] = node;
                    newNode = node;
                } else {
                    // node가 <p>태그가 없는경우 type=3이나 type=1&&tagName!=="P"
                    while (node && (node.nodeType === 3 || (node.nodeType === 1 && node.tagName !== "P"))) {
                        node = node.previousSibling;
                    }
                    node = node.nextSibling;
                    newNode = document.createElement("P");
                    HSedit.before(node, newNode);
                    while (node && (node.nodeType === 3 || (node.nodeType === 1 && node.tagName !== "P"))) {
                        saveNode = node.nextSibling;
                        newNode.appendChild(node);
                        node = saveNode;
                    }
                    nodes[nodes.length] = newNode;
                }

                //node안에 있는 P태그들도 nodes배열에 저장
                i = 0;
                extendNode = HS.find(node, "P");
                while ((saveNode = extendNode[i++])) {
                    nodes[nodes.length] = saveNode;
                }
                //end가 contain된 마지막 줄인경우 루프 탈출
                if (HSedit.contains(newNode, end)) {
                    if (end.nodeType === 1) {
                        HSrange.end = HSedit.getLastTextNode(end);
                        HSrange.endOffset = HSrange.end.textContent.length;
                    } else {
                        HSrange.end = end;
                        HSrange.endOffset = range.endOffset;
                    }
                    break;
                }
                node = newNode.nextSibling;
            }
            HSrange.setSel(range, true);
            return nodes;
        },
        getCurNodes2: function (win, type) {
            var first = true,
                typeOn = true,
                checkNode,
                startNode,
                endNode,
                i,
                sel,
                newNode,
                oldNode,
                range,
                container,
                start,
                end,
                startOffset,
                saveStartOffset,
                saveEndOffset = 0,
                saveEnd,
                childCount,
                nodes = [],
                endOffset,
                node,
                childNode,
                newNodeOn = true,
                extendNode,
                rangeNode,
                editor = win.document.body,
                doc = win.document;
            range = HSedit.getRange(win);

            if (!range) {
                win.document.body.focus();
                range = HSedit.getRange(win);
            }

            HSrange.initialize(win);
            container = range.commonAncestorContainer;
            start = range.startContainer;
            end = range.endContainer;
            startOffset = range.startOffset;
            endOffset = range.endOffset;
            if (startOffset === start.textContent.length) {
                node = start;
                console.log(node.nextSibling);
                while (!node.nextSibling && !HSedit.isBody(node)) {
                    node = node.parentNode;
                }
                if (!HSedit.isBody(node) && HSedit.isParagraphTag(node.nextSibling)) {
                    start = HSedit.nextTextNode(start);
                    startOffset = 0;
                    sel = win.getSelection();
                    range.setStart(start, startOffset);
                    container = range.commonAncestorContainer;
                }
            }
            i = 0;
            console.log(range);
            if (start.nodeType === 3) {
                //startContainer로 type 활성화 여부 체크
                checkNode = start.parentNode;
            } else if (start.nodeType === 1) {
                checkNode = start;
            }
            while (checkNode.tagName && checkNode.tagName !== "BODY") {
                if (checkNode.tagName === type.toUpperCase()) {
                    typeOn = false;
                    nodes[nodes.length] = checkNode;
                }
                checkNode = checkNode.parentNode;
            }
            if (container === start && container === end && container.textContent.length === 0) {
                if (container.nodeType === 3) {
                    container = container.parentNode;
                }
                node = container;
                console.dir(node);
                while ((node = node.children[0])) {
                    console.log(type);
                    if (node.tagName === type.toUpperCase()) {
                        typeOn = false;
                        saveNode = node;
                    }
                }
            }
            if (end.nodeType === 1) {
                saveEnd = end.childNodes[endOffset - 1];
            }
            //루틴 시작
            //단일 노드 변환
            if (
                container === start &&
                container === end &&
                (startOffset === endOffset ||
                    startOffset + 1 === endOffset ||
                    (start.nodeType === 3 && end.nodeType === 3))
            ) {
                if (typeOn) {
                    //추가

                    newNode = doc.createElement(type);
                    if (container.nodeType === 1 && container === start && container === end) {
                        //처음에 아무것도 선택 안 한 경우 && 이미지만 클릭한 경우
                        HSedit.after(start.childNodes[startOffset], newNode);
                        newNode.appendChild(start.childNodes[startOffset]);
                        HSrange.start = start.children[0];
                        HSrange.end = start.children[0];
                        if (startOffset !== endOffset) {
                            HSrange.start = newNode;
                            HSrange.end = newNode;

                            HSedit.previousNodeCombine(newNode, newNode.tagName, "all");
                            HSedit.nextNodeCombine(newNode, newNode.tagName);
                            HSrange.end = HSrange.start;
                            HSrange.endOffset = HSrange.startOffset + 1;
                        }
                    } else {
                        //childNode를 하나만 선택한 경우!
                        if (startOffset !== 0) {
                            //childNode가 하나고 startOffset이 0이 아닌경우
                            start.splitText(startOffset);
                            start = start.nextSibling;
                            if (endOffset !== start.previousSibling.textContent.length + start.textContent.length)
                                start.splitText(endOffset - startOffset);
                            HSedit.after(start, newNode);
                            newNode.appendChild(start);
                        } else {
                            //childNode가 하나고 startOffset이 0인 경우
                            start.splitText(endOffset);
                            HSedit.after(start, newNode);
                            newNode.appendChild(start);
                        }
                        HSrange.endOffset = newNode.textContent.length;
                        HSrange.startOffset = 0;

                        HSrange.start = start;
                        //다음노드도 type인경우 두 노드 합체
                        HSedit.nextNodeCombine(newNode, type);
                        //이전노드가 같은 type일 경우 합체

                        HSedit.previousNodeCombine(newNode, type, "all");
                        HSrange.end = HSrange.start;
                    }
                } else {
                    //삭제
                    if (start.nodeType === 1 && !(startOffset + 1 === endOffset)) {
                        //처음에 아무것도 선택 안 한 경우!
                        while ((node = start.childNodes[i++])) {
                            HSedit.before(saveNode, saveNode.childNodes[0]);
                            saveNode.parentNode.removeChild(saveNode);
                            HSrange.start = start;
                            HSrange.end = end;
                        }
                    } else if (
                        start.nodeType === 3 ||
                        (start.nodeType === 1 && end.nodeType === 1 && startOffset + 1 === endOffset)
                    ) {
                        //childNode를 하나만 선택한 경우!
                        oldNode = doc.createElement("delete-node");
                        if (start.nodeType === 3) {
                            if (startOffset !== 0) {
                                start.splitText(startOffset);
                                if (endOffset !== startOffset + start.nextSibling.textContent) {
                                    start.nextSibling.splitText(endOffset - startOffset);
                                }
                                start = start.nextSibling;
                            } else {
                                if (endOffset !== start.textContent.length) {
                                    start.splitText(endOffset);
                                }
                            }
                        } else {
                            start = start.childNodes[startOffset];
                            first = false;
                        }

                        HSedit.before(start, oldNode);
                        oldNode.appendChild(start);
                        node = nodes[nodes.length - 1];
                        HSedit.overlapNodeReplace(node, type);
                        nodes = node;
                        node = oldNode;
                        HSedit.previousNodeSeparate(node, nodes);
                        HSedit.nextNodeSeparate(node, nodes);
                        HSedit.tagOnlyRemove(nodes);
                        saveNode = node.parentNode;
                        //range설정
                        HSrange.startOffset = 0;
                        HSrange.endOffset = node.childNodes[0].textContent.length;
                        i = 0;
                        while ((extendNode = saveNode.childNodes[i++])) {
                            if (extendNode === node) {
                                childCount = i - 1;
                            }
                        }

                        if (node.previousSibling && node.previousSibling.nodeType === 3) {
                            HSrange.startOffset += node.previousSibling.textContent.length;
                            HSrange.endOffset += node.previousSibling.textContent.length;
                        }
                        HSedit.tagOnlyRemove(node);
                        saveNode.normalize();
                        if (first) {
                            HSrange.start = saveNode.childNodes[childCount];
                            HSrange.end = saveNode.childNodes[childCount];
                        } else {
                            HSrange.start = saveNode;
                            HSrange.end = saveNode;
                            HSrange.startOffset = childCount;
                            HSrange.endOffset = childCount + 1;
                        }
                    }
                }
                HSrange.setSel(range, true);
                editor.focus();
            } else if (
                container !== start ||
                container !== end ||
                (container === start && container === end && startOffset + 1 !== endOffset)
            ) {
                node = start;
                if (typeOn) {
                    //!---------------------------------------------------------------
                    if (end.nodeType === 3) oldNode = end;
                    else {
                        oldNode = end = end.childNodes[endOffset - 1];
                    }
                    if (start.nodeType === 1) {
                        start = start.childNodes[startOffset];
                    }
                    HSrange.startOffset = startOffset; //start range 초기값 세팅
                    HSrange.start = start;
                    newNode = doc.createElement(type);
                    rangeNode = HSedit.rangeIncludeNode(range); // start end를 포함하는 첫 노드 저장

                    if (start.nodeType === 3) newNode = HSedit.changeNode(range, startOffset, type, 0, newNode);
                    // 첫 노드 startContainer변환
                    else newNode = HSedit.changeNode(range, start, type);
                    saveNode = newNode;
                    node = HSedit.trashNodeRemove(saveNode.previousSibling, 0) || null;

                    while (node && node.nodeType === 1 && saveNode.tagName === type.toUpperCase()) {
                        saveNode = node;
                        node = HSedit.trashNodeRemove(saveNode.previousSibling, 0) || null;
                    }

                    HSedit.previousNodeCombine(newNode, type, "start");
                    saveStartOffset = HSrange.startOffset;
                    newNode = saveNode;

                    //rangeNode전까지 nextSibling쪽으로 node를 change
                    while (newNode.parentNode !== rangeNode) {
                        while (newNode.nextSibling ? (newNode = newNode.nextSibling) : false) {
                            newNode = HSedit.changeNode(range, newNode, type);
                            childNode = newNode.previousSibling;
                            saveNode = newNode;
                            while (childNode && HSedit.compareNodeType(saveNode, childNode, 2)) {
                                saveNode = childNode;
                                if (saveNode.previousSibling) childNode = saveNode.previousSibling;
                                else break;
                            }

                            HSedit.previousNodeCombine(newNode, type);
                            newNode = saveNode;
                        }
                        newNode = newNode.parentNode;
                    }
                    saveNode = newNode;
                    if (newNode.nodeType === 3) {
                        newNode = newNode.parentNode;
                    }
                    //!----------------------------------------------------------------------------
                    while ((newNode = newNode.nextSibling)) {
                        if (HSedit.contains(newNode, oldNode) || newNode === oldNode) {
                            //마지막노드를 포함하는 노드(줄,노드)일 경우 !
                            HSrange.end = end; //end range 초기값 세팅
                            HSrange.endOffset = endOffset;

                            if (end.nodeType === 3) {
                                newNode = HSedit.changeNode(range, endOffset, type, 1);
                                if (newNode.nodeType === 3) newNode = newNode.parentNode;
                            } else if (end.nodeType === 1 && end.parentNode.tagName !== type.toUpperCase()) {
                                newNode = HSedit.changeNode(range, oldNode, type);
                                HSrange.endOffset = 1;
                            } else {
                                newNode = end.parentNode;
                            }

                            if (
                                (node = HSedit.trashNodeRemove(newNode.previousSibling, 0)) &&
                                node.tagName === newNode.tagName
                            ) {
                                extendNode = node;
                                while (
                                    (node = HSedit.trashNodeRemove(extendNode.previousSibling, 0)) &&
                                    node.tagName === extendNode.tagName
                                ) {
                                    extendNode = node;
                                }
                            } else {
                                extendNode = newNode;
                            }

                            HSedit.previousNodeCombine(newNode, type, "end");
                            newNode = extendNode;

                            HSedit.nextNodeCombine(newNode, type);
                            saveEndOffset = HSrange.endOffset;
                            node = newNode.firstChild;

                            while (node) {
                                if (node.firstChild) node = node.firstChild;
                                else break;
                            }

                            if (node === HSrange.end) first = 1;
                            else first = false;
                            newNodeOn = false;
                            checkNode = true;

                            while (checkNode && newNode.parentNode !== rangeNode) {
                                while (
                                    checkNode && newNode.previousSibling ? (newNode = newNode.previousSibling) : false
                                ) {
                                    if (newNode !== saveNode && !HSedit.contains(newNode, saveNode)) {
                                        newNode = HSedit.changeNode(range, newNode, type);

                                        if (first === 1) {
                                            newNodeOn = true;
                                            childNode = newNode;
                                            rangeNode = newNode.nextSibling;

                                            while (
                                                first === 1 && HSedit.compareNodeType(childNode, rangeNode, 2)
                                                    ? true
                                                    : (first = false)
                                            ) {
                                                childNode = childNode.lastChild || childNode;
                                                rangeNode = rangeNode.firstChild || rangeNode;
                                                if (childNode.nodeType === 3 && rangeNode.nodeType === 3) {
                                                    HSrange.end = childNode;
                                                    saveEndOffset += childNode.textContent.length;
                                                    break;
                                                }
                                                if (
                                                    !HSedit.compareNodeType(childNode, rangeNode, 2) ||
                                                    (childNode.nodeType === 1 && rangeNode.nodeType === 3) ||
                                                    (childNode.nodeType === 3 && rangeNode.nodeType === 1)
                                                ) {
                                                    first = false;
                                                }
                                            }
                                        }
                                        HSedit.nextNodeCombine(newNode, type);
                                    } else checkNode = false;
                                }
                                if (newNodeOn) first = false;
                                newNode = newNode.parentNode;

                                if (newNode.tagName === type.toUpperCase()) {
                                    HSedit.overlapNodeReplace(newNode, type);
                                }
                            }
                            break;
                            //!---------------------------------------------------------------------
                        } else {
                            //시작도 마지막도 아닌 노드 변환
                            //변환할 노드 이전노드가 같은 타입인경우 previous Combine 대비
                            if (
                                (newNode.nodeType === 3 && newNode.previousSibling.nodeType === 3) ||
                                (newNode.nodeType === 1 &&
                                    HSedit.stopChangeTag(newNode) &&
                                    newNode.previousSibling.tagName === type.toUpperCase())
                            ) {
                                saveNode = newNode.previousSibling;
                                first = true;
                            } else {
                                saveNode = newNode;
                                if (
                                    newNode.nodeType === 1 &&
                                    (newNode.tagName === type.toUpperCase() || newNode.tagName === "P")
                                )
                                    first = true;
                                else first = false;
                            }

                            if (
                                !HSedit.isBody(newNode.parentNode) ||
                                (HSedit.isBody(newNode.parentNode) && newNode.tagName !== "P")
                            ) {
                                newNode = HSedit.changeNode(range, newNode, type);

                                childNode = newNode;
                                node = HSedit.trashNodeRemove(childNode.previousSibling, 0) || null;
                                while (
                                    end.nodeType === 1 &&
                                    node &&
                                    node.nodeType === 1 &&
                                    childNode.tagName === type.toUpperCase()
                                ) {
                                    childNode = node;
                                    node = HSedit.trashNodeRemove(childNode.previousSibling, 0) || null;
                                }

                                HSedit.previousNodeCombine(newNode, type);
                            } else {
                                extendNode = doc.createElement(type);
                                if (newNode.nodeType === 1) {
                                    HSedit.overlapNodeReplace(newNode, type);
                                    HSedit.before(newNode.firstChild, extendNode);
                                    while ((node = newNode.childNodes[1])) {
                                        extendNode.appendChild(node);
                                    }
                                } else {
                                    HSedit.before(newNode, extendNode);
                                    extendNode.appendChild(newNode);
                                    newNode = extendNode;
                                }
                            }
                            newNode = saveNode;
                            if (!first) {
                                newNode = saveNode.parentNode;
                            }
                        }
                    }
                    HSrange.startOffset = saveStartOffset;
                    HSrange.endOffset = saveEndOffset;
                    if (start.nodeType === 1) {
                        HSrange.start = start.parentNode;
                        saveNode = start.parentNode;
                        i = 0;
                        while ((node = saveNode.childNodes[i++])) {
                            if (node === start) {
                                HSrange.startOffset = --i;
                                break;
                            }
                        }
                    }
                    if (end.nodeType === 1) {
                        HSrange.end = end.parentNode;
                        saveNode = end.parentNode;
                        console.dir(saveNode);
                        i = 0;
                        while ((node = saveNode.childNodes[i++])) {
                            if (node === end) {
                                HSrange.endOffset = i;
                                break;
                            }
                        }
                    }
                    console.dir(HSrange.start);
                    console.dir(HSrange.end);
                    console.dir(HSrange.startOffset);
                    console.dir(HSrange.endOffset);
                    HSrange.setSel(range, true);
                    return true;
                    //!----------------------------------------------------------------------
                } else {
                    //여러노드 선택된 경우 삭제
                    //1-1
                    HSrange.endOffset = endOffset;
                    rangeNode = HSedit.rangeIncludeNode(range);
                    //start노드에서 type 지우기
                    if (startOffset !== start.textContent.length) {
                        oldNode = doc.createElement("delete-node");
                        if (start.nodeType === 3) {
                            if (startOffset !== 0 && startOffset !== start.textContent.length) {
                                start.splitText(startOffset);
                                start = start.nextSibling;
                            }
                        } else if (start.nodeType === 1) {
                            start = start.childNodes[startOffset];
                            saveStartOffset = start;
                        }
                        startOffset = 0;

                        HSedit.before(start, oldNode);
                        oldNode.appendChild(start);
                        node = nodes[nodes.length - 1];
                        HSedit.overlapNodeReplace(node, type);
                        nodes = node;
                        node = oldNode;
                        HSedit.previousNodeSeparate(node, nodes);
                        HSedit.nextNodeSeparate(node, nodes);
                        HSedit.tagOnlyRemove(nodes);
                        node.parentNode.normalize(); //버그예방
                        if (node.nextSibling === end) {
                            end = start;
                            endOffset += node.textContent.length;
                        }

                        HSedit.tagOnlyRemove(node); // delete-node 삭제
                        while (start.previousSibling && start.previousSibling.nodeType === 3) {
                            //normalize전 start이동
                            start = start.previousSibling;
                            startOffset = start.textContent.length;
                        }
                    }

                    start.parentNode.normalize();
                    nodes = node = start;
                    HSrange.start = start;
                    //1-1끝
                    if (start !== end) {
                        //2-1 start바로 뒤에 end가 아닌경우
                        if (rangeNode.textContent.length !== 0 && rangeNode !== start.parentNode) {
                            //3-1 start랑 end의 topNode 즉 마지막 type노드(rangeNode)가 start의 부모가아닌경우 (topNode가 같은경우)

                            while (
                                nodes &&
                                nodes.parentNode.parentNode !== rangeNode &&
                                nodes.parentNode !== rangeNode
                            ) {
                                nodes = nodes.parentNode;
                            }

                            //3-1-1start의 topNode안에 포함되는 textNode들 체크
                            while (HSedit.contains(nodes, (node = HSedit.nextTextNode(node)))) {
                                saveNode = [];
                                checkNode = node.parentNode;
                                while (checkNode.tagName && checkNode !== nodes && checkNode.tagName !== "BODY") {
                                    if (checkNode.tagName === type.toUpperCase()) {
                                        saveNode[saveNode.length] = checkNode;
                                    }
                                    checkNode = checkNode.parentNode;
                                }
                                if (saveNode.length > 0) {
                                    oldNode = doc.createElement("delete-node");
                                    HSedit.before(node, oldNode);
                                    oldNode.appendChild(node);
                                    node = saveNode[saveNode.length - 1];
                                    checkNode = node;
                                    node = oldNode;
                                    HSedit.previousNodeSeparate(node, checkNode);
                                    HSedit.tagOnlyRemove(checkNode); // tagName이 type인 노드 삭제
                                    HSedit.nextNodeSeparate(node, nodes);
                                    node.parentNode.normalize();
                                    saveNode = node.childNodes[0];
                                    HSedit.tagOnlyRemove(node); //delete-node 삭제
                                    while (saveNode.previousSibling && saveNode.previousSibling.nodeType === 3) {
                                        saveNode = saveNode.previousSibling;
                                    }
                                    saveNode.parentNode.normalize();
                                    node = saveNode;
                                }
                            }

                            node = nodes.nextSibling;
                            nodes = nodes.parentNode;

                            //3-1-2
                            while (node) {
                                saveNode = node.nextSibling;
                                HSedit.overlapNodeReplace(node, type);
                                if (node.tagName === type.toUpperCase()) HSedit.tagOnlyRemove(node);
                                else HSedit.previousNodeCombine(node, node.tagName);
                                node = saveNode;
                            }
                            node = nodes;

                            node.normalize();
                            nodes = node;
                            node = node.nextSibling;
                            //3-1끝
                        } else {
                            //3-2
                            node = node.nextSibling;
                            //3-2끝
                        }
                        if (saveEnd) {
                            end = saveEnd;
                        }
                        //4-1 마지막노드를 포함한 노드가 나오기전까지 변환
                        while (node && !HSedit.contains(node, end) && node !== end) {
                            saveNode = node.nextSibling;
                            HSedit.overlapNodeReplace(node, type);
                            if (saveNode && saveNode === end && HSedit.compareNodeType(saveNode, node, 2)) {
                                if (node.childNodes.length === 1 && node.firstChild.nodeType === 3) {
                                    end = node.previousSibling;
                                    endOffset += node.textContent.length + start.textContent.length;
                                } else if (node.childNodes.length > 1) {
                                    node.normalize();
                                    if (node.lastChild.nodeType === 3) {
                                        end = node.lastChild;
                                        endOffset += node.lastChild.textContent.length;
                                    }
                                }
                            }
                            if (node.tagName === type.toUpperCase()) HSedit.tagOnlyRemove(node);
                            else if (node.parentNode.tagName !== "BODY") {
                                HSedit.previousNodeCombine(node, node.tagName);
                            }

                            node = saveNode;
                        }
                        //4-1끝

                        //마지막노드 5-1
                        if (saveEnd) {
                            end = saveEnd;
                        }

                        nodes = null;
                        node = end.parentNode;
                        while (node.tagName && node.tagName !== "BODY") {
                            if (node.tagName === type.toUpperCase()) {
                                nodes = node;
                            }
                            node = node.parentNode;
                        }

                        if (nodes) {
                            //end노드가 지울려는 type을 끼고 있을경우
                            oldNode = doc.createElement("delete-node");
                            if (end.nodeType === 3 && endOffset !== 0 && endOffset !== end.textContent.length) {
                                end.splitText(endOffset);
                            }

                            HSedit.before(end, oldNode);
                            oldNode.appendChild(end);
                            node = oldNode;
                            HSedit.overlapNodeReplace(nodes, type);
                            HSedit.previousNodeSeparate(node, nodes);
                            HSedit.nextNodeSeparate(node, nodes);
                            startNode = nodes.firstChild;
                            HSedit.tagOnlyRemove(nodes);
                            node.parentNode.normalize(); //버그예방
                            HSedit.tagOnlyRemove(node); // delete-node 삭제
                        } else {
                            startNode = end;
                        }

                        while (end.previousSibling && end.previousSibling.nodeType === 3) {
                            //normalize전 start이동
                            end = end.previousSibling;
                            endOffset += end.textContent.length;
                        }

                        end.parentNode.normalize();
                        HSrange.end = end;

                        nodes = node = end;
                        if (!saveEnd) newNode = true;
                        else newNode = false;

                        //rangeNode재정의
                        rangeNode = HSedit.rangeIncludeNode(range, HSrange.start, HSrange.end);

                        if (rangeNode.textContent.length !== 0 && rangeNode !== end.parentNode) {
                            while (
                                nodes &&
                                nodes.parentNode.parentNode !== rangeNode &&
                                nodes.parentNode !== rangeNode
                            ) {
                                nodes = nodes.parentNode;
                            }

                            //다음 변환할 노드로 이동
                            startNode = node;
                            node = node.previousSibling;
                            while (!node) {
                                node = startNode.parentNode;
                                startNode = node;
                                node = node.previousSibling;
                            }

                            //end의 topNode안에 포함되는 textNode들 체크
                            first = true;
                            newNodeOn = false;
                            saveEndOffset = 0;

                            while (HSedit.contains(nodes, node)) {
                                //변환할 노드가 topNode안에 포함되는지 체크(반복)
                                //변환할 노드가 자식노드로 type을 포함하는지 체크 후 포함하면 삭제
                                HSedit.overlapNodeReplace(node, type);

                                saveNode = null;
                                if (node.nodeType === 3) {
                                    checkNode = node.parentNode;
                                } else {
                                    checkNode = node;
                                }
                                if (node.tagName === type.toUpperCase()) {
                                    node = node.lastChild;
                                }
                                //변환할 노드가 type의 영향을 받고있는지 체크
                                while (checkNode.tagName && checkNode !== nodes && checkNode.tagName !== "BODY") {
                                    if (checkNode.tagName === type.toUpperCase()) {
                                        saveNode = checkNode; //변환할 노드를 덮고있는 type(지워질type)
                                    }
                                    checkNode = checkNode.parentNode;
                                }

                                if (saveNode) {
                                    //type의 영향을 받고있을 경우
                                    oldNode = doc.createElement("delete-node");
                                    HSedit.before(node, oldNode);
                                    oldNode.appendChild(node);
                                    checkNode = saveNode;
                                    node = oldNode;
                                    HSedit.previousNodeSeparate(node, checkNode);
                                    //문제 발생시 코드수정될수있는부분

                                    //

                                    HSedit.tagOnlyRemove(checkNode); // tagName이 type인 노드 삭제
                                    HSedit.nextNodeSeparate(node, nodes);
                                    node.parentNode.normalize();

                                    saveNode = node.lastChild;

                                    HSedit.tagOnlyRemove(node); //delete-node 삭제

                                    //end range 복원 1
                                    extendNode = saveNode.nextSibling;
                                } else {
                                    //type의 영향을 받지않고 있을 경우
                                    //end range 복원 1
                                    extendNode = node.nextSibling;
                                }

                                //end range 복원 2
                                while (!extendNode) {
                                    saveNode = saveNode.parentNode;
                                    extendNode = saveNode.nextSibling;
                                }

                                extendNode = extendNode.previousSibling;
                                HSedit.overlapNodeReplace(extendNode, type);
                                if (newNode && extendNode.nodeType === 3) {
                                    if (extendNode === end.previousSibling) {
                                        saveEndOffset += extendNode.textContent.length;
                                        while (
                                            extendNode.previousSibling &&
                                            extendNode.previousSibling.nodeType === 3
                                        ) {
                                            extendNode = extendNode.previousSibling;
                                            saveEndOffset += extendNode.textContent.length;
                                        }
                                        HSrange.end = extendNode;
                                        extendNode.parentNode.normalize();
                                        if (
                                            extendNode.previousSibling &&
                                            extendNode.previousSibling.tagName !== type.toUpperCase()
                                        ) {
                                            newNode = false;
                                        }
                                    } else {
                                        newNode = false;
                                    }
                                } else if (newNode && extendNode.nodeType === 1) {
                                    childNode = extendNode;
                                    rangeNode = extendNode.nextSibling;
                                    while (
                                        first && HSedit.compareNodeType(childNode, rangeNode, 2)
                                            ? true
                                            : (first = false)
                                    ) {
                                        childNode = childNode.lastChild || childNode;
                                        rangeNode = rangeNode.firstChild || rangeNode;
                                        if (childNode.nodeType === 3 && rangeNode.nodeType === 3) {
                                            HSrange.end = extendNode = childNode;
                                            saveEndOffset += childNode.textContent.length;
                                            break;
                                        }
                                        if (
                                            !HSedit.compareNodeType(childNode, rangeNode, 2) ||
                                            (childNode.nodeType === 1 && rangeNode.nodeType === 3) ||
                                            (childNode.nodeType === 3 && rangeNode.nodeType === 1)
                                        ) {
                                            newNode = false;
                                        }
                                    }
                                    HSedit.nextNodeCombine(extendNode, extendNode.tagName);
                                }
                                if (nodes.nodeType === 1) {
                                    HSedit.nextNodeCombine(nodes, nodes.tagName);
                                }
                                //end range 복원 2 끝
                                node = extendNode;

                                //다음 변환할 노드로 이동
                                startNode = node;
                                node = node.previousSibling;
                                while (!node) {
                                    node = startNode.parentNode;
                                    startNode = node;
                                    node = node.previousSibling;
                                }
                            }

                            node = nodes.previousSibling;
                            while (!node) {
                                node = nodes = nodes.parentNode;
                                node = node.previousSibling;
                            }
                            nodes = nodes.parentNode;
                        } else {
                            if (!node.previousSibling) node = node.parentNode.previousSibling;
                            else node = node.previousSibling;
                        }
                        endOffset += saveEndOffset;
                        //----------------------------------------------------
                        saveEndOffset = 0;
                        if (start !== end) {
                            //남은 노드 체크
                            first = true;
                            newNodeOn = false;

                            while (node && !HSedit.contains(node, start) && node !== start) {
                                saveNode = node.previousSibling;
                                HSedit.overlapNodeReplace(node, type);
                                HSedit.overlapNodeReplace(node, node.tagName);
                                extendNode = node;
                                if (node.tagName === type.toUpperCase()) {
                                    extendNode = node.lastChild;
                                    HSedit.tagOnlyRemove(node);
                                }

                                if (newNode && extendNode.nodeType === 3) {
                                    if (extendNode === end.previousSibling) {
                                        saveEndOffset += extendNode.textContent.length;
                                        while (
                                            extendNode.previousSibling &&
                                            extendNode.previousSibling.nodeType === 3
                                        ) {
                                            extendNode = extendNode.previousSibling;
                                            saveEndOffset += extendNode.textContent.length;
                                        }
                                        HSrange.end = extendNode;
                                        extendNode.parentNode.normalize();
                                        if (
                                            extendNode.previousSibling &&
                                            extendNode.previousSibling.tagName !== type.toUpperCase()
                                        ) {
                                            newNode = false;
                                        }
                                    } else {
                                        newNode = false;
                                    }
                                } else if (newNode && extendNode.nodeType === 1) {
                                    newNodeOn = true;
                                    childNode = extendNode;
                                    rangeNode = extendNode.nextSibling;
                                    while (
                                        first && HSedit.compareNodeType(childNode, rangeNode, 2)
                                            ? true
                                            : (first = false)
                                    ) {
                                        childNode = childNode.lastChild || childNode;
                                        rangeNode = rangeNode.firstChild || rangeNode;
                                        if (childNode.nodeType === 3 && rangeNode.nodeType === 3) {
                                            HSrange.end = childNode;
                                            saveEndOffset += childNode.textContent.length;
                                            break;
                                        }
                                        if (
                                            !HSedit.compareNodeType(childNode, rangeNode, 2) ||
                                            (childNode.nodeType === 1 && rangeNode.nodeType === 3) ||
                                            (childNode.nodeType === 3 && rangeNode.nodeType === 1)
                                        ) {
                                            newNode = false;
                                        }
                                    }
                                    if (newNodeOn) newNode = false;
                                    HSedit.nextNodeCombine(extendNode, extendNode.tagName);
                                }
                                node = saveNode;
                            }
                        }
                        endOffset += saveEndOffset;
                        nodes.normalize();
                        HSrange.startOffset = startOffset;
                        HSrange.endOffset = endOffset;
                    } else {
                        //2-2 start 바로뒤에 end가 있는 경우 변환할게 없어 바로 종료.
                        HSrange.end = HSrange.start;
                        HSrange.startOffset = startOffset;
                        HSrange.endOffset = startOffset + endOffset;
                        //2-2끝
                    }
                    if (saveStartOffset && saveStartOffset.nodeType === 1) {
                        HSrange.start = saveStartOffset.parentNode;
                        saveNode = saveStartOffset.parentNode;
                        i = 0;
                        while ((node = saveNode.childNodes[i++])) {
                            if (node === saveStartOffset) {
                                HSrange.startOffset = --i;
                                break;
                            }
                        }
                    }
                    if (saveEnd && saveEnd.nodeType === 1) {
                        HSrange.end = saveEnd.parentNode;
                        saveNode = saveEnd.parentNode;
                        i = 0;
                        while ((node = saveNode.childNodes[i++])) {
                            if (node === saveEnd) {
                                HSrange.endOffset = i;
                                break;
                            }
                        }
                    }
                    console.dir(HSrange.start);
                    console.dir(HSrange.end);
                    console.dir(HSrange.startOffset);
                    console.dir(HSrange.endOffset);
                    HSrange.setSel(range, true);
                }
            }
        },
        tagNameFontReplace: function (node, type) {
            var i = 0,
                childNodes = node.childNodes,
                child;
            for (i = 0; i < childNodes.length; i++) {
                child = childNodes[i];
                if (child.tagName === "FONT") {
                    if (type === "fontFamily") {
                        child.removeAttribute("face");
                    } else if (type === "color") {
                        child.removeAttribute("color");
                    } else if (type === "fontSize") {
                        child.removeAttribute("size");
                    }
                    if (
                        !child.getAttribute("face") &&
                        !child.getAttribute("color") &&
                        !child.getAttribute("size") &&
                        !child.getAttribute("style")
                    ) {
                        child.parentNode.removeChild(child);
                    }
                }
            }
            for (i = 0; i < childNodes.length; child = childNodes[i], i++) {
                if (child.nodeType === 1 && child.childNodes.length > 0) {
                    HSedit.tagNameFontReplace(child, type);
                }
            }
        },
        getCurNodes3: function (win, type, option, value) {
            var range,
                editor = win.document.body,
                doc = win.document,
                node,
                node2,
                node3,
                newNode,
                isLast,
                a,
                b,
                rangeCheck = true,
                safeWrap;
            range = HSedit.getRange(win);
            if (!range) {
                win.document.body.focus();
                range = HSedit.getRange(win);
            }
            HSrange.initialize(win);
            container = range.commonAncestorContainer;
            start = range.startContainer;
            end = range.endContainer;
            startOffset = range.startOffset;
            endOffset = range.endOffset;

            //start나 end가 이미지나 iframe,object,video일 경우 start,end 재정의
            if (start.nodeType === 1) {
                start = start.childNodes[startOffset];
            }
            if (end.nodeType === 1) {
                end = end.childNodes[endOffset === 0 ? endOffset : endOffset - 1];
            }

            //start가 텍스트노드 일 경우 Separate하기 전 splitText
            if (start.nodeType === 3) {
                if (start === end) {
                    if (endOffset < end.textContent.length) {
                        start.splitText(endOffset);
                    }
                }
                if (startOffset !== 0 && start.textContent.length > 1) {
                    start.splitText(startOffset);
                    if (start === end) {
                        start = end = start.nextSibling;
                    } else {
                        start = start.nextSibling;
                    }
                }
            }

            //start Separate
            node = start;
            while (!HSedit.isParagraphTag(node.parentNode) && !node.parentNode.tagName !== "BODY") {
                node = node.parentNode;
            }
            HSedit.previousNodeSeparate(start, node);
            HSedit.nextNodeSeparate(start, node);

            //start노드 변환
            newNode = doc.createElement(type);
            newNode.style[option] = value;
            HSedit.before(node, newNode);
            newNode.appendChild(node);
            HSedit.tagNameFontReplace(newNode, option);
            HSedit.overlapNodeReplace(newNode, type, true);

            //변환된 노드 저장
            node2 = newNode;
            //선택지 1~2
            if (start !== end) {
                //1.start랑 end랑 같지않을경우(다중노드 select)
                //end Separate
                node = end;
                //end safe Wrap씌우기(range복원하기쉽게)
                console.log(start);
                console.log(end);
                if (end.nodeType === 3) {
                    end.splitText(endOffset);
                    safeWrap = doc.createElement("delete-node");
                    HSedit.before(end, safeWrap);
                    safeWrap.appendChild(end);
                }

                while (!HSedit.isParagraphTag(node.parentNode) && node.parentNode.tagName !== "BODY") {
                    node = node.parentNode;
                }
                HSedit.nextNodeSeparate(end, node);

                //다음노드가 없을 경우 다음노드가 있는 부모노드를 찾아서 저장
                while (!newNode.nextSibling) {
                    newNode = newNode.parentNode;
                }

                //end노드까지 변환 시작
                while (newNode.nextSibling && !isLast) {
                    //선택지 1~2
                    if (HSedit.isParagraphTag(newNode.nextSibling)) {
                        //1.다음노드가 Paragraph인 경우
                        //자식노드가 있을 경우
                        if (newNode.nextSibling.childNodes.length > 0) {
                            newNode = newNode.nextSibling.childNodes[0];
                            node2 = doc.createElement(type);
                            node2.style[option] = value;
                            HSedit.before(newNode, node2);
                            node2.appendChild(newNode);
                            testtest = 1;
                            HSedit.tagNameFontReplace(node2, option);
                            HSedit.overlapNodeReplace(node2, type, true);
                            newNode = node2;
                            if (HSedit.isInclude(node2, end)) {
                                isLast = true;
                            }
                        } else {
                            //자식노드가 없을 경우
                            newNode = newNode.nextSibling;
                        }
                    } else {
                        //2.다음노드가 P가 아닌 경우
                        newNode = newNode.nextSibling;
                        node2.appendChild(newNode);
                        HSedit.tagNameFontReplace(node2, option);
                        HSedit.overlapNodeReplace(node2, type, true);
                        newNode = node2;
                        if (HSedit.isInclude(node2, end)) {
                            isLast = true;
                        }
                    }

                    //end Range복원
                    if (isLast) {
                        if (safeWrap) HSedit.tagOnlyRemove(safeWrap);
                        extendNode = end;
                        while (!extendNode.previousSibling) {
                            extendNode = extendNode.parentNode;
                        }
                        extendNode = extendNode.previousSibling;
                        while (rangeCheck) {
                            if (extendNode.nodeType === 3) {
                                if (extendNode === end.previousSibling) {
                                    while (extendNode.previousSibling && extendNode.previousSibling.nodeType === 3) {
                                        extendNode = extendNode.previousSibling;
                                    }
                                    end = extendNode;
                                    extendNode.parentNode.normalize();
                                }
                            } else if (extendNode.nodeType === 1) {
                                childNode = extendNode;
                                rangeNode = extendNode.nextSibling;

                                if (!HSedit.compareNodeType(childNode, rangeNode, 2)) {
                                    rangeCheck = false;
                                }

                                while (rangeCheck && HSedit.compareNodeType(childNode, rangeNode, 2)) {
                                    childNode = childNode.lastChild || childNode;
                                    rangeNode = rangeNode.firstChild || rangeNode;
                                    if (childNode.nodeType === 3 && rangeNode.nodeType === 3) {
                                        end = childNode;
                                        break;
                                    }

                                    if (
                                        !HSedit.compareNodeType(childNode, rangeNode, 2) ||
                                        (childNode.nodeType === 1 && rangeNode.nodeType === 3) ||
                                        (childNode.nodeType === 3 && rangeNode.nodeType === 1)
                                    ) {
                                        rangeCheck = false;
                                    }
                                }
                                HSedit.previousNodeCombine(extendNode.nextSibling, extendNode.tagName);
                            }

                            if (rangeCheck) {
                                while (!extendNode.previousSibling) {
                                    extendNode = extendNode.parentNode;
                                }
                                extendNode = extendNode.previousSibling;
                            }
                        }
                    }
                    //선택지 1~2
                    if (!HSedit.isInclude(newNode, end) && !isLast) {
                        //1. 변환할 노드가 end를 포함 안 할 경우
                        while (!newNode.nextSibling) {
                            newNode = newNode.parentNode;
                        }
                    } else {
                        //2. 변환할 노드가 end를 포함 할 경우
                        isLast = true; //Loop 탈출
                    }
                }
            } else {
                //2.start랑 end랑 같을경우(단일노드 select)
            }
            //start range 설정(최종)
            if (start.nodeType === 1) {
                //start가 이미지나 동영상일경우
                node2 = start;
                HSrange.start = start.parentNode;
                for (i = 0, node = start.childNodes[i]; i < start.childNodes.length; i++, node = start.childNodes[i]) {
                    if (node === node2) {
                        HSrange.endOffset = i;
                        break;
                    }
                }
            } else if (start.nodeType === 3) {
                //start가 텍스트일 경우
                HSrange.start = start;
                HSrange.startOffset = 0;
            }
            //end range 설정(최종)
            if (end.nodeType === 1) {
                //end가 이미지나 동영상일경우
                node2 = end;
                HSrange.end = end.parentNode;
                for (i = 0, node = end.childNodes[i]; i < end.childNodes.length; i++, node = end.childNodes[i]) {
                    if (node === node2) {
                        HSrange.endOffset = i + 1;
                        break;
                    }
                }
            } else if (end.nodeType === 3) {
                //end가 텍스트일 경우
                HSrange.end = end;
                HSrange.endOffset = end.textContent.length;
            }
            console.log(range);
            HSrange.setSel(range, true);
            editor.focus();
        },
        insertContents: function (win, contents) {
            var range = HSedit.getRange(win),
                node,
                startOffset,
                start;
            if (!range) {
                win.document.body.focus();
                range = HSedit.getRange(win);
            }
            startOffset = range.startOffset;
            start = range.startContainer;
            if (contents.nodeType) {
                node = contents;
            } else {
            }
            if (start.nodeType === 3) {
                if (startOffset !== 0) {
                    range.startContainer.splitText(startOffset);
                    start = start.nextSibling;
                }
                HSedit.before(start, node);
            } else if (start.nodeType === 1) {
                HSedit.before(start.childNodes[startOffset], node);
            }
        },
        addClass: function (node, value) {
            var classes,
                cur,
                curValue,
                clazz,
                j,
                finalValue,
                i = 0;
            if (typeof value === "string" && value) {
                classes = value.match(classExr) || [];
                curValue = node.getAttribute("class") || "";
                cur = (" " + curValue + " ").replace(/[\t\r\n\f]/g, " ");
                if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                        if (cur.indexOf(" " + clazz + " ") < 0) {
                            cur += clazz + " ";
                        }
                    }
                    finalValue = HSedit.trim(cur);
                    if (curValue !== finalValue) {
                        node.setAttribute("class", finalValue);
                    }
                }
            }
        },
        removeClass: function (node, value) {
            if (node) {
                var classes,
                    cur,
                    curValue,
                    clazz,
                    j,
                    finalValue,
                    i = 0;
                if (!arguments.length) {
                    node.setAttribute("class", "");
                }
                if (typeof value === "string" && value) {
                    classes = value.match(classExr) || [];
                    curValue = node.getAttribute("class") || "";
                    cur = (" " + curValue + " ").replace(/[\t\r\n\f]/g, " ");
                    if (cur) {
                        while ((clazz = classes[i++])) {
                            if (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = HSedit.trim(cur);
                        if (curValue !== finalValue) {
                            node.setAttribute("class", finalValue);
                        }
                    }
                }
            }
        },
        removeStyle: function (node, name) {
            if (node) {
                var styles,
                    all = [],
                    pass = true;
                styles = HSedit.getAttributeStyleProperty(node);
                for (var i = 0; i < styles.length; i++) {
                    all.push(HSedit.split(styles[i], ":"));
                }
                node.removeAttribute("style");
                for (i = 0; i < all.length; i++) {
                    if (all[i][0] === name) {
                        all.splice(i, 1);
                        pass = false;
                        i--;
                    }
                    if (pass) {
                        node.style[all[i][0]] = all[i][1];
                    }
                    pass = true;
                }
            }
        },
        hasClass: function (node, selector) {
            var className,
                a,
                i = 0;
            className = " " + selector + " ";
            a = node.getAttribute("class") || "";
            if (node.nodeType === 1 && (" " + a + " ").indexOf(className) > -1) {
                return true;
            }
            return false;
        },
        trim: function (text) {
            if (text !== null) {
                text = text.replace(/^\s+/, "");
                text = text.replace(/\s+$/, "");
            }
            return text == null ? "" : text;
        },
    });

    //유틸 메서드 끝

    //사용자 사용 메서드 시작
    HSedit.fn.extend({
        //에디터 로드 시작 메서드
        load: function (elem) {
            console.log(elem);
            var self = this,
                newframe,
                frame,
                frameStyle,
                editHTML =
                    "<HSedit>" +
                    "<div id='HStoolbar' class='hs-toolbar'>" +
                    "</div>" +
                    "<div class='hs-frame'><iframe id='editorFrame' class='editor_frame' allowtransparency='true' frameborder='0'></iframe></div>" +
                    "</HSedit>";
            if (styleOn === false) {
                //main css파일 가져오기
                frameStyle = document.createElement("link");
                frameStyle.href = HSset.assetsPath.mainStyle;
                frameStyle.rel = "stylesheet";
                frameStyle.type = "text/css";
                if (document.getElementsByTagName) {
                    document.getElementsByTagName("head")[0].appendChild(frameStyle);
                }
            }
            this.elem = elem;
            elem.innerHTML = editHTML;
            self.toolbar = HS.find(elem, "#HStoolbar");

            //color picker 로드

            //frame 로드
            frame = HS.find(elem, "iframe")[0];
            frames[frames.length] = frame;
            frame = frame.contentWindow;

            self.frame = frame;
            self.editor = frame.document;
            editor = self.editor;

            iframeLoad(self.editor);
            frame.count = frames.length - 1;

            //html 로드후 세팅 시작

            editSetting.apply(self);
            frame.remember = {
                data: [],
                stack: 0,
                cur: 0,
                timer1: null,
                timer2: null,
                count: 0,
                undo: false,
                up: false,
                keyType: {
                    enter: false,
                    space: false,
                    alt: false,
                    shift: false,
                    ctrl: false,
                },
                undoNode: HS.find(self.toolbar, "#hs-tool-undo"),
                redoNode: HS.find(self.toolbar, "#hs-tool-redo"),
            };
            console.log("아아\n");
            console.log(self);
            return self;
        },
        exclude: function () {
            var self = this;
            i = 0;
            while ((name = arguments[i++])) {
                this.Tool[name].disable = true;
            }
            return self;
        },
        getHTML: function () {
            return this.editor.body.innerHTML;
        },
    });

    //사용자 사용 메서드 끝

    //에디터 로드 부분 관련 메서드 시작
    //iframe html로드
    function iframeLoad(editor) {
        var frameHTML =
            "<!DOCTYPE html>" +
            "<html style='height:100%' lang='ko'><head>" +
            "<link rel='stylesheet' type='text/css' href='" +
            HSset.assetsPath.frameStyle +
            "'>" +
            "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
            "</head>" +
            "<body style='height:100%;margin:0;' contenteditable='true'></body>";
        if (styleOn === false) {
            //frame css파일 가져오기
            frameStyle = document.createElement("link");
            frameStyle.href = HSset.assetsPath.frameStyle;
            frameStyle.rel = "stylesheet";
            frameStyle.type = "text/css";
            if (document.getElementsByTagName) {
                document.getElementsByTagName("head")[0].appendChild(frameStyle);
            }
            styleOn = true;
        }
        editor.open();
        editor.write(frameHTML);
        editor.close();
    }
    // editor개행세팅
    function paragraphSet() {
        var body = this.editor.body;
        body.innerHTML = "<p><br></p>";

        if (!ie9) {
            this.editor.execCommand("defaultParagraphSeparator", false, "p");
        }

        //this.editor.execCommand("insertBrOnReturn", false, "true")
        body.addEventListener("keyup", function () {
            if (this.innerHTML === "") {
                var win = windowCheck(this.ownerDocument, frames),
                    range;
                HSrange.initialize(win);
                range = HSedit.getRange(win);
                if (!range) {
                    win.document.body.focus();
                    range = HSedit.getRange(win);
                }
                this.innerHTML = "<p><br></p>";

                HSrange.start = this.children[0];
                HSrange.end = this.children[0];
                HSrange.setSel(range);
            }
        });
        if (ffOn === true) {
            body.addEventListener("keyup", function () {
                if (
                    this.childNodes[0].tagName === "<BR>" &&
                    this.childNodes[0].attributes[0].nodeName === "_moz_editor_bogus_node"
                ) {
                    this.innerHTML = "<p><br></p>";
                }
            });
        }
    }
    //frame속 editor 이벤트 세팅
    //메서드
    function windowCheck(a, b) {
        var doc;
        for (i = 0; i < b.length; i++) {
            if (a === b[i].contentWindow.document) {
                return b[i].contentWindow;
            }
        }
    }
    function setSel() {
        console.log("setSel1");
        var window = windowCheck(this, frames);
        if (window.getSelection) {
            window.range = window.getSelection().getRangeAt(0);
        }
    }
    function keydownRemember(e) {
        var win = windowCheck(this.ownerDocument, frames),
            rem = win.remember,
            undo,
            redo,
            editor = win.document.body;
        if (!(editor.textContent === "")) {
            undo = rem.undoNode;
            redo = rem.redoNode;
            if (rem.keyType.enter === true) {
                HSedit.pushRemember(win, rem, editor.innerHTML);
                HSedit.addClass(redo, "off");
                rem.keyType.enter = false;
                rem.keyType.alt = false;
                rem.keyType.ctrl = false;
                rem.keyType.shift = false;
                rem.keyType.space = false;
                return;
            }
            rem.count++;
            if (rem.count > 24) {
                HSedit.pushRemember(win, rem, editor.innerHTML, true, true);
                rem.count = 0;
                HSedit.addClass(redo, "off");
                if (HSedit.hasClass(undo, "off")) HSedit.removeClass(undo, "off");
            }
        }
    }
    function keyTypeCheck(e) {
        var win = windowCheck(this.ownerDocument, frames),
            rem = win.remember,
            type = rem.keyType;
        if (e.altKey) {
            type.alt = true;
        }
        if (e.ctrlKey) {
            type.ctrl = true;
        }
        if (e.shiftKey) {
            type.shift = true;
        }
        if (!(e.altKey || e.ctrlKey) && e.keyCode === 13) {
            type.enter = true;
        }
        if (!(e.altKey || e.ctrlKey) && e.keyCode === 20) {
            type.space = true;
        }
        if (rem.stack === 0) {
            HSedit.pushRemember(win, rem, win.document.body.innerHTML);
            rem.undo = false;
            if (HSedit.hasClass(rem.undoNode, "off")) HSedit.removeClass(rem.undoNode, "off");
        }
        var sel = win.getSelection();
        if (sel.baseNode.nodeType === 3 && sel.baseNode.length === 0) {
            var span = sel.baseNode.parentNode;
            console.dir(sel.baseNode);
            console.dir(sel.baseNode.parentNode);
            console.dir(sel.baseOffset);

            span.innerHTML = "1";

            var range = sel.getRangeAt(0);
            range.setStart(span.childNodes[0], 0);
            range.setEnd(span.childNodes[0], 1);
            sel.removeAllRanges();
            sel.addRange(range);

            return false;
            //sel.baseNode.parentNode.innerHTML = "1";
        }
    }
    function imgClick(e) {
        var test_win = windowCheck(this.ownerDocument, frames);
        console.log(test_win);
        console.log(test_win.getSelection());
        console.log(e.target);
        if (e.target.tagName === "IMG") {
            var win = windowCheck(this.ownerDocument, frames),
                range,
                parentChild;
            HSrange.initialize(win);
            range = HSedit.getRange(win);
            if (!range) {
                win.document.body.focus();
                range = HSedit.getRange(win);
            }
            parentChild = e.srcElement.parentNode.childNodes;
            i = 0;
            while (parentChild[i]) {
                if (parentChild[i] === e.srcElement) break;
                i++;
            }
            HSrange.start = e.srcElement.parentNode;
            HSrange.end = e.srcElement.parentNode;
            HSrange.startOffset = i++;
            HSrange.endOffset = i;
            HSrange.setSel(range);
        }
    }
    //메인 ( 게시판(body) 이벤트 설정 )
    function frameEditorSet() {
        var body = this.editor.body;
        if (ieOn) {
            body.ownerDocument.addEventListener("keydown", setSel);
            body.ownerDocument.addEventListener("mouseup", setSel);
        }

        //remember 키보드 세팅
        if (ffOn) {
            body.addEventListener("input", keydownRemember);
        }
        body.addEventListener("keydown", keyTypeCheck);
        body.addEventListener(ieOn ? "keydown" : "input", keydownRemember);
        body.addEventListener("click", imgClick);
    }

    // toolbar세팅

    function Box(setting) {
        var node,
            i,
            content,
            box = HSedit.domMake([
                "hs-box",
                { id: setting.id },
                [
                    "div",
                    { class: "hs-box-selecting-off hs-box" },
                    ["label", { class: "hs-normal-text hs-left" }, setting.baseText],
                    ["span", { class: "hs-box-open" }, ["img", { src: HSset.assetsPath.image + "arrow1.svg" }]],
                ],
                ["div", { class: "hs-box-list-wrap" }, ["div", { class: "hs-box-list" }]],
            ]),
            scrollEl,
            listWrap;
        this.box = box;
        listWrap = box.children[1];
        if (setting.width) {
            box.children[0].style.width = setting.width;
        }
        i = 0;
        while ((content = setting.members[i])) {
            if (content.node) {
                node = content.node;
                listWrap.children[0].appendChild(node);
            } else {
                node = HSedit.domMake(["div", { class: "hs-list-mem", title: content.title }, content.text]);
                if (content.size) {
                    node.style.fontSize = content.size;
                }
                if (content.font) {
                    node.style.fontFamily = content.font;
                }
                listWrap.children[0].appendChild(node);
            }
            if (!content.event) {
                setting.event(content[setting.eventParam], node);
            } else {
                node.addEventListener("click", content.event);
            }
            i++;
        }

        //box 이벤트 등록
        var boxOpenFun, openUpFun, closeUpFun, selectOffFun;
        selectOffFun = function (e) {
            if (e.which === 1 || e.target === window) {
                var selectBox = box.children;
                if (!(e.target === box || HSedit.contains(box, e.target)) || e.target === window) {
                    selectBox[1].style.display = "none";
                    HSedit.removeClass(selectBox[0], "hs-box-selecting-on");
                    HSedit.addClass(selectBox[0], "hs-box-selecting-off");
                    HSedit.globalEvent("mousedown", selectOffFun, false);
                } else {
                }
            }
        };
        openUpFun = function (e) {
            if (e.target === box || HSedit.contains(box, e.target)) {
                listWrap.style.display = "block";
                if (HS.find(listWrap, "hs-scroll").length === 0) {
                    scrollEl = HSScroll.make({
                        width: 11,
                        railDisplay: false,
                        scrollTarget: listWrap.children[0],
                        scrollAppendNode: listWrap,
                        //railOpacity:0.5,
                        scrollOpacity: 0.8,
                        over: {
                            scrollOpacity: 1.0,
                            railOpacity: 0.9,
                            overWidth: 14,
                        },
                        fade: true,
                        tickButton: {
                            display: false,
                        },
                    });
                }
                HSedit.globalEvent("mousedown", selectOffFun, true);
            } else {
                HSedit.removeClass(box.children[0], "hs-box-selecting-on");
                HSedit.addClass(box.children[0], "hs-box-selecting-off");
            }
            HSedit.globalEvent("mouseup", openUpFun, false);
        };
        closeUpFun = function (e) {
            if (e.which === 1) {
                if (e.target === box.children[0] || HSedit.contains(box.children[0], e.target)) {
                    box.children[1].style.display = "none";
                    HSedit.removeClass(box.children[0], "hs-box-selecting-on");
                    HSedit.addClass(box.children[0], "hs-box-selecting-off");
                    HSedit.globalEvent("mouseup", closeUpFun, false);
                }
            }
        };
        boxOpenFun = function (e) {
            if (e.which === 1) {
                if (HSedit.hasClass(this, "hs-box-selecting-off")) {
                    HSedit.removeClass(this, "hs-box-selecting-off");
                    HSedit.addClass(this, "hs-box-selecting-on");
                    HSedit.globalEvent("mouseup", openUpFun, true);
                } else if (HSedit.hasClass(this, "hs-box-selecting-on")) {
                    HSedit.globalEvent("mouseup", closeUpFun, true);
                }
            }
        };
        box.children[0].addEventListener("mousedown", boxOpenFun);
        box.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        if (setting.parent) {
            setting.parent.appendChild(box);
        }
    }

    function Opener(setting, tool, editor) {
        var self = this,
            openerPopupOpenDown,
            openerPopupOpenUp,
            openerPopupCloseDown;
        this.editor = editor.elem;
        openerPopupOpenDown = function (e) {
            if (e.which === 1) {
                if (!self.openStatus) {
                    HSedit.addClass(self.tool, "hs-tool-selecting");
                }
            }
            this.removeEventListener("mouseup", openerPopupOpenDown);
            HSedit.globalEvent("mouseup", openerPopupOpenUp, true);
        };
        openerPopupOpenUp = function (e) {
            var a;
            if (self.openStatus) {
                if (
                    HSedit.isInclude(self.tool, e.target) &&
                    !HSedit.isInclude(self.popup, e.target) &&
                    (!self.preview || !HSedit.isInclude(self.preview, e.target))
                ) {
                    self.close();
                    a = true;
                }
            } else {
                HSedit.removeClass(self.tool, "hs-tool-selecting");
                if (HSedit.isInclude(self.tool, e.target)) {
                    setting.popup(self);
                    self.open();
                    HSedit.globalEvent("mousedown", openerPopupCloseDown, true);
                    a = true;
                }
            }
            if (a) {
                self.tool.addEventListener("mousedown", openerPopupOpenDown);
                HSedit.globalEvent("mouseup", openerPopupOpenUp, false);
            }
        };
        openerPopupCloseDown = function (e) {
            if (!HSedit.isInclude(self.popup, e.target) && !HSedit.isInclude(self.tool, e.target)) {
                self.close();
                HSedit.globalEvent("mousedown", openerPopupCloseDown, false);
                self.tool.addEventListener("mousedown", openerPopupOpenDown);
            }
        };
        this.setting = setting;
        this.tool = tool;
        this.popup = tool.children[1];
        this.openStatus = false;
        tool.addEventListener("mousedown", openerPopupOpenDown);
    }
    Opener.prototype.open = function () {
        HSedit.addClass(this.tool, "hs-tool-selected");
        this.popup.style.display = "inline-block";
        //if(this.setting.start){
        //this.setting.start.call(this);
        //}
        this.openStatus = true;
    };
    Opener.prototype.close = function () {
        HSedit.removeClass(this.tool, "hs-tool-selected");
        this.popup.style.display = "none";
        if (this.setting.end) {
            this.setting.end.call(this);
        }
        if (this.preview) {
            this.tool.removeChild(this.preview);
            this.preview = undefined;
        }
        this.openStatus = false;
    };
    Opener.prototype.popSet = function (w, h, html) {
        var pop = this.popup;
        //pop.style.width=w;
        //pop.style.height=h;
        pop.innerHTML = html;
    };
    function toolbarSet() {
        var toolHtml = "",
            tool,
            wrap,
            i;
        this.toolbar.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        this.toolbar.addEventListener("dragstart", function (e) {
            e.preventDefault();
        });
        //툴이미지,이벤트 세팅
        for (i in this.Tool) {
            if (this.Tool[i].disable === false) {
                tool = document.createElement("span");
                if (this.Tool[i].img) {
                    tool.className = "hs-tool-img";
                    tool.innerHTML = this.Tool[i].img;
                    HSedit.addClass(tool.childNodes[0], "tool-img");
                    if (i === "undo" || i === "redo") {
                        HSedit.addClass(tool.childNodes[0], "off");
                    }
                } else if (this.Tool[i].box) {
                    var option = this.Tool[i];
                    tool.className = "hs-tool-box";
                    var box = new Box({
                        id: option.box.id,
                        baseText: option.base,
                        width: option.box.width,
                        members: option.contents,
                        parent: tool,
                        event: option.addEvent,
                        eventParam: option.option,
                    });
                } else if (this.Tool[i].opener) {
                    tool.className = "hs-tool-open";
                    var pop =
                        "<span class='hs-tool-opener' style='background-image:url(" +
                        HSset.assetsPath.image +
                        "toolArrow.svg)'></span><div class='hs-opener-popup'></div>";
                    tool.innerHTML = pop;
                    tool.children[0].innerHTML = this.Tool[i].opener;
                    HSedit.addClass(tool.children[0].children[0], "tool-img hs-opener-img");
                }
                if (i === "undo") {
                    wrap = document.createElement("span");
                    wrap.className = "hs-tool-wrap";
                    this.toolbar.appendChild(wrap);
                }
                if (i === "undo" || i === "redo") {
                    this.toolbar.childNodes[this.toolbar.childNodes.length - 1].appendChild(tool);
                } else {
                    this.toolbar.appendChild(tool);
                }
                if (this.Tool[i].opener) {
                    new Opener(this.Tool[i], tool, this);
                }
                if (this.Tool[i].img) tool.addEventListener("click", this.Tool[i].active);
            }
        }
    }

    //전체세팅 불러오는 메서드
    function editSetting() {
        //툴바 이미지

        toolbarSet.apply(this);

        //에디터 개행 설정

        paragraphSet.apply(this);
        frameEditorSet.apply(this);
    }

    //에디터 로드 부분 관련 메서드 끝

    if (!non) {
        window.HSedit = HSedit;
    }
});
