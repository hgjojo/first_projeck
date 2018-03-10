/**
 * Created by Administrator on 2017/12/26.
 */
// 1 获取注册按钮
// 2 绑定点击事件
    $("#btn_register").click(function(e){
        //3 阻止事件默认行为
        e.preventDefault();
        //获取用户名，密码，手机号
        var uname=$("#zc_uname").val();
        var upwd=$("#zc_upwd").val();
        var phone=$("#zc_phone").val();
        //console.log(uname);
        //console.log(upwd);
        //console.log(phone);

        //4 验证用户名和密码格式,如果用户输入的格式不正确 禁止提交
        // 6 创建正则表达式 用户名 密码 手机号
        var ureg=/^[a-z0-9]{3,8}$/i;  //5 用户名 字母或数字 3~8
        var preg=/^[0-9]{3,8}$/;      //    密码   数字      3~8
        var phonereg=/^[0-9]{11}$/;     //    手机号码为数字11位
        //验证
        if(!ureg.test(uname)){
            alert("用户名格式不正确");
            return;
        }else if(!preg.test(upwd)){
            alert("密码必须在3~8位的数字");
            return;
        }else if(!phonereg.test(phone)){
            alert("手机号码数字必须为11位");
            return;
        }
        //发送ajax请求
        $.ajax({
            type:"post",
            url:"data/user/register.php",
            data:{uname:uname,upwd:upwd,phone:phone},
            success:function(data){
                //5:判断
                console.log(data.code);
                if(data['code']>0){
                    alert("注册成功");//6:成功跳转 000-login.html
                    location.href="000-login.html";
                }else{
                    alert("注册失败");
                }
            },
            error:function(){ //出错:执行此方法
                alert("网络故障");//7:失败    提示:"用户名或密码有误"
            }
        });
    });