<?php
require_once "./view/module.php";

use Server\Shopping\Product\CategoryManager;

$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
    $pjax = $_SERVER['HTTP_HS_PJAX'];
}
function get_category_info_case_main_html($categoryList)
{
    foreach ($categoryList as $category) {
?>
<div>
    <div class="main-table">
        <div class="table-row">
            <div class="table-row-cell column-id"><?php echo $category->id ?></div>
            <div class="table-row-cell category-name flex-center">
                <div class="text-ellipsis"><?php echo $category->name ?></div>
                <input type="text" style="display:none" />
            </div>
            <div class="table-row-cell column-number category-order">
                <span><?php echo $category->order ?></span>
                <input type="number" style="display:none" />
            </div>
            <div class="table-row-cell category-goods">
                <u><?php echo $category->goodsCount ?></u>
                <mat-icon>expand_more</mat-icon>
            </div>
        </div>
    </div>
    <div class="sub-table">

    </div>
</div>
<?php
    }
}
function category_detail_page_content()
{
    $categoryType = $_GET["s"];
    if ($categoryType == 1) {
        $category = CategoryManager::GetMainCategoryById($_REQUEST["id"]);
        $subCategoryList = CategoryManager::GetSubCategoryListById($category->id)->categoryList;
    } else if ($categoryType == 2) {
        $category = CategoryManager::GetSubCategoryById($_REQUEST["id"]);
    }

    ?>
<content id="category-detail-content" class="page-layout flex-column flex-inner">
    <div class="top-bg"></div>
    <div class="content px-32 flex-inner">
        <div class="detail-content-header">
            <div class="fs-24 flex-normal-row font-white" style="min-width:190px;">
                <mat-icon style="font-size:32px;">shopping_basket</mat-icon>
                <div class="ml-16">카테고리 관리</div>
            </div>
            <div class="flex-normal-row content-center">
                <div class="category-detail-wrapper white">
                    <div class="category-detail-row">
                        <div class="detail-tab">이름</div>
                        <input placeholder="카테고리 추가" type="text" value="<?php echo $category->name; ?>" />
                        <div class="detail-tab">우선순위</div>
                        <input type="number" style="width:80px;" value="<?php echo $category->order; ?>" />
                    </div>
                    <div class="category-detail-row">
                        <div class="detail-tab">상위 카테고리</div>
                        <?php if ($categoryType == 1) { ?><input type="text" disabled /> <?php } ?>
                        <?php if ($categoryType == 2) { ?><input type="text"
                            value="<?php echo $category->parent_id; ?>" /> <?php } ?>
                    </div>
                    <div class="category-detail-row">
                        <div class="category-add-reserved">예약</div>
                    </div>
                </div>
                <button id="category-modify" class="normal-button white" style="height:40px;">
                    <div>수정</div>
                </button>
            </div>
            <div></div>
        </div>
        <div class="details flex-column flex-inner mb-12">
            <div class="tab-container">
                <div class="tab-header">
                    <div class="tab-member-container">
                        <?php if ($_REQUEST['s'] == 1) { ?>
                        <div class="tab-member button button-ripple select">
                            <div class="tab-label selected">서브카테고리</div>
                            <ripple></ripple>
                        </div>
                        <?php } ?>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">상품</div>
                            <ripple></ripple>
                        </div>
                    </div>
                    <div class="tab-ink-bar"></div>
                </div>
                <div class="tab-body-container">
                    <?php if ($_REQUEST['s'] == 1) { ?>
                    <div class="tab-body select">
                        <div class="table">
                            <div class="table-header">
                                <div class="table-header-cell column-id">
                                    <button>ID</button>
                                </div>
                                <div class="table-header-cell column-name flex-center">
                                    <button>카테고리명</button>
                                </div>
                                <div class="table-header-cell column-number">
                                    <button>우선순위</button>
                                </div>
                                <div class="table-header-cell category-goods">
                                    <button>상품 수</button>
                                </div>
                                <div class="table-header-cell column-price">
                                </div>
                            </div>
                            <div id="category-table-body" class="table-row-container">
                                <?php get_category_info_case_main_html($subCategoryList); ?>
                            </div>
                        </div>
                        <div class="pagination-container px-8">
                            <div class="paginator-size-container">
                                <div class="mr-16">페이지 당 상품 수</div>
                                <div class="selector-wrapper">
                                    <div class="selector">
                                        <div class="selector-value"><span class="selector-value-text">10</span></div>
                                        <div class="selector-arrow"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="paginator-range-container">
                                <div class="paginator-range-text">
                                    1 - 10 / 20
                                </div>
                                <button id="page-prev" class="button-ripple page-move-button">
                                    <mat-icon class="fs-32 pos-relative" style="right:3px;line-height:40px;">
                                        keyboard_arrow_left
                                    </mat-icon>
                                    <div class="mat-button-ripple ripple-button-round"></div>
                                </button>
                                <button id="page-next" class="button-ripple page-move-button">
                                    <mat-icon class="fs-32 pos-relative" style="right:3px;line-height:40px;">
                                        keyboard_arrow_right
                                    </mat-icon>
                                    <div class="mat-button-ripple ripple-button-round"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <?php } ?>
                    <div class="tab-body next"></div>
                </div>
            </div>
        </div>
    </div>
</content>
<?php
}
if ($pjax) {
    category_detail_page_content();
    return true;
}
head_start();
load_script_from_end(); ?>
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
    if (HS.urlParameterExtract("s") == 1) {
        HSScroll.make({
            width: 11,
            railDisplay: false,
            scrollTarget: document.getElementById("category-table-body"),
            scrollAppendNode: document.getElementById("category-table-body"),
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

    PageDetail.script.categoryScript();
    PageDetail.script.removeScript = PageDetail.script.removeCategoryScript;
}
</script>
<?php
head_end();
admin_page_body_start();
?>
<?php sidebarHTML("category-select"); ?>
<div id="container2">
    <?php toolbarHTML(); ?>
    <div id="content-container">
        <?php category_detail_page_content(); ?>
    </div>
</div>
<?php body_end(); ?>