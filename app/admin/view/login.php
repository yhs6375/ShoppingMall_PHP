<?php
/*
/login 페이지
*/
require_once "./view/module.php";
head_start();
?>
<script>
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
</script>
<link href="/assets/css/login.css" rel="stylesheet" type="text/css" />
<?php
head_end();
?>
<app>
    <div class="container-login">
        <div class="wrap-login">
            <div class="hodo-logo">
                <object class="hodo-logo-obj" data="/assets/img/hodofactory_logo.svg" type="image/svg+xml"></object>
            </div>
            <div class="login-title">
                Login
            </div>
            <form id="formHSALogin" name="formHSALogin" autocomplete="off" method="POST" action="/login">
                <fieldset>
                    <div class="wrap-input validate-form" data-validate="UserID is required" style="margin-bottom:23px">
                        <span class="label-input">Username</span>
                        <input id="id-input" class="input" type="text" name="id" placeholder="Type your ID"
                            maxlength="40">
                        <span class="focus-input" data-symbol="perm_identity"></span>
                    </div>
                    <div class="wrap-input validate-form" data-validate="Password is required"
                        style="margin-bottom:23px">
                        <span class="label-input">Password</span>
                        <input id="pass-input" class="input" type="password" name="password"
                            placeholder="Type your password" maxlength="20">
                        <span class="focus-input" data-symbol="lock"></span>
                    </div>
                    <div class="alert pb-8"><?php
                                            if (isset($_POST["err"])) echo "알 수 없는 정보입니다. 관리자에게 문의해주세요.";
                                            ?></div>
                    <div class="login-but-wrap">
                        <input type="submit" id="login-but" class="login-but" title="Login" alt="Login" value="Login" />
                        <div class="login-bgbut"></div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</app>
<?php
load_script_from_end();
?>
<script src="assets/js/login.js"></script>
<?php
body_end();
?>