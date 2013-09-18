$(function () {
    
    var chartOptions = {
        chart: {
            type: 'funnel',
            marginRight: 100
        },
        title: {
            text: 'Sales funnel',
            x: -50
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    color: 'black',
                    softConnector: true
                },
                neckWidth: '30%',
                neckHeight: '25%'
                
                //-- Other available options
                // height: pixels or percent
                // width: pixels or percent
            }
        },
        legend: {
            highlightSeries: {
                enabled: true
            }
        },
        series: [{
            name: 'Unique users',
            data: [
                ['Website visits',   15654],
                ['Downloads',       4064],
                ['Requested price list', 1987],
                ['Invoice sent',    976],
                ['Finalized',    846]
            ],
            showInLegend: true
        }]
    };

    $('#chart').highcharts(chartOptions);

    chartOptions.legend.highlightSeries.enabled = false;
    chartOptions.title.text = chartOptions.title.text + " (no plugin effect)";
    $('#chart-noplugin').highcharts(chartOptions);
});