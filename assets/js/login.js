$(function(){

//点击切换 登录注册
//点击去注册账号让 登录框隐藏，注册框显示
$('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
});
//点击去登录让 注册框隐藏，登录框显示
$('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
});

//先引入form来自layui
const form = layui.form;
form.verify({
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd:(value) => {
        const pwd = $('.reg-box [name=password]').val();
        if(pwd !== value) return '两次密码不一致'
    }
});
// const baseUrl = "http://www.liulongbin.top:3007"
// 监听注册表单，发送注册请求
$("#form_reg").submit((e) => {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data: {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        },
        success: (res) => {
            // console.log(res);
            if(res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功！')
             // 注册成功后跳转到登录界面
            $('#link_login').click()
        }
    })
})
// 监听登录表单，发送登录请求
$("#form_login").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg("登陆失败!");
            layer.msg("登录成功！");
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem("token", res.token);
            // 跳转到主页
            location.href = "/index.html";
        },
    });
});
});