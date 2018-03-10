<?php
    header("Content-Type:application/json");
    require("../init.php");
    @$uname=$_REQUEST["uname"];
    if($uname==null || $uname==""){
        die ("用户名不能为空");
    }
    @$upwd=$_REQUEST["upwd"];
    if($upwd==null || $upwd==""){
            die ("密码不能为空");
        }
     @$phone=$_REQUEST["phone"];
        if($phone==null || $phone==""){
                die ("手机号码不能为空");
                }
    $sql="insert into sd_user(uname,upwd,phone) values('$uname',md5('$upwd'),'$phone')";
    $result=mysqli_query($conn,$sql);
   /*$row=mysqli_fetch_all($result,1);*/
       if($result==true){
       	echo '{"code":1,"msg":"注册成功"}';
       }else{
       	echo '{"code":-1,"msg":"注册失败"}';
       }

?>