<?php
require_once "./view/module.php";

use Server\Shopping\Product\ProductManager;
use Server\Shopping\Product\CategoryManager;

$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
    $pjax = $_SERVER['HTTP_HS_PJAX'];
}
function get_product_html($productList)
{
    foreach ($productList as $product) {
        if ($product->sub_category_id) {
            $subCategoryName = CategoryManager::GetCategoryName($product->sub_category_id, true)->name;
            $categoryName = CategoryManager::GetCategoryName($product->category_id)->name;
        } else {
            $categoryName = CategoryManager::GetCategoryName($product->category_id)->name;
        }
?>
<div class="table-row">
    <div class="table-row-cell column-id"><?php echo $product->id; ?></div>
    <div class="table-row-cell column-image"><img src="<?php echo URLDecode($product->image_url); ?>" /></div>
    <div class="table-row-cell column-name">
        <div class="text-ellipsis"><?php echo URLDecode($product->name); ?></div>
    </div>
    <div class="table-row-cell column-category"><?php
                                                        if ($product->sub_category_id) {
                                                            $name = $subCategoryName;
                                                            $name .= "(" . $categoryName . ")";
                                                        } else {
                                                            $name = $categoryName;
                                                        }
                                                        echo $name;
                                                        ?></div>
    <div class="table-row-cell column-price"><?php echo number_format($product->price) ?>원</div>
    <div class="table-row-cell column-quantity"><span class="quantity-indicator red-1 mr-8"></span>
        <?php echo $product->stock; ?>
    </div>
    <div class="table-row-cell column-active-product">
        <mat-icon>check</mat-icon>
    </div>
</div>
<?php
    }
}
function products_page_content()
{
    $pageRange = isset($_GET['r']) ? (int)$_GET['r'] : 5;
    $pageCount = isset($_GET['c']) ? (int)$_GET['c'] : 0;
    $pageStart = $pageRange * $pageCount + 1;
    $result = ProductManager::GetProductList($pageStart - 1, $pageRange);
    $productList = (array)$result->productList;
    $getCount = $result->count;
    $productCount = ProductManager::GetProductCount()->count;
    ?>
<content id="products-content" class="page-layout flex-column flex-inner">
    <div class="top-bg"></div>
    <div class="content px-32 flex-inner">
        <div class="content-header">
            <div class="fs-24 flex-normal-row font-white">
                <mat-icon style="font-size:32px;">shopping_basket</mat-icon>
                <div class="ml-16">상품</div>
            </div>
            <div class="search-wrapper white">
                <div class="search">
                    <mat-icon>search</mat-icon>
                    <input placeholder="상품 검색" />
                </div>
            </div>
            <button id="new-product-add-button" class="normal-button white">
                <div>새 상품 추가</div>
            </button>
        </div>
        <div class="details flex-column flex-inner mb-12">
            <div class="table">
                <div class="table-header">
                    <div class="table-header-cell column-id">
                        <button>ID</button>
                    </div>
                    <div class="table-header-cell column-image">
                    </div>
                    <div class="table-header-cell column-name">
                        <button>상품명</button>
                    </div>
                    <div class="table-header-cell column-category">
                        <button>카테고리</button>
                    </div>
                    <div class="table-header-cell column-price">
                        <button>가격</button>
                    </div>
                    <div class="table-header-cell column-quantity">
                        <button>재고</button>
                    </div>
                    <div class="table-header-cell column-active-product">
                        <button>상품유/무</button>
                    </div>
                </div>
                <div id="product-table-body" class="table-row-container">
                    <?php get_product_html($productList); ?>
                </div>
            </div>
            <div class="pagination-container px-8">
                <div class="paginator-size-container">
                    <div class="mr-16">페이지 당 카테고리 수</div>
                    <div class="selector-wrapper">
                        <div class="selector">
                            <div class="selector-value"><span
                                    class="selector-value-text"><?php echo $pageRange; ?></span></div>
                            <div class="selector-arrow"></div>
                        </div>
                    </div>
                </div>
                <div class="paginator-range-container">
                    <div class="paginator-range-text">
                        <?php
                            echo $pageStart . " - " . ($pageStart + $getCount - 1) . " / " . $productCount;
                            ?>
                    </div>
                    <button id="page-prev" class="button-ripple page-move-button">
                        <mat-icon class="fs-32 pos-relative" style="right:3px;line-height:40px;">keyboard_arrow_left
                        </mat-icon>
                        <div class="mat-button-ripple ripple-button-round"></div>
                    </button>
                    <button id="page-next" class="button-ripple page-move-button">
                        <mat-icon class="fs-32 pos-relative" style="right:3px;line-height:40px;">keyboard_arrow_right
                        </mat-icon>
                        <div class="mat-button-ripple ripple-button-round"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</content>
<?php
}
if ($pjax) {
    products_page_content();
    return true;
}
head_start();
load_script_from_end();
?>
<script>
window.onload = function() {
    HSScroll.make({
        width: 11,
        railDisplay: false,
        scrollTarget: document.getElementById("content-container"),
        scrollAppendNode: document.getElementById("container"),
        //railOpacity:0.5,
        scrollOpacity: 0.8,
        over: {
            scrollOpacity: 1.0,
            railOpacity: 0.9,
            overWidth: 14
        },
        fade: true,
        tickButton: {
            display: false
        }
    });
}
</script>
<?php
head_end();
admin_page_body_start();
?>
<?php sidebarHTML("products"); ?>
<div id="container2">
    <?php toolbarHTML(); ?>
    <div id="content-container">
        <?php products_page_content(); ?>
    </div>
</div>
<?php body_end(); ?>