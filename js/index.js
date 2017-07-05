"use strict";
$.ajax({
    url: "http://182.254.146.100:3000/api/getindexmenu",
    type: "get",
    dataType: "json",
    success: function (data) {
        var html = template("nav_list", data);
        $("#nav .row").html(html);
        $("#nav .row>div:nth-last-child(-n+4)").hide();
        $("#nav .row>div:nth-last-child(5)").click(function () {
            $("#nav .row>div:nth-last-child(-n+4)").toggle(200);
        });
    },
    error: function () {

    }
});
$.ajax({
    url: "http://182.254.146.100:3000/api/getmoneyctrl",
    type: "get",
    dataType: "json",
    success: function (data) {
        var html = template("discount_price_list", data);
        $("#commodity_list .list_container").html(html);
    },
    error: function (e) {

    }
});