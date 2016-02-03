/*!
 * Legend Highlighter for Highcharts.js
 *
 * https://github.com/Sidnet/highcharts-legend-highlighter
 *
 * Authors:
 *   Michał Dziekoński (https://github.com/mdziekon)
 *   Krzysztof Pisera (https://github.com/Krzypis)
 *
 * Released under the MIT license:
 *   https://raw.github.com/Sidnet/highcharts-legend-highlighter/master/LICENSE
 */

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
        case "pie":
        case "funnel":
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
            dimPiePieces: options.dimPiePieces
        };

        if (!isTypeSupported(itemType)) {
            console.error("[highcharts-legend-highlight.js]: Chart type \"" +
                itemType + "\" is not supported");
            return;
        }

        // (Default events) Dim all data series except the currently hovered over one
        addEvent(element, "mouseenter", function () {
            var i;
            var linkedSeries = {};
            if (item.linkedSeries !== undefined) {
                for (i = 0; i < item.linkedSeries.length; ++i) {
                    linkedSeries[item.linkedSeries[i].index] = true;
                }
            }

            for (i = 0; i < series.length; ++i) {
                if (i === itemIndex || linkedSeries[i] !== undefined) {
                    continue;
                }

                if (series[i].visible) {
                    series[i].group.attr("opacity", settings.dimmedOpacity);
                    series[i].markerGroup.attr("opacity", settings.dimmedOpacity);
                }
            }
        });
        addEvent(element, "mouseleave", function () {
            var i;
            var linkedSeries = {};
            if (item.linkedSeries !== undefined) {
                for (i = 0; i < item.linkedSeries.length; ++i) {
                    linkedSeries[item.linkedSeries[i].index] = true;
                }
            }

            for (i = 0; i < series.length; ++i) {
                if (i === itemIndex || linkedSeries[i] !== undefined) {
                    continue;
                }

                if (series[i].visible) {
                    series[i].group.attr("opacity", settings.defaultOpacity);
                    series[i].markerGroup.attr("opacity", settings.defaultOpacity);
                }
            }
        });

        if (itemType === "pie") {
            // Slice out currently hovered over pie piece
            // Dim the other ones if "settings.dimmedOpacity" is true
            addEvent(element, "mouseenter", function () {
                for (var i = 0; i < item.series.data.length; ++i) {
                    if (item.series.data[i].sliced) {
                        item.series.data[i].slice(false, true);
                        item.series.data[i]._restoreSlice = true;
                    }
                    if (settings.dimPiePieces) {
                        item.series.data[i].graphic.attr("opacity", settings.dimmedOpacity);
                    }
                }
                item.slice(true, true);
                if (settings.dimPiePieces) {
                    item.graphic.attr("opacity", settings.defaultOpacity);
                }
            });

            addEvent(element, "mouseleave", function () {
                item.slice(false, true);
                for (var i = 0; i < item.series.data.length; ++i) {
                    if (item.series.data[i]._restoreSlice) {
                        item.series.data[i].slice(true, true);
                        item.series.data[i]._restoreSlice = undefined;
                    }
                    if (settings.dimPiePieces) {
                        item.series.data[i].graphic.attr("opacity", settings.defaultOpacity);
                    }
                }
            });
        }

        if (itemType === "funnel") {
            // Dim all data points in funnel chart except the currently hovered over one
            addEvent(element, "mouseenter", function () {
                for (var i = 0; i < item.series.data.length; ++i) {
                    if (item.series.data[i] !== item) {
                        item.series.data[i].graphic.attr("opacity", settings.dimmedOpacity);
                    }
                }
            });
            addEvent(element, "mouseleave", function () {
                for (var i = 0; i < item.series.data.length; ++i) {
                    if (item.series.data[i] !== item) {
                        item.series.data[i].graphic.attr("opacity", settings.defaultOpacity);
                    }
                }
            });
        }

        item._legendHighlightReady = true;
    });
})(Highcharts);
