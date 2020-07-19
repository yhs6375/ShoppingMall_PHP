console.log("enenenen")
function analyticsPageLoadChart(){
    var chart = new HS.ChartView();
    chart.makeVisitorAnalyticsMonthChart(document.getElementById("analytics-month-chart"));
    chart.makeVisitorAnalyticsTimeChart(document.getElementById("analytics-time-chart"));
    chart.makeDeviceAnalyticsChart(document.getElementById("analytics-device-chart"));
}