$(function () {
    $("#chart-noplugin").hide();
    $(".switch-charts").html($(".switch-charts").attr("data-plugin-visible"));

    $(".switch-charts").on("click", function () {
        $("#chart, #chart-noplugin").toggle();
        $(this).html($(this).html() === $(this).attr("data-plugin-visible") ? $(this).attr("data-plugin-hidden") : $(this).attr("data-plugin-visible"));
        return false;
    });
});