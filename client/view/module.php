<?php

use Server\Shopping\Product\CategoryManager;

function head()
{
?>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="viewport"
        content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0 width=device-width" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <script src="https://use.fontawesome.com/97105919cf.js"></script>
    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@1.0/nanumbarungothicsubset.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
    <link href="/assets/css/main.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/sidebar.css" rel="stylesheet" type="text/css" />
</head>
<?php
}
function sidebar_category_html($mainCategory)
{
	$subCategoryList = CategoryManager::GetSubCategoryListById($mainCategory->id)->categoryList;
?>
<div class="sidebar-child-brand">
    <label class="sidebar-opening" data-num="<?php echo $mainCategory->id ?>"><?php echo $mainCategory->name ?></label>
    <?php if (count($subCategoryList) > 0) { ?>
    <div aria-expanded="true" data-toggle="dropdown" class="dropdown-toggle sidebar-dropdown"><span
            class="sidebar-caret"></span></div>
    <div class="dropdown-menu">
        <?php
				foreach ($subCategoryList as $subCategory) {
				?>
        <div>
            <div class="dropdown-content" data-num="0"><?php echo $subCategory->name ?></div>
        </div>
        <?php
				}
				?>
    </div>
    <?php } ?>
</div>
<?php
}
function body_head()
{
	$categoryList = CategoryManager::GetMainCategoryList()->categoryList;
?>

<body>
    <div id="main-navbar" class="navbar navbar-fixed-top navbar-wrapper">
        <div class="navbar-left">
            <div class="left-but-container">
                <div id="sidebar-opener" class="navbar-button">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div class="navbar-right">
            <div class="right-but-container">
                <div id="shopping-cart-but" class="navbar-button">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
                <div id="sign-in-but" class="navbar-button">
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </div>
                <div id="user-info-but" class="navbar-button hidden-xs">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div class="page-logo">
            <a href="/">
                <img class="page-logo-img" src="/assets/img/title.png" />
            </a>
        </div>
        <div class="sidebar-nav"></div>
    </div>
    <nav class="navbar navbar-fixed-top toggled sidebar-mobile" id="sidebar-wrapper" role="navigation">
        <div class="sidebar-nav-wrapper">
            <div class="nav sidebar-nav">
                <div class="sidebar-brand">
                    <label>상품</label>
                </div>
                <div class="dropdown sidebar-child-brand">
                    <label>인기상품</label>
                </div>
                <?php
					foreach ($categoryList as $mainCategory) {
						sidebar_category_html($mainCategory);
					}
					?>
                <div class="sidebar-menu" style="margin-top:25px;">
                    <a href="#">배송안내</a>
                </div>
                <div class="sidebar-menu">
                    <a href="#">실제구매후기</a>
                </div>
                <div class="sidebar-menu">
                    <a href="#">고객센터</a>
                </div>
            </div>
        </div>
    </nav>
    <div class="clearfix"></div>
    <?php
}
function body_contents_container_start()
{
	?>
    <div id="contents-wrap" class="page-container toggled">
        <mcontainer id="contents">
            <?php
		}
		function body_contents_container_goods()
		{
			?>
            <div id="contents-wrap" class="page-container toggled">
                <mcontainer id="goods">
                    <?php
				}
				function footer()
				{
					?>
                </mcontainer>
                <div id="footer">
                    <div class="time-call-info">
                        <div class="medium-grey footer-title"><strong>CALL CENTER</strong></div>
                        <div class="white" style="margin-top:6px;margin-bottom:5px;font-size:20px;">2390-3459</div>
                        <div class="footer-normal-text">10:00 ~ 17:00</br>토요일,일요일 휴무</div>
                    </div>
                    <div class="service-info">
                        <div class="medium-grey footer-title"><strong>INFO</strong></div>
                        <a class="footer-normal-text" style="margin-top:13px;" href="#">::이용 약관</a>
                        <a class="footer-normal-text" style="margin-top:6px;" href="#">::개인정보취급방침</a>
                        <a class="footer-normal-text" style="margin-top:6px;" href="#">::고객 센터</a>
                    </div>
                    <div class="company-info">
                        <div class="medium-grey footer-title"><strong>COMPANY</strong></div>
                        <div class="footer-normal-text" style="margin-top:13px;">::회사명 : 4:22:09</div>
                        <div class="footer-normal-text" style="margin-top:6px;">::대표이사 : 김개똥</div>
                        <div class="footer-normal-text" style="margin-top:6px;">::주소 : 서울 사과시 멜론동</div>
                        <div class="footer-normal-text" style="margin-top:6px;">::사업자등록번호 : 238-39-32490</div>
                        <div class="footer-normal-text" style="margin-top:6px;">::통신판매신고번호 : 제2017-서울사과-03293호</div>
                    </div>
                </div>
            </div>
            <?php
				}
				function load_script_from_end()
				{
			?>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
                integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
                crossorigin="anonymous"></script>
            <script src="assets/js/test.js"></script>
            <script>
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
                $("#sidebar-wrapper").removeClass("toggled");
                NavSideW = 0;
            }
            </script>
