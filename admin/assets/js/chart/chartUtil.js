console.log("222222222");
(function() {
    var ChartView = function() {};
    ChartView.prototype.makeVisitorAnalyticsMonthChart = function(canvasNode) {
        console.log(canvasNode);
        var ctx = canvasNode.getContext("2d"),
            chart;
        function drawDatasetPointsLabels() {
            var dataset = chart.getDatasetMeta(0);
            var ctx = chart.ctx;
            dataset.data.forEach(function(item, idx) {
                ctx.save();
                var x = item._view.x;
                var y = item._view.y;
                ctx.font = '.9rem "Gotham Book",sans-serif';
                ctx.textAlign = "center";
                ctx.beginPath();
                ctx.setLineDash([4, 5]);
                ctx.moveTo(x, y - 15);
                ctx.lineTo(x, 20);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#56a5eb";
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.lineWidth = 1;
                ctx.fillStyle = "#eee";
                ctx.fillText("2.9k", x, 15);
                ctx.restore();
            });
        }

        var config = {
            type: "line",
            data: {
                datasets: [
                    {
                        data: [20, 50, 100, 75, 25, 0],
                        borderWidth: 0,
                        borderColor: "#1e88e5",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "#f062c4",
                        label: "Left dataset",
                        backgroundColor: "#42a5f5",
                        // This binds the dataset to the left y axis
                        yAxisID: "left-y-axis"
                    }
                ],
                labels: ["3월", "4월", "5월", "6월", "7월", "8월"]
            },
            options: {
                layout: {
                    padding: {
                        left: 30,
                        right: 30
                    }
                },
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawBorder: false,
                                color: "#aaaaaa",
                                z: 0,
                                borderDash: [5, 15],
                                borderDashOffset: 0,
                                //offsetGridLines:true,
                                circular: true,
                                lineWidth: 2
                            },
                            fontColor: "#fff"
                        }
                    ],
                    yAxes: [
                        {
                            id: "left-y-axis",
                            type: "linear",
                            position: "left",
                            gridLines: {
                                display: false,
                                drawBorder: false,
                                z: 0
                            },
                            showValue: {
                                fontStyle: "Helvetica", //Default Arial
                                fontSize: 20
                            },
                            ticks: {
                                max: 150,
                                display: false
                            }
                        }
                    ]
                },
                animation: {
                    onProgress: function(animation) {
                        drawDatasetPointsLabels();
                    },
                    onComplete: function(animation) {
                        drawDatasetPointsLabels();
                    }
                }
            }
        };
        chart = new Chart(ctx, config);
    };
    ChartView.prototype.makeVisitorAnalyticsTimeChart = function(canvasNode) {
        var ctx = canvasNode.getContext("2d"),
            chart;
        var config = {
            type: "line",
            data: {
                datasets: [
                    {
                        data: [20, 50, 100, 75, 25, 0],
                        borderWidth: 0,
                        borderColor: "#1e88e5",
                        pointBorderColor: "#fff",
                        pointBackgroundColor: "#f062c4",
                        label: "Left dataset",
                        backgroundColor: "#42a5f5",
                        // This binds the dataset to the left y axis
                        yAxisID: "left-y-axis"
                    }
                ],
                labels: ["3월", "4월", "5월", "6월", "7월", "8월"]
            },
            options: {
                layout: {
                    padding: {
                        left: 30,
                        right: 30
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawBorder: false,
                                color: "#aaaaaa",
                                z: 0,
                                borderDash: [5, 15],
                                borderDashOffset: 0,
                                //offsetGridLines:true,
                                circular: true,
                                lineWidth: 2
                            },
                            fontColor: "#fff"
                        }
                    ],
                    yAxes: [
                        {
                            id: "left-y-axis",
                            type: "linear",
                            position: "left",
                            gridLines: {
                                display: true,
                                z: 0
                            },
                            showValue: {
                                fontStyle: "Helvetica", //Default Arial
                                fontSize: 20
                            },
                            ticks: {
                                max: 150,
                                display: true
                            }
                        }
                    ]
                }
            }
        };
        chart = new Chart(ctx, config);
    };
    ChartView.prototype.makeDeviceAnalyticsChart = function(canvasNode) {
        var ctx = canvasNode.getContext("2d"),
            chart;
        var config = {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: [53, 17, 30],
                        backgroundColor: ["#39c1ad", "#b91393", "#9c1101"]
                    }
                ],
                labels: ["Desktop", "Mobile", "Tablet"]
            },
            options: {
                responsive: true,
                legend: {
                    position: "top"
                },
                maintainAspectRatio: false
            }
        };
        chart = new Chart(ctx, config);
    };
    console.log(ChartView);
    window.HS.ChartView = ChartView;
})();
