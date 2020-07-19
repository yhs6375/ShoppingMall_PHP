//임시 테스트용 pjax
(function () {
    var HOSUNG = {};
    HOSUNG.extend = function () {
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
    var xhr = new XMLHttpRequest();
    HOSUNG.extend({
        ajax: function (options) {
            var type,
                url,
                async,
                dataType,
                data,
                isSuccess = true,
                isLoaded = false;
            if (!options) {
                return false;
            }
            console.log(options.type);
            typeof options.type === "string" && options.type ? (type = options.type.toUpperCase()) : (type = "POST");
            typeof options.url === "string" && options.url ? (url = options.url) : (url = window.location.href);
            typeof options.async === "boolean" && options.async === false ? (async = false) : (async = true);
            typeof options.dataType === "string" && options.dataType
                ? (dataType = options.dataType.toLowerCase())
                : (dataType = "html");
            typeof options.timeout === "number" && options.timeout ? (timeout = options.timeout) : (timeout = 2000);
            if (dataType === "jsonp" && type === "POST") {
                type = "GET";
            }
            function errorProcess(errorCode) {
                if (options.error) {
                    options.error(xhr, errorCode);
                    isSuccess = false;
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 3) {
                    isLoaded = true;
                    if (dataType === "json") {
                        try {
                            xhr.parseData = JSON.parse(xhr.responseText);
                        } catch (e) {
                            //parseError error진입
                            errorProcess("parseError");
                        }
                    } else if (dataType === "xml") {
                        try {
                            xhr.parseData = new window.DOMParser().parseFromString(xhr.responseText, "text/xml");
                        } catch (e) {
                            //parseError error진입
                            errorProcess("parseError");
                        }
                    }
                    //성공시에 success함수 진입
                    if (isSuccess) {
                        if (options.success) {
                            options.success(xhr.parseData || xhr.responseText, xhr);
                        }
                    }
                } else if (xhr.readyState === 4) {
                    if (!async && xhr.status === 200) {
                        //동기방식일 경우 success가 readyState4에서 작동
                        if (dataType === "json") {
                            try {
                                xhr.parseData = JSON.parse(xhr.responseText);
                            } catch (e) {
                                //parseError error진입
                                errorProcess("parseError");
                            }
                        } else if (dataType === "xml") {
                            try {
                                xhr.parseData = new window.DOMParser().parseFromString(xhr.responseText, "text/xml");
                            } catch (e) {
                                //parseError error진입
                                errorProcess("parseError");
                            }
                        }
                        options.success(xhr.parseData || xhr.responseText, xhr);
                    } else if (!isLoaded && async) {
                        //비동기방식이고 readyState3을 거치지 않은경우
                        errorProcess("서버로부터 받을 수 없거나 응답받은 메시지가 비어있습니다.");
                    }
                    //Complete시에 작동(success,error)후에 작동
                    if (options.complete) {
                        options.complete(xhr);
                        xhr.abort();
                    }
                }
            };
            if (!async && xhr.timeout !== 0) {
                xhr.timeout = undefined;
            }
            xhr.open(type, url, async); //ajax 열기
            if (async) {
                xhr.timeout = timeout;
                xhr.ontimeout = function (e) {
                    errorProcess("timeout");
                };
            }
            if (!options.contentType) {
                if (dataType !== "multiform") {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                }
            } else {
                xhr.setRequestHeader("Content-Type", options.contentType);
            }

            if (!options.Accept) {
                if (dataType === "html") {
                    xhr.setRequestHeader("Accept", "text/html, */*; q=0.1");
                } else if (dataType === "json") {
                    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.1");
                } else if (dataType === "text") {
                    xhr.setRequestHeader("Accept", "text/plain, */*; q=0.1");
                } else if (dataType === "jsonp") {
                    xhr.setRequestHeader(
                        "Accept",
                        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.1"
                    );
                } else if (dataType === "xml") {
                    xhr.setRequestHeader("Accept", "application/xml, text/xml, */*; q=0.1");
                }
            } else {
                xhr.setRequestHeader("Accept", options.Accept); //custom Accept Header
            }
            if (options.beforeSend) {
                options.beforeSend(xhr, options);
            }
            (data = options.data) ? xhr.send(data) : xhr.send(); //ajax 시작
        },
    });

    function onPjaxpopstate(e) {
        //container 복원
        var state = e.state,
            container;
        if (state) {
            for (var i = 0; i < e.state.count + 1; i++) {
                container = document.getElementById(e.state["containerId" + i]);
                container.innerHTML = e.state["html" + i];
            }
        }
    }
    HOSUNG.pjax = function (options) {
        if (!options.container) {
            return false;
        }
        var successFun = options.success,
            beforeSendFun = options.beforeSend,
            completeFun = options.complete,
            errorFun = options.error,
            save = typeof options.save && options.save === true ? true : false,
            i;
        HOSUNG.pjax.container.push(options.container);
        options.beforeSend = function (xhr, options) {
            xhr.setRequestHeader("HS-PJAX", "true");
            if (beforeSendFun) beforeSendFun(xhr, options);
        };
        options.complete = function (xhr, type) {
            if (completeFun) completeFun(xhr, type);
        };
        options.success = function (responseText, xhr) {
            if (!HOSUNG.pjax.state) {
                HOSUNG.pjax.state = {
                    id: uniqueId() + 10,
                    url: options.url,
                    title: document.title,
                    count: 0,
                };
            } else {
                HOSUNG.pjax.state.count++;
            }
            i = HOSUNG.pjax.state.count;
            HOSUNG.pjax.state["containerId" + i] = HOSUNG.pjax.container[i].id;
            HOSUNG.pjax.state["html" + i] = responseText;
            if (!save) {
                for (i = 0; i < HOSUNG.pjax.container.length; i++) {
                    HOSUNG.pjax.container[i].innerHTML = HOSUNG.pjax.state["html" + i];
                }
                if (HOSUNG.pjax.movePage) {
                    window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title, HOSUNG.pjax.state.url);
                } else {
                    window.history.pushState(HOSUNG.pjax.state, HOSUNG.pjax.state.title);
                }
                HOSUNG.pjax.container = [];
                HOSUNG.pjax.state = null;
                HOSUNG.pjax.oldState = null;
                HOSUNG.pjax.movePage = true;
            }
            if (successFun) {
                successFun(responseText, xhr);
            }
        };
        options.error = function (xhr, status, errorType) {
            HOSUNG.pjax.container = [];
            HOSUNG.pjax.state = null;
            HOSUNG.pjax.oldState = null;
            HOSUNG.pjax.movePage = true;
            if (errorFun) errorFun(xhr, status, errorType);
        };
        options.dataType = "HTML";
        if (!HOSUNG.pjax.oldState) {
            HOSUNG.pjax.oldState = {
                id: uniqueId() + 5,
                url: window.location.href,
                title: document.title,
                count: 0,
            };
            if (!options.movePage) {
                HOSUNG.pjax.movePage = false;
            }
        } else {
            HOSUNG.pjax.oldState.count++;
        }
        i = HOSUNG.pjax.oldState.count;
        HOSUNG.pjax.oldState["containerId" + i] = HOSUNG.pjax.container[i].id;
        HOSUNG.pjax.oldState["html" + i] = HOSUNG.pjax.container[i].innerHTML;
        if (!save) {
            window.history.replaceState(HOSUNG.pjax.oldState, document.title, window.location.href);
            if (options.title) {
                options.title = document.title;
            }
        }

        HOSUNG.ajax(options);
    };
    HOSUNG.pjax.container = [];
    HOSUNG.pjax.movePage = true;
    window.addEventListener("popstate", onPjaxpopstate);
    function uniqueId() {
        return new Date().getTime();
    }
    window.HOSUNG = HOSUNG;
})();

