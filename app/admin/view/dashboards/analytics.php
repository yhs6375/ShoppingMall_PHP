<?php
require_once "./view/module.php";
$pjax = false;
if (isset($_SERVER['HTTP_HS_PJAX'])) {
    $pjax = $_SERVER['HTTP_HS_PJAX'];
}
function analytics_page_content()
{
?>
<content id="analytics-content" class="page-layout flex-column">
    <div class="top-content flex-column">
        <div class="pos-relative p-24 blue-600 flex-size1 content-center">
            <div class="flex flex-left flex-column">
                <div class="fs-20">
                    방문자수
                </div>
                <div class="fs-13 secondary-text">
                    월별 사용 통계
                </div>
            </div>
            <div class="flex flex-right font-slim16">
                <div class="px-8 py-8 blue-700 cursor-pointer" style="margin-right:10px;">
                    2016
                </div>
                <div class="px-8 py-8 cursor-pointer" style="margin-right:10px;">
                    2017
                </div>
                <div class="px-8 py-8 cursor-pointer">
                    2018
                </div>
            </div>
        </div>
        <div class="blue-600 pos-relative chart-box1">
            <canvas id="analytics-month-chart"></canvas>
        </div>
    </div>
    <div class="details">
        <div class="left">
            <div class="normal-label1 pb-24 font-600">유저 방문 통계(시간)</div>
            <div class="detail">
                <div class="p-24 flex-row-center-space">
                    <div class="flex">
                        <div class="font-slim20">방문자수 & 페이지 조회수</div>
                    </div>
                    <div class="flex flex-row">
                        <div class="py-8 px-12">Yesterday</div>
                        <div class="py-8 px-12">Today</div>
                    </div>
                </div>
                <div class="pb-16" style="height:368px;">
                    <canvas id="analytics-time-chart"></canvas>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="mb-48 mr-32">
                <div class="normal-label1 pb-24">Where are your top devices?</div>
                <div class="detail">
                    <div class="p-16">Sessions by device</div>
                    <div style="height:200px;">
                        <canvas id="analytics-device-chart"></canvas>
                    </div>
                </div>
            </div>
            <div class="mb-48 mr-32">
                <div class="normal-label1 pb-24">Where are your top devices?</div>
                <div class="detail">
                    <div class="p-16">Sessions by device</div>

                </div>
            </div>
        </div>
    </div>
</content>
<?php
}
if ($pjax) {
    analytics_page_content();
    return true;
}
head_start();
load_script_from_end(); ?>
<script>
HSWeb.LoadScript("/assets/js/Chart.min.js", "chart-lib", true);
HSWeb.LoadScript("/assets/js/chart/chartUtil.js", "chart-util", true);
HSWeb.LoadScript("/assets/js/chart/chartPage.js", "chart-page", true);
</script>
<script>
window.onload = function() {
    document.getElementById("container").style.visibility = "visible";
    analyticsPageLoadChart();
    window.Scroll = HSScroll.make({
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
<?php sidebarHTML("analytics"); ?>
<div id="container2">
    <?php toolbarHTML(); ?>
    <div id="content-container">
        <?php analytics_page_content(); ?>
    </div>
</div>
<?php body_end(); ?>