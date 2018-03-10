	//1:获取登录按钮
	//2:绑定点击事件
	$("#btn").click(function(e){
		//阻止事件默认行为 btn==(a)(button) (submit)
		e.preventDefault();

	//3:获取用户输入用户名、密码、验证码
		var u=$("#uname").val();
		var p=$("#upwd").val();
		var z = $("#code").val();
		console.log(u);
		console.log(p);
		console.log(z);
		 //3.1 验证用户名和密码格式,如果用户输入的格式不正确
		  //    禁止提交
		  //3.2 验证码 用户名 字母或数字 3~8
		  //          密码   数字      3~8
		  //3.3:创建正则表达式 用户名 密码 验证码
		var ureg=/^[a-z0-9]{3,8}$/i;
		var preg=/^[0-9]{3,8}$/;
		var zreg=/^[a-z0-9]{4}$/i;
		//3.4:验证
		if(!ureg.test(u)){
			alert("用户名格式不正确");
			return;
		}else if(!preg.test(p)){
			alert("密码必须在3~8位的数字");
			return;
		}else if(!zreg.test(z)){
			alert("验证码不正确，请重新输入");
			return;
		}
	//4:发送ajax请求并且获取返回数据
		$.ajax({
			type:"post",
			url:"data/user/login.php",
			data:{uname:u,upwd:p,yzm:z},
			success:function(data){
				//5:判断
				if(data['code']>0){
				alert("登陆成功");//6:成功跳转
				location.href="000-index.html";
				}else{
					 alert("登陆失败");
				}
			},
			error:function(){ //出错:执行此方法
				alert("网络故障");//7:失败    提示:"用户名或密码有误"
			}
	});
});
//验证码
//1: 获取验证码图片
//	$.ajax
	//setTimeout($(".uyzm").append("<img src = 'data/user/000_yzm.php'/>"),0);
//2: 绑定点击事件
$("#yzm").click(function(){
//3: 修改当前图片src路径为 this.src = "data/user/000_yzm.php"
  this.src = "data/user/000_yzm.php";
});