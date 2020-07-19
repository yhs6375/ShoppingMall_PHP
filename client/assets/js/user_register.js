(function () {
    var S_FORM_ID = "input:text#reg-form-id",
        S_FORM_PASSWORD = "input:password#reg-form-password",
        S_FORM_PASSWORD_CONFIRM = "input:password#reg-form-password-confirm",
        S_FORM_EMAIL = "input:text#reg-form-email",
        S_FORM_SMS1 = "input:text#reg-form-sms1",
        S_FORM_SMS2 = "input:text#reg-form-sms2",
        S_FORM_SMS3 = "input:text#reg-form-sms3",
        S_EMAIL_RECEIVE = "div#email-agress",
        S_SMS_RECEIVE = "div#sms-agress",
        S_REGISTER_SUCCESS_PAGE = "div#register-success-page";

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

    var terms_1 = false,
        terms_2 = false,
        is_id_overlap = true,
        id_err = 1,
        is_sms_overlap = true,
        sms_err = 1;
    function idCheck(cb) {
        $.ajax({
            url: "/user/id_overlap",
            type: "get",
            dataType: "json",
            data: "idcheck=" + encodeURIComponent($(S_FORM_ID).val()),
            success: function (data) {
                console.log(data);
                if (data == 3498343) {
                    console.log("what?");
                }
                if (data.error) {
                    alert("알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
                } else {
                    cb(data.code);
                }
            },
            error: function (xhr, status, err) {
                console.dir(xhr);
                console.log(status);
                console.log(err);
                alert("알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
            },
        });
    }
    function passwordCheck(el_form) {
        var thisval = el_form.val(),
            idval = $(S_FORM_ID).val();
        if (thisval) {
            if (expcheck.compareval(thisval, idval) && idval.length >= 6) {
                return 2;
            } else if (expcheck.passwordexp(thisval, 8, 20, true)) {
                return 3;
            } else if (!expcheck.passwordexp(thisval, 8, 20)) {
                return 4;
            }
            return 0;
        } else {
            return 1;
        }
    }
    function passwordConfirmCheck(el_form) {
        var thisval = el_form.val(),
            passval = $(S_FORM_PASSWORD).val();
        if (passval.length === 0) {
            return 1;
        }
        if (thisval === passval && passval.length !== 0) {
            return 0;
        } else {
            return 2;
        }
    }
    function emailCheck(el_form) {
        var thisval = el_form.val();
        if (thisval === "") {
            return 2;
        }
        if (expcheck.emailexp(thisval)) {
            return 0;
        } else {
            return 1;
        }
    }
    function smsOverlapCheck(cb) {
        var sms_number = $(S_FORM_SMS1).val().concat($(S_FORM_SMS2).val(), $(S_FORM_SMS3).val());
        if (sms_number == "") {
            cb(3);
            return;
        }
        $.ajax({
            url: "/user/sms_overlap",
            type: "get",
            dataType: "json",
            data: "sms=" + encodeURIComponent(sms_number),
            success: function (data) {
                if (data.error) {
                    alert("알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
                } else {
                    cb(data.code);
                }
            },
            error: function (xhr, status, err) {
                console.log(xhr);
                console.log(status);
                console.log(err);
                alert("알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
            },
        });
    }
    $doc.on("click", "div.terms-div", function (e) {
        var $this = $(this),
            $agree_all_check = $(".agree_all_check");
        var check_img = $this.find(".check-box").find("img");
        if (check_img.hasClass("display-none")) {
            check_img.removeAttr("class", "display-none");
        } else {
            check_img.attr("class", "display-none");
        }
    })
        .on("click", "div#register-page", function (e) {
            if (
                !$("#terms-1").find("img").hasClass("display-none") &&
                !$("#terms-2").find("img").hasClass("display-none")
            ) {
                //HSMall.pjaxStart("GET", "#register-user", "/register");
                HSMall.pjaxStart("get", "#register-page", "/register");
            } else {
                alert("회원가입 내용 약관에 동의하셔야 회원가입 진행이 가능합니다.");
            }
        })
        .on("keyup", "input:text#register_name", function (e) {
            //var kortest = /^[가-힣A-Za-z]{2,10}$/;
            //var engtest = /^([a-z](.*?)[가-힣])|([가-힣](.*?)[a-z])/i;
            var thisval = $(this).val(),
                $errorMsg = $("div.name_error");
            if (thisval) {
                if (!expcheck.korengcheck(thisval, 2, 10)) {
                    $errorMsg.html("이름은 한글 또는 영어 2~10자 내로 입력해주세요.");
                    return false;
                }
                if (!expcheck.engcheck(thisval, 2, 10, true) && !expcheck.korcheck(thisval, 2, 10, true)) {
                    $errorMsg.html("영문과 한글을 혼용해서 사용 할 수 없습니다.");
                    return false;
                } else {
                    $errorMsg.html("");
                    return true;
                }
            } else {
                $errorMsg.html("이름을 입력해주세요.");
                return false;
            }
        })
        .on("click", "div#id-overlap-check", function (e) {
            var $errorMsg = $("div#id-error");
            idCheck(function (code) {
                if (code === 2) {
                    $errorMsg.css("color", "red").html("6~20 영문 대 소문자, 숫자를 사용하여 완성해주세요.");
                    is_id_overlap = true;
                    id_err = 2;
                } else if (code === 1) {
                    $errorMsg.css("color", "red").html("이미 사용하고 있는 아이디입니다.");
                    is_id_overlap = true;
                    id_err = 3;
                } else {
                    $errorMsg.css("color", "#56967f").html("사용하실 수 있습니다.");
                    is_id_overlap = false;
                    id_err = 0;
                    $doc.on("change", S_FORM_ID, function () {
                        is_id_overlap = true;
                        id_err = 1;
                        $errorMsg.html("");
                        $doc.off("change", S_FORM_ID);
                    });
                }
            });
        })
        .on("change", S_FORM_PASSWORD, function (e) {
            var $errorMsg = $("div#password-error"),
                err = passwordCheck($(this));
            if (err == 1) {
                $errorMsg.css("color", "red").html("비밀번호를 입력해주세요.");
            } else if (err == 2) {
                $errorMsg.css("color", "red").html("비밀번호에 아이디를 넣을수 없습니다.");
            } else if (err == 3) {
                $errorMsg.css("color", "red").html("비밀번호에 유효한 문자가 아닙니다.");
            } else if (err == 4) {
                $errorMsg
                    .css("color", "red")
                    .html("8~20자 영문 대문자,영문 소문자, 숫자, 특수문자 중 3가지이상을 사용하여 완성해주세요.");
            } else {
                $errorMsg.html("");
            }
        })
        .on("keyup", S_FORM_PASSWORD_CONFIRM, function (e) {
            var $errorMsg = $("div#password-confirm-error"),
                err = passwordConfirmCheck($(this));
            if (err == 1) {
                $errorMsg.css("color", "red").html("비밀번호를 먼저 입력해주세요.");
            } else if (err == 2) {
                $errorMsg.css("color", "red").html("비밀번호가 일치하지 않습니다.");
            } else {
                $errorMsg.html("");
            }
        })
        .on("focusout", S_FORM_EMAIL, function (e) {
            var $errorMsg = $("div#email-error"),
                err = emailCheck($(this));
            if (err === 1) {
                $errorMsg.css("color", "red").html("올바른 이메일 형식이 아닙니다.");
            } else if (err === 2) {
                $errorMsg.css("color", "red").html("이메일을 입력해 주세요.");
            } else {
                $errorMsg.html("");
            }
        })
        .on("change input", S_FORM_SMS1, function (e) {
            var thisval = $(this).val();
            if (thisval.length == 3) {
                $(S_FORM_SMS2).focus();
            }
        })
        .on("change input", S_FORM_SMS2, function (e) {
            var thisval = $(this).val();
            if (thisval.length == 4) {
                $(S_FORM_SMS3).focus();
            }
        })
        .on("click", "div#sms-overlap-check", function (e) {
            var $errorMsg = $("div#sms-error");
            smsOverlapCheck(function (code) {
                if (code === 1) {
                    $errorMsg.css("color", "red").html("이미 사용하고 있는 전화번호입니다.");
                    is_sms_overlap = true;
                    sms_error = 3;
                } else if (code === 2) {
                    $errorMsg.css("color", "red").html("전화번호가 올바른지 확인 해 주세요.");
                    is_sms_overlap = true;
                    sms_error = 2;
                } else if (code === 3) {
                    $errorMsg.css("color", "red").html("전화번호를 입력해주세요.");
                    is_sms_overlap = true;
                    sms_error = 1;
                } else {
                    $errorMsg.css("color", "#56967f").html("사용하실 수 있습니다.");
                    is_sms_overlap = false;
                    $doc.on("keyup", S_FORM_SMS1, function () {
                        is_sms_overlap = true;
                        sms_error = 1;
                        $doc.off("keyup", S_FORM_SMS1);
                        $doc.off("keyup", S_FORM_SMS2);
                        $doc.off("keyup", S_FORM_SMS3);
                    });
                    $doc.on("keyup", S_FORM_SMS2, function () {
                        is_sms_overlap = true;
                        sms_error = 1;
                        $doc.off("keyup", S_FORM_SMS1);
                        $doc.off("keyup", S_FORM_SMS2);
                        $doc.off("keyup", S_FORM_SMS3);
                    });
                    $doc.on("keyup", S_FORM_SMS3, function () {
                        is_sms_overlap = true;
                        sms_error = 1;
                        $doc.off("keyup", S_FORM_SMS1);
                        $doc.off("keyup", S_FORM_SMS2);
                        $doc.off("keyup", S_FORM_SMS3);
                    });
                }
            });
        })
        .on("click", "div#sms-agress,div#email-agress", function (e) {
            var $this = $(this),
                $check_img = $this.find("img");
            if ($check_img.hasClass("display-none")) {
                $check_img.removeAttr("class", "display-none");
            } else {
                $check_img.attr("class", "display-none");
            }
        })
        .on("click", S_REGISTER_SUCCESS_PAGE, function (e) {
            var //name_val				= $('input:text#register_name').val(),
                id_val = $(S_FORM_ID).val(),
                password_val = $(S_FORM_PASSWORD).val(),
                password_confirm_val = $(S_FORM_PASSWORD_CONFIRM).val(),
                email_val = $(S_FORM_EMAIL).val(),
                phone_val = $(S_FORM_SMS1).val().concat($(S_FORM_SMS2).val(), $(S_FORM_SMS3).val()),
                is_sms_receive,
                is_email_receive,
                //phone_op				= $('span.current_select').text();
                //$errorbar				= $('div.errorbar');
                err;
            /*if(!expcheck.korengcheck(name_val,2,10) || (!expcheck.engcheck(name_val,2,10,true) && !expcheck.korcheck(name_val,2,10,true)) || !name_val){
			$('input:text#register_name').focus();
			alert()
			$errorbar.html("이름을 다시 확인해주세요.").css('display','block');
			return;
		}*/
            if (is_id_overlap || expcheck.engnumcheck(id_val, 6, 20)) {
                if (id_err === 1) {
                    alert("아이디 중복검사가 필요합니다.");
                } else if (id_err === 2) {
                    alert("아이디는 6~20 영문 대 소문자, 숫자를 사용하여 완성해주세요.");
                } else if (id_err === 3) {
                    alert("이미 사용하고 있는 아이디입니다.");
                }
                $(S_FORM_ID).focus();
                return;
            }
            err = passwordCheck($(S_FORM_PASSWORD));
            if (err > 0) {
                if (err === 1) {
                    alert("비밀번호를 입력해주세요.");
                } else if (err === 2) {
                    alert("비밀번호에 아이디를 넣을수 없습니다.");
                } else if (err === 3) {
                    alert("비밀번호에 유효한 문자가 아닙니다.");
                } else if (err === 4) {
                    alert("8~20자 영문 대문자,영문 소문자, 숫자, 특수문자 중 3가지이상을 사용하여 완성해주세요.");
                }
                $(S_FORM_PASSWORD).focus();
                return;
            }
            err = passwordConfirmCheck($(S_FORM_PASSWORD_CONFIRM));
            if (err > 0) {
                if (err === 1) {
                    alert("비밀번호를 먼저 입력해주세요.");
                    $(S_FORM_PASSWORD).focus();
                } else if (err === 2) {
                    alert("비밀번호가 일치하지 않습니다.");
                    $(S_FORM_PASSWORD_CONFIRM).focus();
                }
                return;
            }
            err = emailCheck($(S_FORM_EMAIL));
            if (err > 0) {
                if (err === 1) {
                    alert("올바른 이메일 형식이 아닙니다.");
                } else if (err === 2) {
                    alert("이메일을 입력해 주세요.");
                }
                $(S_FORM_EMAIL).focus();
                return;
            }
            if (is_sms_overlap) {
                if (sms_err === 1) {
                    alert("전화번호를 입력해주세요.");
                } else if (sms_err === 2) {
                    alert("전화번호가 올바른지 확인 해 주세요.");
                } else if (sms_err === 3) {
                    alert("이미 사용하고 있는 전화번호입니다.");
                }
                $(S_FORM_SMS1).focus();
                return;
            }
            /*if(phone_op!=="SK" && phone_op!=="KT" && phone_op!=="U+"){
			$errorbar.html("통신사값이 변조되었습니다.").css('display','block');
			return;
		}*/
            is_sms_receive = !$(S_SMS_RECEIVE).find("img").hasClass("display-none");
            is_email_receive = !$(S_EMAIL_RECEIVE).find("img").hasClass("display-none");
            var member_info = new Array();
            member_info.push(
                id_val,
                encodeURIComponent(password_val),
                encodeURIComponent(email_val),
                phone_val,
                is_sms_receive,
                is_email_receive
            );
            $.ajax({
                url: "/user/regist",
                type: "post",
                dataType: "json",
                data: "dbin=" + member_info,
                success: function (data) {
                    console.log(data);
                    if (data.error) {
                        alert("오류가 발생했습니다, 시작페이지로 돌아갑니다.");
                        location.replace("http://test.devhosung.com:8091/");
                    } else {
                        HSMall.pageMove("/join_complete", {
                            id: data.id,
                        });
                    }
                },
                error: function (xhr, status, err) {
                    console.log(xhr);
                    console.log(status);
                    console.log(err);
                },
            });
        })
        .on("keydown", "input:text,input:password", function (e) {
            $errorbar = $("div.errorbar");
            $errorbar.css("display", "none");
        })
        .on("click", "div.agencybutton", function (e) {
            $(".agency_list").css("display", "block");
            $doc.on("click", "div#wrap,#categoryM", function (e) {
                $("ul.agency_list").css("display", "none");
                $doc.off("click", "div#wrap,#categoryM").off("click", "li.list");
            });
            $doc.on("click", "li.list", function (e) {
                $("span.current_select").html($(this).html());
            });
        })
        .on("keyup", ".register_phone", function (e) {
            if (this.id === "register_phone1") {
                if (this.value.length === 3) $("input:text#register_phone2").focus();
            } else if (this.id === "register_phone2") {
                if (this.value.length === 4) $("input:text#register_phone3").focus();
            }
        });
})();