///////////////////////////////////////////////////////////////////////////////////////////////////
(function () {
    var HSMall = {};
    HSMall.extend = function () {
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
    HSMall.extend({
        pjaxStart: function (type, target, path, cb) {
            HOSUNG.pjax({
                type: type,
                url: path,
                container: document.getElementById("contents") || document.getElementById("goods"),
                movePage: true,
                success: cb
                    ? function () {
                          cb();
                      }
                    : undefined,
                error: function (xhr, status, err) {
                    console.dir(xhr);
                    console.dir(status);
                    console.dir(err);
                },
            });
        },
        scriptLoad: function (path, location, callback) {
            if ($.isFunction(location)) {
                console.log("function 맞음");
                callback = location;
            }
            var script = document.createElement("script");
            script.src = path;
            script.onload = callback;
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        pageMove: function (url, datas, type = "post") {
            var form = document.createElement("form");
            var parm = new Array();
            var input = new Array();

            form.action = url;
            form.method = type;
            for (var key in datas) {
                parm.push([key, datas[key]]);
            }

            for (var i = 0; i < parm.length; i++) {
                input[i] = document.createElement("input");
                input[i].setAttribute("type", "hidden");
                input[i].setAttribute("name", parm[i][0]);
                input[i].setAttribute("value", parm[i][1]);
                form.appendChild(input[i]);
            }
            document.body.appendChild(form);
            form.submit();
        },
    });
    window.HSMall = HSMall;
})();
$(document).ready(function () {
    Window.NavSideW = 1;
    var sidebar_wrap = $("#sidebar-wrapper");
    function is_mobile() {
        var UserAgent = navigator.userAgent;
        if (
            UserAgent.match(
                /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
            ) != null ||
            UserAgent.match(/LG|SAMSUNG|Samsung/) != null
        ) {
            return true;
        } else {
            return false;
        }
    }
    $("#sidebar-opener").on("click", function () {
        if ($("#sidebar-wrapper").hasClass("toggled")) {
            Window.NavSideW = 0;
            sidebar_wrap.removeClass("toggled");
            $(".page-container").removeClass("toggled");
            $("#main-navbar").removeClass("toggled");
            $("#review-sidebar").removeClass("toggled");
            if (is_mobile()) {
                $("html").removeClass("pop-on");
                $("body").removeClass("pop-on");
            }
        } else {
            Window.NavSideW = 200;
            sidebar_wrap.addClass("toggled");
            $(".page-container").addClass("toggled");
            $("#main-navbar").addClass("toggled");
            $("#review-sidebar").addClass("toggled");
            if (is_mobile()) {
                $("html").addClass("pop-on");
                $("body").addClass("pop-on");
            }
        }
    });
    $(document).on("click", ".method-select .member", function () {
        var container = $(this).parent(),
            selected = container.find(".fa-check-circle-o"),
            selecting = $(this).find("i");
        if (!selecting.hasClass("fa-check-circle-o")) {
            selected.removeClass("fa-check-circle-o");
            selected.addClass("fa-circle-o");
            selecting.removeClass("fa-circle-o");
            selecting.addClass("fa-check-circle-o");
        }
    });
    $(document).on("click", "#method-member-login", function () {
        var target = $("#member-login");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.next().addClass("display-none");
        }
    });
    $(document).on("click", "#method-non-member-login", function () {
        var target = $("#non-member-shipping-check");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.prev().addClass("display-none");
        }
    });
    $(document).on("click", "#method-phone", function () {
        var target = $("#finding-phone");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.next().addClass("display-none");
        }
    });
    $(document).on("click", "#method-email", function () {
        var target = $("#finding-email");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.prev().addClass("display-none");
        }
    });
    $(document).on("click", "#method-phone-pass", function () {
        var target = $("#pass-finding-phone");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.next().addClass("display-none");
        }
    });
    $(document).on("click", "#method-email-pass", function () {
        var target = $("#pass-finding-email");
        if (target.hasClass("display-none")) {
            target.removeClass("display-none");
            target.prev().addClass("display-none");
        }
    });
    $(document).on("click", ".check-box-container", function () {
        var check = $(this).find("img");
        if (check.hasClass("display-none")) {
            check.removeClass("display-none");
        } else {
            check.addClass("display-none");
        }
    });
    //여기까지가 퍼블리싱 코드

    //페이지 이동 코드(임시 테스트용)
    function test_code(target, path) {
        $(document).on("click", target, function () {
            HOSUNG.pjax({
                type: "get",
                url: path,
                container: document.getElementById("contents") || document.getElementById("goods"),
                movePage: true,
            });
        });
    }

    test_code("#find-account-id", "./idfind");
    test_code("#find-account-pass", "./passfind");
    //test_code("#register-page","./register.php");
    test_code("#shopping-cart-but", "./shopping_cart");
    test_code("#go-buy-page", "./order");
    $(document)
        .on("click", "#register-user", function () {
            if (is_mobile()) {
                HSMall.pjaxStart("GET", "#register-user", "/m_join_term");
            } else {
                HSMall.pjaxStart("GET", "#register-user", "/join_term");
            }
            HSMall.scriptLoad("assets/js/user_register.js");
        })
        .on("click", "#sign-in-but", function () {
            HSMall.scriptLoad("//developers.kakao.com/sdk/js/kakao.min.js");
            HSMall.pjaxStart("GET", "#sign-in-but", "./login");
        });
    $(document).on("click", ".sidebar-child-brand label", function () {
        var self = $(this),
            id = self.attr("data-num");
        HSMall.pageMove("/category/" + id, { m: 0 }, "get");
    });
});
