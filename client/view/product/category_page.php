<?php
require_once "./view/module.php";

use Server\Shopping\Product\ProductManager;
use Server\Shopping\Product\CategoryManager;

$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
	$pjax = $_SERVER['HTTP_HS_PJAX'];
}
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
function page_category_html()
{
	$id = (int)$_REQUEST['id'];
	if ($_GET['m'] == 0) {
		$targetCategory = CategoryManager::GetMainCategoryById($_REQUEST['id']);
		$subCategoryList = CategoryManager::GetSubCategoryListById($_REQUEST['id'])->categoryList;
		$products = ProductManager::GetProductListByCategory($targetCategory->id, 0, 0, 10);
	} else {
		$targetCategory = CategoryManager::GetSubCategoryById($_REQUEST['id']);
		$mainCategory = CategoryManager::GetMainCategoryById($targetCategory->parent_id);
		$subCategoryList = CategoryManager::GetMainCategoryById($mainCategory->id)->categoryList;
		$products = ProductManager::GetProductListByCategory($mainCategory->id, $targetCategory->id, 0, 10);
	}


?>
<div class="cat-header">
    <div class="cat-title">
        <div class="preview-track-desc-wrap">
            <div class="preview-track-line"></div>
            <div class="preview-track-name">
                <h3 class="text-center"><?php echo $targetCategory->name ?></h3>
            </div>
        </div>
    </div>
    <div class="cat-select-sub">
        <div class="cat-sub selected" data-num="0">전체</div>
        <?php
			foreach ($subCategoryList as $subCategory) {
			?>
        <div class="cat-sub" data-num="<?php echo $subCategory->id ?>?"><?php echo $subCategory->name ?></div>
        <?php
			}
			?>
    </div>
</div>
<div class="cat-body">
    <div class="goods-count">총 <strong id="goods-count"><?php echo $products->count ?></strong>개의 상품</div>
    <div class="goods-ordering">
        <div class="order-type selected">인기순</div>
        <div class="order-type">낮은 가격순</div>
        <div class="order-type">높은 가격순</div>
        <div class="order-type">많은 리뷰순</div>
        <div class="order-type">높은 평가순</div>
    </div>
    <div class="goods-list">
        <div class="goods-preview-container">
            <?php
				foreach ($products->productList as $product) {
					product_preview_html($product, 1, 0);
				}
				?>
        </div>
    </div>
</div>
<?php
}
if ($pjax) {
	page_category_html();
	return true;
}
head();
body_head();
body_contents_container_start();
page_category_html();
footer();
load_script_from_end();
?>