(function () {
    "use strict";
    var $errorbar,
        testExp,
        expcheck = {
            korcheck: function (arg, sLength, eLength, only) {
                if (arg.length < sLength || arg.length > eLength) {
                    return false;
                }
                if (!only) {
                    testExp = new RegExp("^[가-힣]");
                } else {
                    testExp = new RegExp("[가-힣]");
                }
                return !testExp.test(arg);
            },
            engcheck: function (arg, sLength, eLength, only) {
                if (arg.length < sLength || arg.length > eLength) {
                    return false;
                }
                if (!only) {
                    testExp = new RegExp("^[a-z]");
                } else {
                    testExp = new RegExp("[a-z]");
                }
                return !testExp.test(arg);
            },
            korengcheck: function (arg, sLength, eLength, only) {
                if (arg.length < sLength || arg.length > eLength) return false;
                if (!only) {
                    testExp = new RegExp("[^가-힣a-z]");
                } else {
                    testExp = new RegExp("[가-힣a-z]");
                }
                return !testExp.test(arg);
            },
            engnumcheck: function (arg, sLength, eLength) {
                if (arg.length < sLength || arg.length > eLength) return true;
                return /[^a-z0-9]/i.test(arg);
            },
            passwordexp: function (arg, sLength, eLength, only) {
                if (only) {
                    testExp = new RegExp("[^a-z!@#$%^&*()-_=+\\|'\"[]{}`~/?;:,.<>d]", "i");
                    return testExp.test(arg);
                }
                var chkCount = 0;
                if (arg.length < sLength || arg.length > eLength) return false;
                //소문자,특수문자,숫자
                testExp = new RegExp("[^a-z!@#$%^&*()-_=+\\|'\"[]{}`~/?;:,.<>d]", "i");
                if (testExp.test(arg)) return false;
                if (/[a-z]/.test(arg)) chkCount++;
                if (/[A-Z]/.test(arg)) chkCount++;
                if (/[!@#$%^&*()\-_=+\\|\'\"\[\]\{\}`~\/?;:,.<>]/.test(arg)) chkCount++;
                if (/[\d]/.test(arg)) chkCount++;
                if (chkCount < 3) {
                    return false;
                }
                return true;
            },
            compareval: function (arg1, arg2) {
                testExp = new RegExp("(" + arg2 + ")", "g");
                return testExp.test(arg1);
            },
            emailexp: function (arg) {
                testExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
                return testExp.test(arg);
            },
            phoneexp: function (arg) {
                testExp = /^(01)[016789][0-9]{7,8}/;
                return testExp.test(arg);
            },
        },
        $doc = $(document);
    var input = $(".wrap-input .input");

    $(".input").each(function () {
        $(this).on("blur", function () {
            if ($(this).val().trim() != "") {
                $(this).addClass("has-val");
            } else {
                $(this).removeClass("has-val");
            }
        });
    });
    $("#login-but").on("click", function (e) {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (input[i].value === "") {
                showValidate(input[i], "UserID is required");
                check = false;
            } else if (validate(input[i]) == false) {
                showValidate(input[i], "UserID must be email");
                check = false;
            }
        }
        if (check) {
            var member_info = new Array();
            member_info.push(encodeURIComponent($("#id-input").val()), encodeURIComponent($("#pass-input").val()));
            $.ajax({
                url: "/user/login",
                type: "post",
                dataType: "json",
                data: "dbin=" + member_info,
                success: function (data) {
                    console.log(data);
                    check = false;
                    if (data.error) {
                        check = false;
                        HS.pageMove("/login", {
                            err: {
                                type: data.error.type,
                            },
                        });
                    } else {
                        check = false;
                        HS.pageMove("/dashboard/analytics", {}, "get");
                    }
                },
                error: function (xhr, status, err) {
                    check = false;
                    console.log(xhr);
                    console.log(status);
                    console.log(err);
                },
            });
        }
        e.stopPropagation();
        return false;
    });

    $(".validate-form .input").on("focus", function () {
        hideValidate(this);
    });

    function validate(input) {
        if ($(input).hasId("id-input")) {
            if (!expcheck.emailexp(input.value)) {
                return false;
            }
        } else {
            if ($(input).val().trim() == "") {
                return false;
            }
        }
        return true;
    }

    function showValidate(input, msg) {
        var thisAlert = $(input).parent();
        $(thisAlert).attr("data-validate", msg);
        $(thisAlert).addClass("alert-validate");
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass("alert-validate");
    }
})();
