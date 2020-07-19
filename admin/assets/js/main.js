(function () {
    function waitForWebfonts(fonts, callback) {
        var loadedFonts = 0;
        for (var i = 0, l = fonts.length; i < l; ++i) {
            (function (font) {
                var node = document.createElement("span");
                node.innerHTML = "giItT1WQy@!-/#";
                node.style.position = "absolute";
                node.style.left = "-10000px";
                node.style.top = "-10000px";
                node.style.fontSize = "300px";
                node.style.fontFamily = "sans-serif";
                node.style.fontVariant = "normal";
                node.style.fontStyle = "normal";
                node.style.fontWeight = "normal";
                node.style.letterSpacing = "0";
                console.log(document.body.appendChild);
                document.body.appendChild(node);
                var width = node.offsetWidth;
                node.style.fontFamily = font;

                var interval;
                function checkFont() {
                    if (node && node.offsetWidth != width) {
                        ++loadedFonts;
                        node.parentNode.removeChild(node);
                        node = null;
                    }
                    if (loadedFonts >= fonts.length) {
                        if (interval) {
                            clearInterval(interval);
                        }
                        if (loadedFonts == fonts.length) {
                            callback();
                            return true;
                        }
                    }
                }

                if (!checkFont()) {
                    interval = setInterval(checkFont, 50);
                }
            })(fonts[i]);
        }
    }
    window.hsscript = {};
    window.addEventListener("load", function () {
        console.time("test");

        waitForWebfonts(["Material Icons Outlined"], function () {
            $("#container").removeClass("hidden");
            console.timeEnd("test");
        });
    });
    function autoHeightAnimate(element, time) {
        var curHeight = element.height(), // Get Default Height
            autoHeight = element.css("height", "auto").height(); // Get Auto Height
        console.log(curHeight);
        console.log(autoHeight);
        element.height(curHeight); // Reset to Default Height
        element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
    }
    function rippleButtonMouseUp(e) {
        var self = $(this),
            ripple = self.find("ripple");
        if (!ripple.hasClass("animating")) {
            self.off("mouseup", rippleButtonMouseUp);
            self.off("mouseout", rippleButtonMouseUp);
            ripple.removeClass("on");
            self.on("mousedown", rippleButtonMouseDown);
        } else {
            ripple.addClass("out");
        }
    }
    function rippleButtonMouseDown(e) {
        var self = $(this);
        if (!self.hasClass("on")) {
            self.off("mousedown", rippleButtonMouseDown);
            var x, y, ripple;
            x = e.pageX - self.offset().left;
            y = e.pageY - self.offset().top;
            radius = self.width() > self.height() ? self.height() : self.width();
            ripple = self.find("ripple");
            ripple.css("width", radius);
            ripple.css("height", radius);
            ripple.addClass("on").css({
                left: x,
                top: y,
            });
            ripple.addClass("animating");
            setTimeout(function () {
                ripple.removeClass("animating");
                if (ripple.hasClass("out")) {
                    ripple.removeClass("on");
                    ripple.removeClass("out");
                    self.off("mouseup", rippleButtonMouseUp);
                    self.off("mouseout", rippleButtonMouseUp);
                    self.on("mousedown", rippleButtonMouseDown);
                }
            }, 500);
            self.on("mouseout", rippleButtonMouseUp);
            self.on("mouseup", rippleButtonMouseUp);
        }
    }
    $(".button-ripple").on("mousedown", rippleButtonMouseDown);

    $(document).on("click", ".tab-member", function () {
        var tabTarget = $(this);
        if (!tabTarget.hasClass("select")) {
            var tabOriginal = tabTarget.parent().find(".select");
            var originalIndex = tabOriginal.index(),
                newIndex = tabTarget.index(),
                bodyContainer = tabOriginal.parent().parent().next(),
                bodyOriginal = bodyContainer.children().eq(originalIndex),
                bodyTarget = bodyContainer.children().eq(newIndex);
            inkBar = $(".tab-ink-bar");
            inkBar.css("left", this.offsetLeft);
            var i, el;
            tabOriginal.removeClass("select");
            tabTarget.addClass("select");
            bodyOriginal.removeClass("select");
            bodyTarget.addClass("select");
            if (originalIndex < newIndex) {
                bodyTarget.removeClass("next");
                bodyOriginal.addClass("prev");
                el = bodyOriginal;
                for (i = 0; i < newIndex - originalIndex - 1; i++) {
                    el = el.next();
                    el.removeClass("next");
                    el.addClass("prev");
                }
            } else {
                bodyTarget.removeClass("prev");
                bodyOriginal.addClass("next");
                el = bodyOriginal;
                for (i = 0; i < originalIndex - newIndex - 1; i++) {
                    el = el.prev();
                    el.removeClass("prev");
                    el.addClass("next");
                }
            }
        }
    });

    $("#sidebar-button").on("click", function () {
        var sidebar = $("sidebar");
        if (sidebar.hasClass("closed") && sidebar.hasClass("close")) {
            sidebar.removeClass("closed");
            sidebar.removeClass("close");
            sidebar.addClass("open");
        }
    });
    $("#sidebar-close").on("click", function () {
        var sidebar = $("sidebar");
        if (sidebar.hasClass("open")) {
            sidebar.removeClass("open");
            sidebar.addClass("close");
            setTimeout(function () {
                sidebar.addClass("closed");
            }, 150);
        }
    });
    $("sidebar").on("mouseover", function () {
        var self = $(this);
        if (!self.hasClass("fixed")) {
            self.removeClass("folded");
            self.addClass("unfolded");
        }
    });
    $("sidebar").on("mouseout", function () {
        var self = $(this);
        if (!self.hasClass("fixed")) {
            self.removeClass("unfolded");
            self.addClass("folded");
        }
    });

    $("#sidebar-fold").on("click", function () {
        var sidebar = $("sidebar");
        if (sidebar.hasClass("fixed")) {
            setTimeout(function () {
                sidebar.removeClass("fixed");
            }, 150);
            sidebar.removeClass("unfolded");
            sidebar.addClass("folded");
        } else {
            sidebar.addClass("fixed");
        }
    });
    $(".group-item-title").on("click", function () {
        var item_list = $(this).next(),
            container = $(this).parent();
        if (container.hasClass("open")) {
            container.removeClass("open");
            item_list.animate({ height: 0 }, 200);
        } else {
            container.addClass("open");
            autoHeightAnimate(item_list, 200);
        }
    });
    //사이드바에서 page이동시 아이템을 클릭한다.
    $("sidebar .item").on("click", function () {
        var self = $(this);
        if (!self.hasClass("selected")) {
            var categoryName = $(this).attr("category"),
                url,
                success = true;
            console.log(categoryName);
            //analytics페이지 클릭시 3개의 자바스크립트파일을 추가로 로드한다.
            if (categoryName == "analytics") {
                url = "/dashboard/analytics";
                HSAdmin.pjaxStart("GET", "content-container", url, function () {
                    $("sidebar .item.selected").removeClass("selected");
                    self.addClass("selected");
                    HSWeb.LoadScript("/assets/js/Chart.min.js", "chart-lib", false);
                    HSWeb.LoadScript("/assets/js/chart/chartUtil.js", "chart-util", false);
                    var success = HSWeb.LoadScript(
                        "/assets/js/chart/chartPage.js",
                        function () {
                            analyticsPageLoadChart();
                        },
                        "chart-page",
                        false
                    );
                    if (!success) analyticsPageLoadChart();
                    //analyticsPageLoadChart();
                });
            } else if (categoryName == "products") {
                url = "/products";
                HSAdmin.pjaxStart("GET", "content-container", url, function () {
                    $("sidebar .item.selected").removeClass("selected");
                    self.addClass("selected");
                });
            } else if (categoryName == "category") {
                url = "/category";
                HSAdmin.pjaxStart(
                    "GET",
                    "content-container",
                    url,
                    function () {
                        $("sidebar .item.selected").removeClass("selected");
                        self.addClass("selected");
                        PageDetail.script.categoryScript();
                        PageDetail.script.removeScript = PageDetail.script.removeCategoryScript;
                    },
                    function () {
                        console.log("으아아아아");
                    }
                );
            } else {
                success = false;
            }
            if (success) {
                console.log(url);
            }
        }
    });

    /*카테고리 이벤트 관련*/
    //메인카테고리 html 세팅
    function setMainCategoryHTML(node, textNode, categoryRange, categoryPage, cb) {
        if (!categoryRange === undefined) {
            categoryRange = HS.urlParameterExtract("r");
            if (categoryRange === null) {
                categoryRange = 5;
            }
        }
        if (!categoryPage === undefined) {
            categoryPage = HS.urlParameterExtract("c");
            if (categoryPage === null) {
                categoryPage = 0;
            }
        }
        categoryStart = categoryRange * categoryPage;
        var url = "/category?r=" + categoryRange + "&c=" + categoryPage;
        HSAdmin.pjaxStart("get", "content-container", url, function () {});
    }
    //카테고리 추가 이벤트 함수
    function categoryAdd(e) {
        var self = $(this),
            categoryOptionContainer = self.prev(),
            inputName = categoryOptionContainer.find(".name"),
            inputOrder = categoryOptionContainer.find(".order"),
            inputParentCategory = categoryOptionContainer.find(".parent"),
            name = inputName.val().trim(),
            order = inputOrder.val().trim(),
            parentCategory = inputParentCategory.val().trim();
        if (parentCategory == "") {
            $.ajax({
                url: "/manage/category",
                type: "post",
                dataType: "json",
                data: "t=1&n=" + name + "&o=" + order,
                success: function (data) {
                    console.log(data);
                    if (!data.error) {
                        location.reload(true);
                    }
                },
                error: function (xhr, status, err) {
                    console.log("실패..");
                },
                complete: function () {
                    inputName.val("");
                    inputOrder.val("");
                },
            });
        } else {
            $.ajax({
                url: "/manage/category",
                type: "post",
                dataType: "text",
                data: "t=2&m=" + name + "&o=" + order + "&i=" + parentCategory,
                success: function (data) {
                    console.log(data);
                    if (!data.error) {
                        location.reload(true);
                    }
                },
                error: function (xhr, status, err) {
                    console.log("실패..");
                },
                complete: function () {
                    inputName.val("");
                    inputOrder.val("");
                },
            });
        }
    }
    function mainCategoryNameModifyOn(e) {
        var self = $(this),
            text = self.children().eq(0),
            input = self.children().eq(1);
        text.hide();
        input.val(text.html());
        input.show();
        input.focus();
        input.select();
    }
    function mainCategoryNameModifyOff(e) {
        var self = $(this),
            text = self.prev(),
            idx = self.parent().prev().html(),
            name = self.val().trim();
        self.hide();
        text.show();
        categoryModifyName(idx, name, function () {
            text.html(name);
        });
    }
    function mainCategoryNameModifyOffKeyDown(e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    }
    //카테고리 수정(이름)
    function categoryModifyName(id, name, parentId, cb) {
        if (typeof parentId == "function") {
            cb = parentId;
            parentId = null;
        }
        console.log(id);
        console.log(name);
        console.log(parentId);
        if (!parentId) {
            console.log("여기");
            $.ajax({
                url: "/manage/category",
                type: "put",
                dataType: "json",
                data: JSON.stringify({ t: 3, i: id, n: name }),
                success: function (data) {
                    console.log(data);
                    cb();
                },
                error: function (xhr, status, err) {
                    console.log("실패..");
                },
                complete: function () {},
            });
        } else {
            $.ajax({
                url: "/manage/category",
                type: "put",
                dataType: "json",
                data: "t=4&j=" + id + "&n=" + name + "&i=" + parentId,
                success: function (data) {
                    console.log(data);
                },
                error: function (xhr, status, err) {
                    console.log("실패..");
                },
                complete: function () {},
            });
        }
    }
    //서브 카테고리 펼치는 이벤트 함수
    function subCategoryExpand(e) {
        var self = $(this),
            idx = self.parent().children().eq(0).html(),
            subTableContainer = self.parent().parent().next();
        if (self.attr("loaded") === undefined) {
            getSubCategoryList(idx, function (categoryList) {
                categoryList.forEach(function (category) {
                    var html =
                        '<div class="table-row">' +
                        '<div class="table-row-cell column-id">' +
                        category.id +
                        "</div>" +
                        '<div class="table-row-cell category-name flex-center">' +
                        '<div class="text-ellipsis">' +
                        category.name +
                        "</div>" +
                        '<input type="text" style="display:none" />' +
                        "</div>" +
                        '<div class="table-row-cell column-number category-order">' +
                        "<span>" +
                        category.order +
                        "</span>" +
                        '<input type="number" style="display:none" />' +
                        "</div>" +
                        '<div class="table-row-cell column-number"></div>' +
                        '<div class="table-row-cell category-goods">' +
                        "<u>" +
                        category.goodsCount +
                        "</u>" +
                        "<mat-icon>expand_more</mat-icon>" +
                        "</div>" +
                        '<div class="table-row-cell"></div>' +
                        "</div>";
                    subTableContainer.append(html);
                });
                self.children().html("expand_less");
                subTableContainer.show();
                self.attr("loaded", "");
                self.attr("status", "more");
            });
        } else {
            self.children().html("expand_less");
            subTableContainer.show();
            self.attr("status", "more");
        }
    }
    //서브 카테고리 가져오기
    function getSubCategoryList(idx, cb) {
        $.ajax({
            url: "/manage/category",
            type: "get",
            dataType: "json",
            data: "t=2&i=" + idx,
            success: function (data) {
                cb(data.categoryList);
            },
            error: function (xhr, status, err) {
                console.log("실패..");
            },
            complete: function () {},
        });
    }
    //서브 카테고리 접기 이벤트 함수
    function subCategoryContract() {
        var self = $(this),
            subCategoryContainer = self.parent().parent().next();
        subCategoryContainer.hide();
        self.children().html("expand_more");
        self.attr("status", "less");
    }
    //카테고리 세부설정 페이지 이동
    function categoryMainIDClickEvent() {
        var self = $(this),
            id = self.html();
        categoryDetailPageMove(id, false);
    }
    function categorySubIDClickEvent() {
        var self = $(this),
            id = self.html();
        categoryDetailPageMove(id, true);
    }
    function categoryDetailPageMove(id, sub) {
        HSAdmin.pjaxStart("GET", "content-container", "/category/" + id + "?s=" + (sub ? 2 : 1), function () {
            $("sidebar .item.selected").removeClass("selected");
            PageDetail.script.categoryDetailScript();
            //PageDetail.script.removeScript = PageDetail.script.removeCategoryScript;
        });
    }
    function categoryPrev() {
        var self = $(this),
            categoryTableBody = $("#category-table-body"),
            categoryRange = HS.urlParameterExtract("r"),
            categoryPage = HS.urlParameterExtract("c"),
            rangeText = self.parent().children().eq(0);
        if (categoryRange === null) categoryRange = 5;
        if (categoryPage === null) categoryPage = 0;
        categoryPage--;
        setMainCategoryHTML(categoryTableBody, rangeText, categoryRange, categoryPage, function () {
            var parameters = "r=" + categoryRange + "&c=" + categoryPage;
            window.history.replaceState(null, "", window.location.pathname + "?" + parameters);
        });
    }
    function categoryNext() {
        var self = $(this),
            categoryTableBody = $("#category-table-body"),
            categoryRange = HS.urlParameterExtract("r"),
            categoryPage = HS.urlParameterExtract("c"),
            rangeText = self.parent().children().eq(0);
        if (categoryRange === null) categoryRange = 5;
        if (categoryPage === null) categoryPage = 0;
        categoryPage++;
        setMainCategoryHTML(categoryTableBody, rangeText, categoryRange, categoryPage, function () {
            var parameters = "r=" + categoryRange + "&c=" + categoryPage;
            window.history.replaceState(null, "", window.location.pathname + "?" + parameters);
        });
    }
    /*새 상품 추가 이벤트 관련*/
    var newProductInfo, newProductEditor;
    //새 상품 추가 버튼을 누를 경우
    $(document).on("click", "#new-product-add-button", function () {
        // /products/new 페이지로 이동 후 editor에 필요한 자바스크립트 로드
        HSAdmin.pjaxStart("GET", "content-container", "/products/new", function () {
            $("sidebar .item.selected").removeClass("selected");
            PageDetail.script.newProductScript();
            PageDetail.script.removeScript = PageDetail.script.removeNewProductScript;
        });
    });
    function newProductConfirm(e) {
        var tabBodyContainer = $("#new-product-tab .tab-body-container"),
            tabBody_info = tabBodyContainer.children(0),
            tabBody_image = tabBody_info.next(),
            tabBody_price = tabBody_image.next(),
            tabBody_stock = tabBody_price.next(),
            tabBody_attr = tabBody_stock.next(),
            tabBody_category = tabBody_attr.next();
        console.dir(e.data);
        newProductInfo.name = encodeURIComponent(tabBody_info.children().eq(0).find("input").val());
        newProductInfo.html = encodeURIComponent(newProductEditor.getHTML());
        newProductInfo.price = tabBody_price.children().eq(0).find("input").val();
        newProductInfo.discount = tabBody_price.children().eq(1).find("input").val();
        newProductInfo.shipping = tabBody_price.children().eq(2).find("input").val();
        newProductInfo.saved = tabBody_price.children().eq(3).find("input").val();
        newProductInfo.stock = tabBody_stock.children().eq(0).find("input").val();
        newProductInfo.categoryId = tabBody_category.children().eq(0).find("input").val();
        newProductInfo.subCategoryId = tabBody_category.children().eq(1).find("input").val();
        $.ajax({
            url: "/manage/product",
            type: "post",
            dataType: "text",
            data: { t: 1, i: JSON.stringify(newProductInfo) },
            success: function (data) {
                console.log(data);
                //HS.pageMove("/product", {}, "get");
            },
            error: function (xhr, status, err) {
                console.log("실패..");
            },
            complete: function () {},
        });
    }
    function newProductImageUpload(event) {
        HS.File.Upload.imageFileUpload(
            {
                url: "/products/new/image",
                maxSize: 7340032, //7MB
                imageResize: {
                    maxWidth: 350,
                    maxHeight: 350,
                    keepAspectRatio: true,
                    sizeup: false,
                },
                success: function (info) {
                    $(".product-main-image-preview img")[0].src = info.files[0].name;
                    newProductInfo.mainImage = encodeURIComponent(info.files[0].name);
                },
            },
            event
        );
    }
    //옵션찾기
    function findOption(mainOptionName) {
        var result;
        newProductInfo.options.some(function (option) {
            if (option.main == mainOptionName) {
                result = option;
                return true;
            }
            return false;
        });
        return result;
    }
    function findOptionIndex(mainOptionName) {
        var i;
        for (i = 0; i < newProductInfo.options.length; i++) {
            if (newProductInfo.options[i].main == mainOptionName) {
                return i;
            }
        }
        return -1;
    }
    //메인옵션 추가 이벤트 함수
    function optionAdd(e) {
        var self = $(this),
            input = self.next().find("input"),
            name = input.val().trim(),
            option2Container = $(".np-option2-container"),
            html =
                '<div class="np-option-box">' +
                '<div class="np-option-header">' +
                '<div class="np-option-title flex-normal-row p-8">' +
                '<div class="flex-size1">' +
                name +
                "</div>" +
                '<div class="option-delete button-wrapper flex-right" style="width:28px;">' +
                '<mat-icon style="font-size:28px; width:auto;">clear</mat-icon>' +
                "</div>" +
                "</div>" +
                '<div class="option1-add flex-normal-row">' +
                '<div class="button-wrapper sub-option-add" style="width:28px;">' +
                '<mat-icon style="font-size:28px; width:auto;">add</mat-icon>' +
                "</div>" +
                '<input type="text" />' +
                "</div>" +
                "</div>" +
                '<div class="np-option-body">' +
                "</div>";
        if (name == "") {
            alert("옵션은 최소 한 글자는 입력해주세요.");
            return;
        }
        if (!findOption(name)) {
            option2Container.append(html);
            newProductInfo.options.push({ main: name, sub: new Array() });
        }
    }
    //메인옵션 삭제 이벤트 함수
    function optionDelete() {
        var self = $(this),
            name = self.prev()[0].innerHTML,
            idx;
        self.parent().parent().parent().remove();
        idx = findOptionIndex(name);
        if (idx > -1) newProductInfo.options.splice(idx, 1);
    }
    //서브옵션 추가 이벤트 함수
    function option2Add() {
        var self = $(this),
            input = self.next(),
            name = input.val().trim(),
            header = self.parent().parent(),
            body = header.next(),
            mainOptionName = header.children(0).children(0)[0].textContent,
            mainOption,
            html =
                '<div class="np-option-sub">' +
                '<div class="sub-name">' +
                name +
                "</div>" +
                '<input class="sub-name-modify" style="display:none" type="text" />' +
                '<div class="button-wrapper modify" style="width:24px;">' +
                '<mat-icon style="font-size:18px; width:auto;">edit</mat-icon>' +
                "</div>" +
                '<div class="button-wrapper delete" style="width:24px;">' +
                '<mat-icon style="font-size:18px; width:auto;">clear</mat-icon>' +
                "</div>" +
                "</div>";
        if (name == "") {
            alert("옵션은 최소 한 글자는 입력해주세요.");
            return;
        }
        body.append(html);
        input.val("");
        mainOption = findOption(mainOptionName);
        mainOption.sub.push(name);
    }
    //서브옵션 삭제 이벤트 함수
    function newProductSubOptionMouseOver() {
        var self = $(this);
        self.find(".button-wrapper").css("visibility", "visible");
    }
    function newProductSubOptionMouseOut() {
        var self = $(this);
        $(this).find(".button-wrapper").css("visibility", "hidden");
    }
    function newProductSubOptionModify() {
        var self = $(this),
            nInput = self.prev(),
            nLabel = nInput.prev();
        self.hide();
        nInput.show();
        nLabel.hide();
    }
    function option2Delete() {
        var self = $(this),
            parent = self.parent(),
            header = parent.parent().parent().children(0),
            mainOptionName = header.children(0).children(0)[0].textContent,
            mainOption,
            idx = parent.index();
        parent.remove();
        mainOption = findOption(mainOptionName);
        mainOption.sub.splice(idx, 1);
    }
    window.PageDetail = {
        removeScript: null,
    };
    window.PageDetail.script = {
        defaultScript: function () {
            HSScroll.make({
                width: 11,
                railDisplay: false,
                scrollTarget: document.getElementById("content-container"),
                scrollAppendNode: document.getElementById("container"),
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
        },
        categoryScript: function () {
            if (!window.hsscript.category) {
                window.hsscript.category = true;

                //메인 카테고리 추가 이벤트
                $(document).on("click", "#category-add", categoryAdd);
                //메인 카테고리 이름 수정 이벤트
                $(document).on("click", ".category-name", mainCategoryNameModifyOn);
                $(document).on("focusout", ".category-name input", mainCategoryNameModifyOff);
                $(document).on("keydown", ".category-name input", mainCategoryNameModifyOffKeyDown);

                //서브 카테고리 펼치기
                $(document).on("click", '.category-expand[status="less"]', subCategoryExpand);
                $(document).on("click", ".category-expand[status='more']", subCategoryContract);

                //카테고리 세부설정 페이지 이동
                $(document).on("click", "#category-content .main-table .column-id", categoryMainIDClickEvent);
                $(document).on("click", "#category-content .sub-table .column-id", categorySubIDClickEvent);

                //다음 카테고리 보기
                $(document).on("click", "#category-content #page-prev", categoryPrev);
                $(document).on("click", "#category-content #page-next", categoryNext);
            }
        },
        removeCategoryScript: function () {
            //메인 카테고리 추가 이벤트
            $(document).off("click", "#category-add", categoryAdd);
            //메인 카테고리 이름 수정 이벤트
            $(document).off("click", ".category-name", mainCategoryNameModifyOn);
            $(document).off("focusout", ".category-name input", mainCategoryNameModifyOff);
            $(document).off("keydown", ".category-name input", mainCategoryNameModifyOff);
        },
        categoryDetailScript: function () {},
        //새 상품 추가 스크립트
        newProductScript: function () {
            if (!window.hsscript.newProduct) {
                window.hsscript.newProduct = true;
                var productEditorElement = document.getElementById("product-editor");
                newProductInfo = {};
                PageDetail.script.defaultScript();
                HSWeb.LoadScript("/assets/js/HSeditor/HSedit-config.js", "hsedit_config", false);
                HSWeb.LoadScript(
                    "/assets/js/HSeditor/HSedit-with.js",
                    function () {
                        newProductEditor = HSedit().load(productEditorElement);
                    },
                    "hsedit",
                    false
                );
                newProductInfo.options = new Array();
                //상품 추가 완료버튼 클릭 이벤트
                $(document).on("click", "#new-product-confirm", newProductConfirm);
                //상품 이미지 추가 이벤트
                $(document).on("change", "#product-main-image-selector", newProductImageUpload);

                //옵션 추가 이벤트
                $(document).on("click", "#option1-add", optionAdd);
                //옵션 삭제 이벤트
                $(document).on("click", ".option-delete", optionDelete);
                //서브옵션 추가 이벤트
                $(document).on("click", ".sub-option-add", option2Add);
                //서브옵션 삭제 이벤트
                $(document).on("click", ".np-option-sub .delete", option2Delete);
                //서브옵션 마우스오버 이벤트
                $(document).on("mouseenter", ".np-option-sub", newProductSubOptionMouseOver);
                $(document).on("mouseleave", ".np-option-sub", newProductSubOptionMouseOut);
                //서브옵션 수정 버튼 이벤트
                $(document).on("click", ".np-option-sub .modify", newProductSubOptionModify);
            }
        },
        removeNewProductScript: function () {
            $(document).off("change", "#product-main-image-selector", newProductImageUpload);
            $(document).off("mouseenter", ".np-option-sub", newProductSubOptionMouseOver);
            $(document).off("mouseleave", ".np-option-sub", newProductSubOptionMouseOut);
        },
    };
})();
