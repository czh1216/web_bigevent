$(function() {
    // 获取 表格数据
    const initArtCateList = () => {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: (res) => {
                if(res.status !== 0) return layer.msg('获取失败')
                // 调用 template
                const htmlStr = template("tpl-table", res);
                $("tbody").empty().html(htmlStr);
            },
        });
    };

    // 按钮的点击事件
    let indexAdd = null
    $("#btnAddCate").click(() => {
        indexAdd=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });
    
    // 通过代理监听 submit 事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("添加文章失败！");
                layer.msg("添加文章成功！");
                initArtCateList();
                layer.close(indexAdd);
            },
        });
    });

    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        // const id = $(this).attr("data-id");
        // // 发起请求获取对应分类的数据
        // $.ajax({
        //     method: "GET",
        //     url: "/my/article/cates/" + id,
        //     success: function (res) {
        //         form.val("form-edit", res.data);
        //     },
        // });
    });

   

    initArtCateList();
})