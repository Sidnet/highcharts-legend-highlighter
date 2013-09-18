/* global Highcharts */

(function (Highcharts) {
    "use strict";

    var addEvent = Highcharts.addEvent;

    var isTypeSupported = function (chartType) {
        switch (chartType) {
        case "line":
        case "spline":
        case "area":
        case "areaspline":
        case "arearange":
        case "areasplinerange":
        case "column":
        case "columnrange":
        case "bar":
        case "scatter":
        case "bubble":
        case "boxplot":
        case "errorbar":
        case "waterfall":
        case "gauge":
            return true;
        default:
            return false;
        }
    };

    var getItemType = function (item, series) {
        if (item.series) {
            return item.series.type;
        } else {
            return series[item.index].type;
        }
    };
    var getItemIndex = function (item, type) {
        if (item.index !== undefined) {
            return item.index;
        } else {
            return item.series.index;
        }
    };

    // Inject "onmouseenter" & "onmouseleave" event listeners into "renderItem"
    // function (used in Highcharts.Legend.prototype to render single legend label)
    // proceed - default "renderItem" function
    // item - series or point assigned to currently rendered legend label
    Highcharts.wrap(Highcharts.Legend.prototype, "renderItem", function (proceed, item) {
        // Call the default function
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        if ((!this.chart.options.legend.highlightSeries) ||
           (this.chart.options.legend.highlightSeries.enabled !== true) ||
           (item._legendHighlightReady !== undefined))
        {
            return;
        }

        var series = this.chart.series;
        var element = item.legendGroup.element;
        var itemType = getItemType(item, series);
        var itemIndex = getItemIndex(item, itemType);
        var options = this.chart.options.legend.highlightSeries;
        var settings = {
            defaultOpacity: options.defaultOpacity ? options.defaultOpacity : 1,
            dimmedOpacity: options.dimmedOpacity ? options.dimmedOpacity : 0.25,
        };

        if (!isTypeSupported(itemType)) {
            console.error("[highcharts-legend-highlight.js]: Chart type \"" +
                itemType + "\" is not supported");
            return;
        }

        // (Default events) Dim all data series except the currently hovered over one
        addEvent(element, "mouseenter", function () {
            for (var i = 0; i < series.length; ++i) {
                if (i === itemIndex) {
                    continue;
                }
                series[i].group.attr("opacity", settings.dimmedOpacity);
                series[i].markerGroup.attr("opacity", settings.dimmedOpacity);
            }
        });
        addEvent(element, "mouseleave", function () {
            for (var i = 0; i < series.length; ++i) {
                if (i === itemIndex) {
                    continue;
                }
                series[i].group.attr("opacity", settings.defaultOpacity);
                series[i].markerGroup.attr("opacity", settings.defaultOpacity);
            }
        });

        item._legendHighlightReady = true;
    });
})(Highcharts);