</body>

</html>
<?php
				}

				function page_login_html()
				{
?>

<?php
				}
				function page_idfind_html()
				{
?>
<div class="login-container gothic">
    <div class="find-title normal-text">회원 가입시 입력한 정보로 찾기</div>
    <div class="strong-division-line"></div>
    <div id="sign-in-but"><img src="assets/img/previous.svg" width=19px height=19px
            style="position:relative;top:-1px;" />로그인창으로 되돌아가기</div>
    <div class="method-select">
        <div id="method-phone" class="member">
            <i class="fa fa-check-circle-o"></i>
            휴대폰
        </div>
        <div id="method-email" style="margin-left:9px;" class="member">
            <i class="fa fa-circle-o"></i>
            이메일
        </div>
    </div>
    <div id="finding-phone">
        <div class="form-main">
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이름</label>
                <input type="text" class="normal-form" placeholder="   이름" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">휴대전화<label class="footer-normal-text"
                        style="display:inline-block"> (-빼고 입력)</label></label>
                <input type="tel" class="normal-form" placeholder="   휴대전화" />
            </div>
        </div>
    </div>
    <div id="finding-email" class="display-none">
        <div class="form-main">
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이름</label>
                <input type="text" class="normal-form" placeholder="   이름" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이메일</label>
                <input type="text" class="normal-form" placeholder="   이메일" />
            </div>
        </div>
    </div>
    <div id="find-id-submit" class="main-but">아이디 찾기</div>
    <div class="division-line"></div>
    <div class="find-title normal-text" style="padding-top:15px;">본인 인증으로 찾기</div>
    <div class="normal-but" style="margin-bottom:15px;">
        <i class="fa fa-mobile" style="font-size:25px;top:3px;position:relative;"></i>휴대전화 본인인증
    </div>
    <div class="normal-but" style="margin-bottom:25px;">아이핀 본인인증</div>
    <div class="division-line"></div>
    <div id="find-account-pass" class="normal-but blue-theme" style="margin-top:20px;">패스워드 찾으러 가기</div>
</div>
<?php
				}
				function page_passfind_html()
				{
?>
<div class="login-container gothic">
    <div class="find-title normal-text">회원 가입시 입력한 정보로 찾기</div>
    <div class="strong-division-line"></div>
    <div id="sign-in-but"><img src="assets/img/previous.svg" width=19px height=19px
            style="position:relative;top:-1px;" />로그인창으로 되돌아가기</div>
    <div class="method-select">
        <div id="method-phone-pass" class="member">
            <i class="fa fa-check-circle-o"></i>
            휴대폰
        </div>
        <div id="method-email-pass" style="margin-left:9px;" class="member">
            <i class="fa fa-circle-o"></i>
            이메일
        </div>
    </div>
    <div id="pass-finding-phone">
        <div class="form-main">
            <div class="label-form-member">
                <label class="label-text" style="display:block;">아이디</label>
                <input type="text" class="normal-form" placeholder="   아이디" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이름</label>
                <input type="text" class="normal-form" placeholder="   이름" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">휴대전화<label class="footer-normal-text"
                        style="display:inline-block"> (-빼고 입력)</label></label>
                <input type="tel" class="normal-form" style="width:71%;" placeholder="   휴대전화" />
                <div id="phone-auth" class="small-but" style="float:right;">본인인증</div>
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">인증번호</label>
                <input type="text" class="normal-form" placeholder="   인증번호" />
            </div>
        </div>
    </div>
    <div id="pass-finding-email" class="display-none">
        <div class="form-main">
            <div class="label-form-member">
                <label class="label-text" style="display:block;">아이디</label>
                <input type="text" class="normal-form" placeholder="   아이디" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이름</label>
                <input type="text" class="normal-form" placeholder="   이름" />
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">이메일</label>
                <input type="text" class="normal-form" style="width:71%;" placeholder="   이메일" />
                <div id="email-auth" class="small-but" style="float:right;">본인인증</div>
            </div>
            <div class="label-form-member">
                <label class="label-text" style="display:block;">인증번호</label>
                <input type="text" class="normal-form" placeholder="   인증번호" />
            </div>
        </div>
    </div>
    <div id="find-pass-submit" class="main-but">패스워드 찾기</div>
    <div class="division-line"></div>
    <div class="find-title normal-text" style="padding-top:15px;">본인 인증으로 찾기</div>
    <div class="form-main">
        <div class="label-form-member">
            <label class="label-text" style="display:block;">아이디</label>
            <input type="text" class="normal-form" placeholder="   아이디" />
        </div>
    </div>
    <div class="normal-but" style="margin-bottom:15px;">
        <i class="fa fa-mobile" style="font-size:25px;top:3px;position:relative;"></i>휴대전화 본인인증
    </div>
    <div class="normal-but" style="margin-bottom:25px;">아이핀 본인인증</div>
    <div class="division-line"></div>
    <div id="find-account-id" class="normal-but blue-theme" style="margin-top:20px;">아이디 찾으러 가기</div>
</div>
<?php
				}

				function page_terms_html()
				{
?>
<div class="register-step-container">
    <div class="register-step current"><img src="assets/img/terms2.png" class="step-img" /> 약관 동의</div>
    <div class="register-step"><img src="assets/img/register1.png" class="step-img" /> 정보 입력</div>
    <div class="register-step"><img src="assets/img/register_success1.png" class="step-img" /> 가입완료</div>
</div>
<div class="terms-container">
    <div id="terms-1">
        <div class="terms-title"><strong>(필수)</strong>이용약관</div>
        <div class="terms-contents">abcdefghijklmnopqrstuv</div>
        <div class="terms-div" style="width:200px;">
            <label class="square-normal pointer" style="padding-right:5px;"><strong
                    style="color:#ff3333;">(필수)</strong>이용약관에 동의합니다.</label>
            <div class="check-box"><img src="assets/img/check_icon.png" class="display-none" width=13 height=13 /></div>
        </div>
    </div>
    <div id="terms-2">
        <div class="terms-title"><strong>(필수)</strong>개인정보 수집/이용 및 취급방침</div>
        <div class="terms-contents">가나다라마바사아자차카파타하 가나다라마바사아자차카파타하 가나다라마바사아자차카파타하
            가나다라마바사아자차카파타하
            가나다라마바사아자차카파타하 가나다라마바사아자차카파타하 가나다라마바사아자차카파타하 가나다라마바사아자차카파타하.. 가나다라마바사아자차카파타하...가나다라마바사아자차카파타하</div>
        <div class="terms-div" style="width:325px;">
            <label class="square-normal pointer" style="padding-right:5px;"><strong
                    style="color:#ff3333;">(필수)</strong>개인정보 수집/이용 및 취급방침에 동의합니다.</label>
            <div class="check-box"><img src="assets/img/check_icon.png" class="display-none" width=13 height=13 /></div>
        </div>
    </div>
    <div id="register-page" class="go-page square-normal">다음</div>
</div>
<?php
				}
				function page_terms_script()
				{
?>
<script src="assets/js/user_register.js"></script>
<?php
				}
				function page_register_html()
				{
?>

<?php
				}
				function page_register_script()
				{
?>
<script src="assets/js/user_register.js"></script>
<?php
				}
				function page_join_complete_html($username)
				{
?>
<div class="register-step-container">
    <div class="register-step"><img src="assets/img/terms1.png" class="step-img" /> 약관 동의</div>
    <div class="register-step"><img src="assets/img/register1.png" class="step-img" /> 정보 입력</div>
    <div class="register-step current"><img src="assets/img/register_success2.png" class="step-img" /> 가입완료</div>
</div>
<div class="normal-container1">
    <div class="text-center">
        <?php echo $username; ?>님 회원가입을 축하드립니다.<br />
        가입포인트 2000원을 지급해 드립니다.<br />
        다양한 회원 혜택을 받으세요.
    </div>
</div>
<?php
				}

				function page_shopping_cart_html()
				{
?>
<div class="cat-title normal-box-20" style="margin-top:120px;">
    <div class="preview-track-desc-wrap">
        <div class="preview-track-line"></div>
        <div class="preview-track-name">
            <h3 class="text-center text-24-bold">장바구니</h3>
        </div>
    </div>
</div>
<div id="non-member-warn" class="normal-box-40">
    <label class="text-12-bold text-center">비회원으로 구매하시면 쿠폰과 이벤트 등의 혜택을 받으실 수 없습니다. 또한 비회원 주문 시에는 적립금이 지급되지 않습니다.</label>
    <div style="clear:both;"></div>
    <div id="sign-in-but" class="inverse-but-left" style="margin-left:190px; margin-right:10px;">로그인</div>
    <div id="register-user" class="inverse-but-left">회원가입</div>
</div>
<div class="normal-box-60 cart-container">
    <div class="text-16-bold">장바구니 상품(<label class="theme-color">1</label>개)</div>
    <div class="white-normal-box-20 container-1" style="width:1060px;">
        <table id="shopping-cart-box">
            <thead class="row table-header text-13-bold">
                <tr>
                    <th>
                        <div class="check-box-container" style="border:none;margin:0 auto;">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </th>
                    <th>상품/옵션정보</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>배송비</th>
                    <th>주문금액</th>
                </tr>
            </thead>
            <tbody class="member">
                <tr>
                    <td>
                        <div class="check-box-container" style="border:none">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </td>
                    <td>
                        <div class="cart-img"><img src="assets/img/dried_apple.jpg" /></div>
                        <div class="cart-goods-name"><label class="text-16-bold">말린 사과</label><label
                                class="text-13-bold medium-grey">(옵션:매운사과)</label></div>
                        <div class="delete-goods"></div>
                    </td>
                    <td>
                        <div class="buy-count-table">
                            <div id="buy-count-dec"></div>
                            <input id="buy-count" class="text-18-bold theme-color" type="text" value="1" />
                            <div id="buy-count-inc"></div>
                        </div>
                    </td>
                    <td><label class="text-15-bold">5,000</label>원</td>
                    <td><label class="text-15-bold">2,500</label>원</td>
                    <td><label class="text-18-bold">7,500</label>원</td>
                </tr>
                <tr>
                    <td>
                        <div class="check-box-container" style="border:none">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </td>
                    <td>
                        <div class="cart-img"><img src="assets/img/dried_apple.jpg" /></div>
                        <div class="cart-goods-name"><label class="text-16-bold">말린 사과</label><label
                                class="text-13-bold medium-grey">(옵션:매운사과)</label></div>
                        <div class="delete-goods"></div>
                    </td>
                    <td>
                        <div class="buy-count-table">
                            <div id="buy-count-dec"></div>
                            <input id="buy-count" class="text-18-bold theme-color" type="text" value="1" />
                            <div id="buy-count-inc"></div>
                        </div>
                    </td>
                    <td><label class="text-15-bold">5,000</label>원</td>
                    <td><label class="text-15-bold">2,500</label>원</td>
                    <td><label class="text-18-bold">7,500</label>원</td>
                </tr>
            </tbody>
        </table>
        <div id="empty-cart" class="small-but">장바구니 비우기</div>
        <table class="result-price">
            <tr>
                <td>
                    <div class="text-13-bold">총 상품금액</div>
                    <div class="text-16-bold"><label class="text-24-bold">10,000</label>원</div>
                </td>
                <td>
                    <div class="text-13-bold">총 배송비</div>
                    <div class="text-16-bold"><label class="text-24-bold">2,500</label>원</div>
                </td>
                <td>
                    <div class="text-13-bold">예상 결제금액</div>
                    <div class="text-16-bold"><label class="text-28-bold theme-color">12,500</label>원</div>
                </td>
            </tr>
        </table>
        <div class="cart-but-container">
            <div id="go-buy-page" class="small-but">구매하기</div>
        </div>

    </div>
</div>
<div class="normal-box-40 cart-container">
    <div class="text-16-bold">최근 본 상품</div>
    <div class="white-normal-box-20" style="width:1060px;display:inline-block;">
        <div class="cart-goods-wrap">
            <div class="goods-box">
                <a href="#">
                    <img class="fixed-img" src="assets/img/apricot.jpg" />
                </a>
                <div class="goods-title"><a href="#">촉촉한 살구</a></div>
                <div class="goods-grade">
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="half-star"></span>
                    <span class="no-star"></span>
                </div>
                <div class="goods-review-count">리뷰 84건</div>
                <div class="goods-price"><strong>434,380,000</strong>원</div>
            </div>
        </div>
        <div class="cart-goods-wrap">
            <div class="goods-box">
                <a href="#">
                    <img class="fixed-img" src="assets/img/kiwifruit.jpg" />
                </a>
                <div class="goods-title"><a href="#">달콤한 키위</a></div>
                <div class="goods-grade">
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                </div>
                <div class="goods-review-count">리뷰 13284건</div>
                <div class="goods-price"><strong>1,380,000</strong>원</div>
            </div>
        </div>
        <div class="cart-goods-wrap">
            <div class="goods-box">
                <a href="#">
                    <img class="fixed-img" src="assets/img/strawberries.jpg" />
                </a>
                <div class="goods-title"><a href="#">빨간 딸기</a></div>
                <div class="goods-grade">
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="full-star"></span>
                    <span class="no-star"></span>
                </div>
                <div class="goods-review-count">리뷰 183건</div>
                <div class="goods-price"><strong>380,000</strong>원</div>
            </div>
        </div>
    </div>
</div>
<?php
				}
				function page_order_html()
				{
?>
<div class="cat-title normal-box-20" style="margin-top:120px;">
    <div class="preview-track-desc-wrap">
        <div class="preview-track-line"></div>
        <div class="preview-track-name">
            <h3 class="text-center text-24-bold">주문하기</h3>
        </div>
    </div>
</div>
<div class="normal-box-60 cart-container">
    <div class="text-16-bold">주문상품 정보</div>
    <div class="white-normal-box-20 container-1" style="width:1060px;padding-bottom:10px;">
        <table id="shopping-cart-box">
            <thead class="row table-header text-13-bold">
                <tr>
                    <th>
                        <div class="check-box-container" style="border:none;margin:0 auto;">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </th>
                    <th>상품/옵션정보</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>배송비</th>
                    <th>주문금액</th>
                </tr>
            </thead>
            <tbody class="member">
                <tr>
                    <td>
                        <div class="check-box-container" style="border:none">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </td>
                    <td>
                        <div class="cart-img"><img src="assets/img/dried_apple.jpg" /></div>
                        <div class="cart-goods-name"><label class="text-16-bold">말린 사과</label><label
                                class="text-13-bold medium-grey">(옵션:매운사과)</label></div>
                    </td>
                    <td>
                        1개
                    </td>
                    <td><label class="text-15-bold">5,000</label>원</td>
                    <td><label class="text-15-bold">2,500</label>원</td>
                    <td><label class="text-18-bold">7,500</label>원</td>
                </tr>
                <tr>
                    <td>
                        <div class="check-box-container" style="border:none">
                            <div class="check-box"><img src="assets/img/check_icon.png" width="13" height="13/"></div>
                        </div>
                    </td>
                    <td>
                        <div class="cart-img"><img src="assets/img/dried_apple.jpg" /></div>
                        <div class="cart-goods-name"><label class="text-16-bold">말린 사과</label><label
                                class="text-13-bold medium-grey">(옵션:매운사과)</label></div>
                    </td>
                    <td>
                        1개
                    </td>
                    <td><label class="text-15-bold">5,000</label>원</td>
                    <td><label class="text-15-bold">2,500</label>원</td>
                    <td><label class="text-18-bold">7,500</label>원</td>
                </tr>
            </tbody>
        </table>
        <table id="discount-info" class="order-table" style="margin-top:30px;">
            <thead>
                <tr>
                    <th>상품할인쿠폰</th>
                    <td class="text-13-bold">
                        <div class="float-left">
                            <input type="text" class="normal" id="goods-discount-price" readonly />
                            원
                        </div>
                        <div class="but text-13-bold" id="coupon-select">할인쿠폰 선택</div>
                    </td>
                    <th>배송비할인쿠폰</th>
                    <td class="text-13-bold">
                        <div class="float-left">
                            <input type="text" class="normal" id="delivery-discount-price" readonly />
                            원
                        </div>
                        <div class="but text-13-bold" id="coupon-select">할인쿠폰 선택</div>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>포인트할인</th>
                    <td class="text-13-bold" style="padding-top:10px;padding-bottom:10px;" colspan=3>
                        <div>
                            <input type="text" class="normal" id="discount-price" />
                            원
                        </div>
                        <div class="text-13-bold">내 포인트 <label class="theme-color text-15-bold">4000</label>원</div>
                        <div class="text-12-bold medium-grey">*포인트는 최소 10원부터 사용 가능합니다.</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="result-price" style="margin-bottom:20px;">
            <tr>
                <td style="padding-top:10px;">
                    <div class="text-13-bold">할인 전 상품금액</div>
                    <div class="text-16-bold"><s class="text-24-bold">10,000</s>원</div>
                </td>
                <td style="padding-top:10px;">
                    <div class="text-13-bold">할인 전 배송비</div>
                    <div class="text-16-bold"><s class="text-24-bold">2,500</s>원</div>
                </td>
                <td style="padding-top:10px;">
                    <div class="text-13-bold">예상 결제금액</div>
                    <div class="text-16-bold"><s class="text-28-bold theme-color">12,500</s>원</div>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div><img src="assets/img/bottom-arrow2.png" /></div>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <div class="text-13-bold">총 상품금액</div>
                    <div class="text-16-bold"><label class="text-24-bold">8,000</label>원</div>
                </td>
                <td>
                    <div class="text-13-bold">총 배송비</div>
                    <div class="text-16-bold"><label class="text-24-bold">0</label>원</div>
                </td>
                <td>
                    <div class="text-13-bold">최종 결제금액</div>
                    <div class="text-16-bold"><label class="text-28-bold theme-color">8,000</label>원</div>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="normal-box-60 cart-container">
    <div class="text-16-bold">주문자 정보 입력</div>
    <div class="white-normal-box-20 container-1" style="width:1060px;padding-bottom:10px;">
        <table id="orderer-info" class="order-table">
            <thead>
                <tr>
                    <th style="background-color:#bbb;"><img src="assets/img/check_icon2.png" class="check-img">주문하시는 분
                    </th>
                    <td><input type="text" class="normal" /></td>
                    <th style="background-color:#bbb;"><img src="assets/img/check_icon2.png" class="check-img">주문자 전화번호
                    </th>
                    <td>
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th><img src="assets/img/check_icon2.png" class="check-img">받으시는 분</th>
                    <td><input type="text" class="normal" /></td>
                    <td colspan="2">
                        <div class="method-select float-left gothic text-12">
                            <div class="member">
                                <i class="fa fa-check-circle-o"></i>
                                신규 정보
                            </div>
                            <div class="member">
                                <i class="fa fa-circle-o"></i>
                                최근 배송지
                            </div>
                            <div class="member">
                                <i class="fa fa-circle-o"></i>
                                내 정보
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><img src="assets/img/check_icon2.png" class="check-img">휴대폰</th>
                    <td>
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                    </td>
                    <th><img src="assets/img/check_icon2.png" class="check-img">전화번호</th>
                    <td>
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                        -
                        <input type="text" class="number" />
                    </td>
                </tr>
                <tr>
                    <th><img src="assets/img/check_icon2.png" class="check-img">배송지</th>
                    <td colspan="3">
                        <div id="zip-code">
                            <div id="zip">
                                <input type="text" class="number" readonly />
                                -
                                <input type="text" class="number" readonly />
                            </div>
                            <div class="but text-13-bold" id="zip-code-search">우편번호 검색</div>
                        </div>
                        <div class="clear-both"></div>
                        <input type="text" class="long" id="address1" />
                        <input type="text" class="long" id="address2" />
                    </td>
                </tr>
                <tr>
                    <th>배송메시지</th>
                    <td colspan="3">
                        <input type="text" id="order-message" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="normal-box-60 cart-container">
    <div class="text-16-bold">결제 정보 입력</div>
    <div class="white-normal-box-20 container-1" style="width:1060px;padding-bottom:10px;">
        <div class="method-select gothic text-12" style="margin:0 0 0 30px;">
            <div class="member">
                <i class="fa fa-check-circle-o"></i>
                신규 정보
            </div>
            <div class="member">
                <i class="fa fa-circle-o"></i>
                최근 배송지
            </div>
            <div class="member">
                <i class="fa fa-circle-o"></i>
                내 정보
            </div>
        </div>
        <table id="payment-phone" class="order-table">
            <thead>
                <tr>
                    <th></th>
                    <td></td>
                </tr>
            </thead>
        </table>
    </div>
</div>
<?php
				}
?>