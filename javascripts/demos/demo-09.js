$(function () {
    var chartOptions = {
        legend: {
            highlightSeries: {
                enabled: true,
                 dimmedOpacity: 0.1
            }
        },
        chart: {
            type: 'area'
        },
        title: {
            text: 'Area chart with more data series and dimmedOpacity = 0.1'
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
        }, {
            name: 'Marry',
            data: [-1, 4, 0, -2, 5]
        }, {
            name: 'Tom',
            data: [3, -3, 1, -2, 5]
        }, {
            name: 'Hank',
            data: [4, 4, 2, -2, 5]
        }]
    };

    $('#chart').highcharts(chartOptions);

    chartOptions.legend.highlightSeries.enabled = false;
    chartOptions.title.text = chartOptions.title.text + " (no plugin effect)";
    $('#chart-noplugin').highcharts(chartOptions);
});

