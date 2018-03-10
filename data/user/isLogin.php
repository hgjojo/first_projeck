<?php
//data/user/isLogin.php
//data/init.php
header("Content-Type:application/json");
require("../init.php");
SESSION_START();
@$uid=$_SESSION["uid"];
if($uid){
	$sql="SELECT uname FROM sd_user WHERE uid=$uid";
	$uname=mysqli_fetch_row(mysqli_query($conn,$sql))[0];
	echo json_encode(["ok"=>1,"uname"=>$uname]);
}else{
	 echo json_encode(["ok"=>0]);
}

