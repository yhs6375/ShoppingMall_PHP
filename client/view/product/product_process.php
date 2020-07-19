<?php
require_once "./view/module.php";

use Server\Shopping\Product\ProductManager;
use Server\Shopping\Product\CategoryManager;

$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
	$pjax = $_SERVER['HTTP_HS_PJAX'];
}
function product_option_html($options)
{
	foreach ($options as $option) {
?>
<div class="dropdown">
    <div class="option-dropdown" id="goods-option" data-toggle="dropdown">
        <div class="current-option med-dark-grey"><?php echo $option->name; ?></div>
        <div class="caret float-right"></div>
    </div>
    <ul class="dropdown-menu">
        <?php foreach ($option->values as $value) { ?>
        <li><?php echo $value; ?></li>
        <?php } ?>
    </ul>
</div>
<?php
	}
}
function page_goods_html()
{

	$productId = $_REQUEST['id'];
	$productInfo = ProductManager::GetProductDetail($productId)->product;
	?>
<div class="goods-container">
    <div class="goods-header">
        <div class="goods-img-viewer">
            <div class="goods-preview-img">
                <img src="<?php echo URLDecode($productInfo->image_url); ?>" />
            </div>
            <div class="goods-preview-img-select">
                <div class="preview-img-member"><img src="<?php echo URLDecode($productInfo->image_url); ?>" /></div>
                <div class="preview-img-member"><img src="<?php echo URLDecode($productInfo->image_url); ?>" /></div>
            </div>
        </div>
        <div class="goods-account-container">
            <div class="goods-data">
                <div class="name text-18-bold">
                    <?php echo URLDecode($productInfo->name); ?>
                </div>
                <div class="member">
                    <div class="left">
                        가격
                    </div>
                    <div class="right theme-color square-large-bold">
                        <?php echo number_format($productInfo->price); ?>원
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        배송비
                    </div>
                    <div class="right">
                        <?php echo number_format($productInfo->shipping_fee); ?>원
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        적립금
                    </div>
                    <div class="right">
                        <?php echo number_format($productInfo->saved); ?>원
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        생산지
                    </div>
                    <div class="right">
                        아라비아산
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        규격
                    </div>
                    <div class="right">
                        1kg
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        만족도
                    </div>
                    <div class="right">
                        <div class="goods-grade">
                            <span class="full-star"></span>
                            <span class="full-star"></span>
                            <span class="full-star"></span>
                            <span class="full-star"></span>
                            <span class="half-star"></span>
                        </div>
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        옵션
                    </div>
                    <div class="right">
                        <?php product_option_html($productInfo->options); ?>
                    </div>
                </div>
                <div class="member">
                    <div class="left">
                        구매 수량
                    </div>
                    <div class="right">
                        <div class="buy-count-table">
                            <div id="buy-count-dec"></div>
                            <input id="buy-count" class="text-18-bold theme-color" type="text" value="1" />
                            <div id="buy-count-inc"></div>
                        </div>
                    </div>
                </div>
                <div class="division-line" style="margin-top:50px;"></div>
            </div>
            <div class="price-result">
                <label class="float-left text-14-bold">총 합계금액(수량)</label>
                <div class="float-right square-normal-bold price-box">
                    <div id="price" class="text-20-bold">5,000</div>원
                </div>
            </div>
            <div id="result-shopping-cart" class="small-but">장바구니로</div>
            <div id="result-buy" class="small-but">바로구매</div>
        </div>
    </div>
    <div class="goods-info">
        <div class="flex-box">
            <div id="go-goods-info" class="inverse-but-left">상품정보</div>
            <div id="go-goods-review" class="inverse-but-left">상품리뷰</div>
            <div id="go-goods-inquiry" class="inverse-but-left">상품문의</div>
            <div id="result-shopping-cart" class="but text-13-bold">장바구니</div>
            <div id="result-buy" class="but text-13-bold">바로구매</div>
        </div>
        <div id="goods-contents" class="white-normal-box-120" style="height:2000px;">
            <?php echo URLDecode($productInfo->html); ?>
        </div>
        <div id="goods-review" class="normal-box-120">
            <div class="title text-16-bold">
                상품리뷰 <label id="review-title-count" class="theme-color">85</label>건
            </div>
            <div class="text-12-bold">
                상품 사용후기를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 상품문의에 남겨주세요.
            </div>
            <div id="review-box">
                <div class="row table-header text-13-bold">
                    <div class="col-xs-1">번호</div>
                    <div class="col-xs-2">만족도</div>
                    <div class="col-xs-4">제목</div>
                    <div class="col-xs-2">작성자</div>
                    <div class="col-xs-1">좋아요</div>
                    <div class="col-xs-2">작성일</div>
                </div>
                <div class="member">
                    <div class="row table-body">
                        <div class="col-xs-1">1</div>
                        <div class="col-xs-2">
                            <div class="goods-grade">
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="half-star"></span>
                            </div>
                        </div>
                        <div class="col-xs-4">맛있게 잘먹었습니다~</div>
                        <div class="col-xs-2">abcd3**</div>
                        <div class="col-xs-1">382</div>
                        <div class="col-xs-2">2017-02-12 16:04:18</div>
                    </div>
                    <div class="review-contents">
                        사과에서 향긋한 향이나는게 정말 좋은 사과같더라구요~
                        재구매의향 100%입니다!
                        좋은사과 감사합니다~
                    </div>
                </div>
                <div class="member">
                    <div class="row table-body">
                        <div class="col-xs-1">2</div>
                        <div class="col-xs-2">
                            <div class="goods-grade">
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="no-star"></span>
                                <span class="no-star"></span>
                                <span class="no-star"></span>
                            </div>
                        </div>
                        <div class="col-xs-4">사과에서 신맛이나네요</div>
                        <div class="col-xs-2">v3fd3**</div>
                        <div class="col-xs-1">13</div>
                        <div class="col-xs-2">2017-02-12 18:05:12</div>
                    </div>
                    <div class="review-contents">
                        사과에서 향긋한 향이나는게 정말 좋은 사과같더라구요~
                        재구매의향 100%입니다!
                        좋은사과 감사합니다~
                    </div>
                </div>
                <div class="member">
                    <div class="row table-body">
                        <div class="col-xs-1">3</div>
                        <div class="col-xs-2">
                            <div class="goods-grade">
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                                <span class="full-star"></span>
                            </div>
                        </div>
                        <div class="col-xs-4">남편이 정말 잘먹네요~</div>
                        <div class="col-xs-2">refd3**</div>
                        <div class="col-xs-1">3904</div>
                        <div class="col-xs-2">2017-02-12 12:34:14</div>
                    </div>
                    <div class="review-contents">
                        사과에서 향긋한 향이나는게 정말 좋은 사과같더라구요~
                        재구매의향 100%입니다!
                        좋은사과 감사합니다~
                    </div>
                </div>
            </div>
            <div id="review-pager" class="pager">
                <span class="page select">1</span>
                <span class="page">2</span>
                <span class="page">3</span>
                <span class="page">4</span>
            </div>
        </div>
        <div id="goods-inquiry" class="normal-box-20">
            <div class="title text-16-bold">
                상품문의
            </div>
            <div id="inquiry-box">
                <div class="row table-header text-13-bold">
                    <div class="col-xs-2">번호</div>
                    <div class="col-xs-5">제목</div>
                    <div class="col-xs-2">작성자</div>
                    <div class="col-xs-3">작성일</div>
                </div>
                <div class="member">
                    <div class="row table-body">
                        <div class="col-xs-2">1</div>
                        <div class="col-xs-5">배송 언제도착하는건가요?</div>
                        <div class="col-xs-2">abcd3**</div>
                        <div class="col-xs-3">2017-02-12 16:04:18</div>
                    </div>
                    <div class="inquiry-contents">
                        Q. 배송주문한지 한달지났습니다. 언제까지 기다리게 할 생각인가요?
                        <div class="division-line"></div>
                        A. 앞으로 14일뒤에 도착합니다.
                    </div>
                </div>
            </div>
            <div id="review-pager" class="pager">
                <span class="page select">1</span>
            </div>
        </div>
    </div>
</div>
<div id="review-sidebar" class="sidebar-goods-review-wrapper">
    <div class="sidebar-goods-review">
        가나다라마바사아자차카?
    </div>
</div>

<?php
}
if ($pjax) {
	page_goods_html();
	return true;
}

head();
body_head();
body_contents_container_goods();
page_goods_html();
footer();
load_script_from_end();
?>
<script src="assets/js/goods.js"></script>