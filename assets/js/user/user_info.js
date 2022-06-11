$(function() {
    const form = layui.form
    form.verify({
        nickname: (value) =>{
            if(value.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！"
        }
    })
    // 获取用户的基本信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: (res) => {
                if(res.status !== 0) return layui.msg("获取用户信息失败！")
                // console.log(res);
                form.val("formUserInfo", res.data)
            }
        })
    }
    //重置表单
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserInfo()
    });

    //更新用户信息
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.mag('更新用户信息失败！')
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo();
            }
        })
    })

    initUserInfo()
})