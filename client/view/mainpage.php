<?php
require_once "./view/module.php";

use Server\Shopping\Product\ProductManager;
use Server\Shopping\Product\CategoryManager;

function product_preview_html($product, $hot, $new)
{
?>
<div class="goods-wrap">
    <div class="goods-box">
        <a href="/goods/<?php echo $product->id ?>">
            <?php if ($new == 1) { ?><div class="new-mark">NEW</div> <?php } ?>
            <img class="fixed-img" src="<?php echo URLDecode($product->image_url) ?>" />
        </a>
        <div class="goods-title"><a
                href="./goods/<?php echo $product->id ?>"><?php echo URLDecode($product->name) ?></a></div>
        <div class="goods-grade">
            <span class="full-star"></span>
            <span class="full-star"></span>
            <span class="full-star"></span>
            <span class="full-star"></span>
            <span class="half-star"></span>
        </div>
        <div class="goods-review-count">리뷰 3건</div>
        <div class="goods-price"><strong><?php echo number_format($product->price); ?></strong>원</div>
    </div>
</div>
<?php
}
function page_main_html()
{
	$productList = ProductManager::GetProductList(0, 8)->productList;
	$newProductList = ProductManager::GetNewProductList(0, 8)->productList;
?>
<div id="main-img-viewer" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#main-img-viewer" data-slide-to="0" class="active"></li>
        <li data-target="#main-img-viewer" data-slide-to="1"></li>
        <li data-target="#main-img-viewer" data-slide-to="2"></li>
        <li data-target="#main-img-viewer" data-slide-to="3"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="assets/img/test5.jpg" alt="Chania" width="460" height="345">
            <div class="carousel-caption">
                <h3>싸고 신선합니다.</h3>
            </div>
        </div>
        <div class="item">
            <img src="assets/img/test2.jpg" alt="Chania" width="460" height="345">
            <div class="carousel-caption">
                <h3>맛 좋아요.</h3>
            </div>
        </div>
        <div class="item">
            <img src="assets/img/test3.jpg" alt="Flower" width="460" height="345">
            <div class="carousel-caption">
                <h3>신선합니다.</h3>
            </div>
        </div>
        <div class="item">
            <img src="assets/img/test4.jpg" alt="Flower" width="460" height="345">
            <div class="carousel-caption">
                <h3>안 맵습니다.</h3>
            </div>
        </div>
    </div>
    <a class="left carousel-control" href="#main-img-viewer" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#main-img-viewer" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
<div class="hot-goods-preview">
    <div class="preview-track-desc-wrap">
        <div class="preview-track-line"></div>
        <div class="preview-track-name">
            <h3 class="text-center"><strong class="theme-color">인기</strong> 상품</h3>
        </div>
        <div class="preview-track-desc text-center">가장 인기가 많은 상품으로 믿고 추천 드립니다.</div>
    </div>
    <div class="goods-preview-container">
        <?php
			foreach ($productList as $product) {
				product_preview_html($product, 1, 0);
			}
			?>
    </div>
</div>
<div class="hot-goods-preview">
    <div class="preview-track-desc-wrap">
        <div class="preview-track-line"></div>
        <div class="preview-track-name">
            <h3 class="text-center"><strong class="theme-color">신</strong> 상품</h3>
        </div>
        <div class="preview-track-desc text-center">새로운 상품입니다.</div>
    </div>
    <div class="goods-preview-container">
        <?php
			foreach ($newProductList as $product) {
				product_preview_html($product, 0, 1);
			}
			?>
    </div>
</div>
<?php
}
head();
body_head();
body_contents_container_start();
page_main_html();
footer();
load_script_from_end();
?>