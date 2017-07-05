$.ajax({
    type: "get",
    url: url + "api/getcategorytitle",
    dataType: "json",
    success: function (data) {
        var html = template("commodity_data", data);
        $("#commodity_list #accordion").html(html);
        $("#commodity_list #accordion .panel-default .panel-title a").click(function () {
            var titleid = $(this).data("titleid");
            var $row = $(this).parent().parent().siblings().find(".panel-body .row");
            if ($row.children().length == 0) {
                $.ajax({
                    url: url + "api/getcategory?titleid=" + titleid,
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        var html = template("columns", data);
                        $row.html(html);
                    }
                });
            }
        });
    }
})
