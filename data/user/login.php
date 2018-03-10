<?php
header("Content-Type:application/json");
session_start();
require_once("../init.php");
//获取用户数据   uname upwd
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
//获取用户输入的验证码
@$uyzm = $_REQUEST["yzm"];
//获取系统生成验证码内容
if($uyzm != $_SESSION["captcha"]){
  echo '{"code":-2,"msg":"验证码不正确，请检查"}';
  exit;//停止程序执行
}
$sql="SELECT uid FROM sd_user WHERE uname='$uname' AND upwd=md5('$upwd')";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row==null){
	echo '{"code":-1,"msg":"用户名或密码错误"}';
}else{
    $_SESSION["uid"]=$row["uid"];
	echo '{"code":1,"msg":"登陆成功"}';
}