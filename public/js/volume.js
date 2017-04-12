$(function () {
    $('.del').click(function (e) {
        e = e || event;
        var target = $(e.target);
        var name = target.data('name');
        var tr = $('.item-name-' + name);

        var rr = confirm("你要删除【" + tr.children("td:eq(0)").text() + "】云硬盘吗");

        if (rr === true) {
            $.ajax({
                type: 'DELETE',
                url: "/volume/list?name=" + name
            })
                .done(function (results) {      //done成功时执行
                    if (results.success === 1) {
                        if (tr.length > 0) {
                            tr.remove();
                        }
                    }
                })
        }
        else {
            alert("你取消了删除操作。");
        }
    })
});