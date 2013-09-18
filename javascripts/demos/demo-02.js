$(function () {
    var chartOptions = {
        legend: {
            highlightSeries: {
                enabled: true
            }
        },
        chart: {
            type: 'area'
        },
        title: {
            text: 'Area chart with negative values'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, -2, -3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, -2, 5]
        }]
    };

    $('#chart').highcharts(chartOptions);

    chartOptions.legend.highlightSeries.enabled = false;
    chartOptions.title.text = chartOptions.title.text + " (no plugin effect)";
    $('#chart-noplugin').highcharts(chartOptions);
});

