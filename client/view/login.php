<?php
require_once "./view/module.php";
$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
	$pjax = $_SERVER['HTTP_HS_PJAX'];
}
if (!$pjax) {
	head();
	body_head();
	body_contents_container_start();
}
$restAPIKey = "6bd50e92e12577a9611758ab5da0f1d5";
$callbacURI = urlencode("http://test.hodofactory.com:8088/login/kakao_login.php");
$kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" . $restAPIKey . "&redirect_uri=" . $callbacURI . "&response_type=code";
?>
<div class="login-container gothic">
    <div class="method-select">
        <div id="method-member-login" class="member">
            <i class="fa fa-check-circle-o"></i>
            회원 로그인
        </div>
        <div id="method-non-member-login" class="member">
            <i class="fa fa-circle-o"></i>
            비회원 배송조회
        </div>
    </div>
    <div id="member-login">
        <div class="form-main">
            <div class="form-member">
                <input type="text" class="normal-form" placeholder="   아이디" />
            </div>
            <div class="form-member">
                <input type="password" class="normal-form" placeholder="   비밀번호" />
            </div>
            <div id="save-login-info" class="check-box-container">
                <div class="check-box"><img src="assets/img/check_icon.png" width=13 height=13 /></div>
                <div class="normal-text" style="margin-left:5px;float:left;font-size:14px;">아이디 저장하기</div>
            </div>
        </div>
    </div>
    <div id="non-member-shipping-check" class="display-none">
        <div class="form-main">
            <div class="form-member">
                <input type="text" class="normal-form" placeholder="   주문번호" />
            </div>
            <div class="form-member">
                <input type="password" class="normal-form" placeholder="   주문자 전화번호" />
            </div>
        </div>
    </div>
    <div id="login-submit" class="main-but">로그인</div>
    <a href="<?php echo $kakaoLoginUrl ?>" id="kakao-login-btn" class="text-center" style="width:300px;height:49px;">
        <img src="assets/img/kakao_login_btn.png" />
</div>
<a href="http://developers.kakao.com/logout"></a>
<div class="division-line"></div>
<div class="other-form">
    <div id="register-user" style="float:left;">회원가입</div>
    <div class="division-text display-n-m">|</div>
    <div class="find-account">
        <div id="find-account-id" class="find-account-id">아이디 찾기</div><label class="display-n-m"
            style="float:left;">·</label>
        <div id="find-account-pass" class="find-account-pass">패스워드 찾기</div>
    </div>
</div>
<div class="other-login">
</div>
</div>

<?php
if (!$pjax) {
	footer();
	load_script_from_end();
}
?>