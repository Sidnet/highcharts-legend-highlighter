$(function () {
    var chartOptions = {
        legend: {
            highlightSeries: {
                enabled: true
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2010'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ],
            showInLegend: true
        }]
    };

    $('#chart').highcharts(chartOptions);

    chartOptions.legend.highlightSeries.enabled = false;
    chartOptions.title.text = chartOptions.title.text + " (no plugin effect)";
    $('#chart-noplugin').highcharts(chartOptions);
});
    
