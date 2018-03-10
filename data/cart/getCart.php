<?php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid){
  $sql="select iid,lid,title,spec,price,count,is_checked,(select sm from sd_laptop_pic where laptop_id=lid limit 1) as sm from sd_shoppingcart_item inner join sd_laptop on product_id=lid where user_id=$uid";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,1);
  echo json_encode($rows);
}