/**
 * 通用JS库
 * buzhidao
 */

/**
 * 显示/隐藏alert-panel
 * @param  string status alert元素状态 success:成功 error:错误
 * @param  string html   提示信息或者要显示的html内容
 */
var alertPanelShow = function(status, html) {
    var alertPanelObj = $("#alert-panel");
    var alertElementObj = $("#alert-element");

    var alerthtml = alertElementObj.find("div#alert-"+status).html();
    alerthtml = alerthtml.replace('{html}', html);
    alertPanelObj.html(alerthtml+alertPanelObj.html());

    //5秒后淡出
    setTimeout(function() {
        alertPanelObj.find(".alert:last").remove();
    }, 3000);
};

//AJAX回调函数
var ajaxCallback = function(data) {
    var status = data.error ? 'error' : 'success';
    alertPanelShow(status, data.msg);
    if (!data.error) {
        var location_href = location.href;
        if ("location" in data.data) {
            location_href = data.data.location;
        }
        if (location_href == location.href) {
            setTimeout(function (){
                location.reload();
            }, 1000);
        } else {
            setTimeout(function (){
                location.href = location_href;
            }, 1000);
        }
    }
};

$(function (){
    //AJAX-form提交
    $("form.ajaxform").submit(function() {
        var url = $(this).attr("action");
        var method = $(this).attr("method");
        var d = $(this).serialize();

        if (method != "post") {
            $.post(url, d, ajaxCallback, 'json');
        } else {
            $.get(url, d, ajaxCallback, 'json');
        }

        return false;
    });
})
