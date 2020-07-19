<?php
require_once "./view/module.php";
$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
    $pjax = $_SERVER['HTTP_HS_PJAX'];
}

function options_html($optionName, $subOptions = [])
{
?>
<div class="np-option-box">
    <div class="np-option-header">
        <div class="np-option-title flex-normal-row p-8">
            <div class="flex-size1"><?php echo $optionName; ?></div>
            <div class="option-delete button-wrapper flex-right" style="width:28px;">
                <mat-icon style="font-size:28px; width:auto;">clear</mat-icon>
            </div>
        </div>
        <div class="option1-add flex-normal-row">
            <div class="button-wrapper sub-option-add" style="width:28px;">
                <mat-icon style="font-size:28px; width:auto;">add</mat-icon>
            </div>
            <input type="text" />
        </div>
    </div>
    <div class="np-option-body">
        <?php foreach ($subOptions as $subOption) {
            ?>
        <div class="np-option-sub">
            <div class="sub-name"><?php echo $subOption->name; ?></div>
            <input class="sub-name-modify" style="display:none" type="text" />
            <div class="button-wrapper modify" style="width:24px;">
                <mat-icon style="font-size:18px; width:auto;">edit</mat-icon>
            </div>
            <div class="button-wrapper delete" style="width:24px;">
                <mat-icon style="font-size:18px; width:auto;">clear</mat-icon>
            </div>
        </div>
        <?php
            }
            ?>

    </div>
</div>
<?php
}
function products_page_content()
{
?>
<content id="products-content" class="page-layout flex-column flex-inner">
    <div class="top-bg"></div>
    <div class="content px-32 flex-inner">
        <div class="content-header">
            <div class="fs-24 flex-normal-row font-white">
                <mat-icon style="font-size:32px;">shopping_basket</mat-icon>
                <div class="ml-16">새 상품</div>
            </div>
            <button id="new-product-confirm" class="normal-button white">
                <div>상품 추가</div>
            </button>
        </div>

        <div class="details flex-column flex-inner mb-12">
            <div id="new-product-tab" class="tab-container">
                <div class="tab-header">
                    <div class="tab-member-container">
                        <div class="tab-member button button-ripple select">
                            <div class="tab-label selected">정보</div>
                            <ripple></ripple>
                        </div>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">상품 이미지</div>
                            <ripple></ripple>
                        </div>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">상품 가격</div>
                            <ripple></ripple>
                        </div>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">재고</div>
                            <ripple></ripple>
                        </div>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">상품 속성</div>
                            <ripple></ripple>
                        </div>
                        <div class="tab-member button button-ripple">
                            <div class="tab-label">카테고리</div>
                            <ripple></ripple>
                        </div>
                    </div>
                    <div class="tab-ink-bar"></div>
                </div>

                <div class="tab-body-container">
                    <div class="tab-body select">
                        <?php textForm("상품명", "상품명", "margin-bottom:16px;"); ?>
                        <div class="test1">
                            <div class="test2"></div>
                            <div id="product-editor"></div>
                        </div>
                    </div>
                    <div class="tab-body next">
                        <div class="product-main-image-container">
                            <div class="product-main-image-preview">
                                <img />
                            </div>
                            <div class="product-main-image-detail">
                                <div class="product-main-image-selector">
                                    <input id="product-main-image-selector" type="file" accept=".gif,.jpeg,.jpg,.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-body next">
                        <?php textForm("상품 가격", "상품 가격", "margin-bottom:26px;"); ?>
                        <?php textForm("할인 가격(상품가와 동일시 입력X)", "할인 가격", "margin-bottom:26px;"); ?>
                        <?php textForm("배송비", "배송비", "margin-bottom:26px;"); ?>
                        <?php textForm("적립금", "", ""); ?>
                    </div>
                    <div class="tab-body next">
                        <?php textForm("재고", "재고", "margin-bottom:26px;"); ?>
                    </div>
                    <div class="tab-body flex-normal-row next">
                        <div class="np-option1-container flex-size1 flex-column flex-50">
                            <div id="option1-add" class="button-wrapper mb-16" style="width:36px;">
                                <mat-icon style="font-size:36px; width:auto;">add</mat-icon>
                            </div>
                            <?php textForm("옵션 이름", "옵션 이름", "margin-bottom:16px;margin-right:24px;"); ?>
                        </div>
                        <div class="np-option2-container flex-50">

                        </div>
                    </div>
                    <div class="tab-body next">
                        <?php textForm("메인카테고리", "ID", "margin-bottom:26px;"); ?>
                        <?php textForm("서브카테고리(없으면 공백)", "ID", "margin-bottom:26px;"); ?>
                    </div>
                </div>
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
load_script_from_end(); ?>
<script>
window.onload = function() {
    PageDetail.script.newProductScript();
    PageDetail.script.removeScript = PageDetail.script.removeNewProductScript;
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