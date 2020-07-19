(function () {
    var HS = {},
        HSAdmin = {};
    HS.extend = HSAdmin.extend = function () {
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
    HS.extend({
        /*url 파라미터 가져오는 함수
            key: string 가져올 파라미터 키
            url: string url(default:window.location.href)
        */
        urlParameterExtract: function (key, url) {
            if (typeof url === "undefined") url = window.location.href;
            var match = url.match("[?&]" + key + "=([^&]+)");
            return match ? match[1] : null;
        },
        /*post데이터를 가지고 페이지 이동 함수
            url: string 페이지명 ex) "/dashboard/analytics"
            datas: object 전송할 데이터
            type: string 타입 ex) "get"
        */
        pageMove: function (url, datas, type) {
            if (type === undefined) type = "post";
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
        /*cookie를 parsing해 원하는 데이터를 뽑아오는 함수
            name: string 쿠키 이름
        */
        getCookie: function (name) {
            var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
            return value ? value[2] : null;
        },
        getUserStruct: function () {
            return {
                d: {
                    n: HS.getCookie("n"),
                    at: HS.getCookie("at"),
                    rt: HS.getCookie("rt"),
                },
            };
        },
    });
    HSAdmin.extend({
        pjaxStart: function (type, target, path, cb, scriptFunction) {
            HOSUNG.pjax({
                type: type,
                url: path,
                container: document.getElementById(target),
                script: scriptFunction,
                movePage: true,
                success: cb
                    ? function (responseText, xhr) {
                          cb(responseText, xhr);
                      }
                    : undefined,
                error: function (xhr, status, err) {
                    console.dir(xhr);
                    console.dir(status);
                    console.dir(err);
                },
            });
        },
    });
    window.HSAdmin ? window.HSAdmin.extend(HSAdmin) : (window.HSAdmin = HSAdmin);
    console.log(window.HS);
    window.HS ? window.HS.extend(HS) : (window.HS = HS);
})();
