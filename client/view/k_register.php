<?php
require_once "./module.php";
$pjax=false;
if(isset($_SERVER['HTTP_HS_PJAX'])){
	$pjax=$_SERVER['HTTP_HS_PJAX'];
}

if(!$pjax){
	head();
	body_head();
	body_contents_container_start();
}
?>
	<div class="register-step-container">
		<div class="register-step"><img src="assets/img/terms1.png" class="step-img"/> 약관 동의</div>
		<div class="register-step current"><img src="assets/img/register2.png" class="step-img"/> 정보 입력</div>
		<div class="register-step"><img src="assets/img/register_success1.png" class="step-img"/> 가입완료</div>
	</div>
	<div class="register-container">
		<div class="register-info-container">
			<div class="title square-normal">회원정보 입력</div>
			<div class="theme-division-line"></div>
			<div class="info-form">
				<div class="form-member">
					<label class="square-normal left"><img src="assets/img/check_icon2.png" class="check-img"/>아이디</label>
					<div class="right">
						<input id="reg-form-id" type="text" class="medium-form" style="margin-right:8px;"/>
						<div id="id-overlap-check" class="small-button square-normal float-left">중복확인</div>
						<div id="id-error" class="clear-both text-13"></div>
					</div>
				</div>
				<div class="form-member">
					<label class="square-normal left"><img src="assets/img/check_icon2.png" class="check-img"/>비밀번호</label>
					<div class="right">
						<input id="reg-form-password" type="password" class="medium-form"/>
						<div id="password-error" class="clear-both text-13"></div>
					</div>
				</div>
				<div class="form-member">
					<label class="square-normal left"><img src="assets/img/check_icon2.png" class="check-img"/>비밀번호 확인</label>
					<div class="right">
						<input id="reg-form-password-confirm" type="password" class="medium-form"/>
						<div id="password-confirm-error" class="clear-both text-13"></div>
					</div>
				</div>
				<div class="form-member">
					<label class="square-normal left"><img src="assets/img/check_icon2.png" class="check-img"/>이메일</label>
					<div class="right">
						<input id="reg-form-email" type="text" class="medium-form"/>
						<div id="email-error" class="clear-both text-13"></div>
					</div>
				</div>
				<div class="form-member">
					<label class="square-normal left"><img src="assets/img/check_icon2.png" class="check-img"/>휴대폰</label>
					<div class="right">
						<div class="float-left" style="margin-right:8px">
							<input id="reg-form-sms1" type="text" class="small-form text-center" maxlength="3"/>
							-
							<input id="reg-form-sms2" type="text" class="small-form text-center" maxlength="4"/>
							-
							<input id="reg-form-sms3" type="text" class="small-form text-center" maxlength="4"/>
						</div>
						<div id="sms-overlap-check" class="small-button square-normal float-left">중복확인</div>
						<div id="sms-error" class="clear-both text-13"></div>
					</div>
				</div>
				<div class="receive-container">
					<div id="sms-agress" class="square-normal small-bold-text">
						<div class="check-box" style="margin-right:5px;"><img src="assets/img/check_icon.png" width=13 height=13/></div>
						마케팅 활용 및 SMS 수신 동의 <strong class="theme-color">(선택)</strong>
					</div>
					<div id="email-agress" class="square-normal small-bold-text">
						<div class="check-box" style="margin-right:5px;"><img src="assets/img/check_icon.png" width=13 height=13/></div>
						마케팅 활용 및 이메일 수신 동의 <strong class="theme-color">(선택)</strong>
					</div>
				</div>
			</div>
		</div>
		<div id="register-success-page" class="go-page square-normal">다음</div>
	</div>
<?php
if(!$pjax){
	footer();
	load_script_from_end();
	page_register_script();
}
?>