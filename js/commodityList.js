var searchId = getQueryStringArge();
$.ajax({
    url: url + "api/getcategorybyid?categoryid=" + searchId.categoryid,
    type: "get",
    dataType: "json",
    success: function (data) {
        $("#commodity_title .breadcrumb li:nth-child(3)").html(data.result[0].category);
    }
});

var pageid = parseInt(searchId.pageid) || 1;
$.ajax({
    url: url + 'api/getproductlist?categoryid=' + searchId.categoryid + '&pageid=' + pageid,
    type: "get",
    dataType: "json",
    success: function (data) {
        var html = template("commodity_data", data);
        $("#commodity_list").html(html);
        var pages = Math.ceil(data.totalCount / data.pagesize);
        var prev_href = "commodityList.html?categoryid=" + searchId.categoryid + "&pageid=" + (pageid - 1 > 1 ? pageid - 1 : 1);
        var next_href = "commodityList.html?categoryid=" + searchId.categoryid + "&pageid=" + (pageid + 1 < pages ? (pageid + 1) : pages);
        // if(pageid == 1){
        //      $("#pagination .next").attr("href", next_href);
        //     return false;
        // }if(pageid == pages){
        //     $("#pagination .prev").attr("href", prev_href);
        //     return false;
        // }
        if (pageid == 1) {
            $("#pagination .prev").attr("disabled");
        } else {
            $("#pagination .prev").attr("href", prev_href);
        }
        if (pageid == pages) {
            $("#pagination .next").attr("disabled");
        } else {
            $("#pagination .next").attr("href", next_href);
        }
        var str = "";
        for (var i = 1; i <= pages; i++) {
            str += "<li><a href=commodityList.html?categoryid=" + searchId.categoryid + "&pageid=" + i + ">第" + i + "页</a></li>";
            $("#pagination .dropdown-menu").html(str);
        }
        $("#pagination .dropdown-toggle").html("第" + pageid + "页");
    }
});
function getQueryStringArge() {
    var qs = location.search.length > 1 ? location.search.substr(1) : "";
    var items = qs.length > 1 ? qs.split("&") : [];
    var obj = {}, key, value, item;
    for (var i = 0; i < items.length; i++) {
        item = items[i].split("=");
        key = item[0];
        value = item[1];
        obj[key] = value;
    }
    
    return obj;
}