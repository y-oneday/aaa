var searchId = getQueryStringArge();
$.ajax({
    type: "get",
    url: url + "api/getproduct?productid=" + searchId.productid,
    dataType: "json",
    success: function (data) {
        var html = template("breadcrumb_data", data);
        $("#commodityDetails").html(html);
        var evaluation = template("evaluation_data", data);
        $("#commodityDetails").html(html);
        $('#commodity_title .breadcrumb li:nth-child(3)').html(data.result[0].productName);
        $.ajax({
            type: "get",
            url: url + "api/getcategorybyid?categoryid=" + data.result[0].categoryId,
            datatype: "json",
            success: function (data) {
                $('#commodity_title .breadcrumb li:nth-child(2)').html("<a href='#'>" + data.result[0].category + "</a>");
                $('#commodity_title .breadcrumb li:nth-child(2) a').attr("href", "commodityList.html?categoryid=" + data.result[0].categoryId);
            }
        })
    }
})
$.ajax({
    type: "get",
    url: url + "api/getproductcom?productid=" + searchId.productid,
    dataType: "json",
    success: function (data) {
        var html = template("evaluation_data", data);
        $("#commodityDetails #messages").html(html);

    }
})

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