<?php
require_once("../init.php");
@$checked=$_REQUEST["checked"];
session_start();
@$uid=$_SESSION["uid"];
if($checked!=null){
  $sql="update sd_shoppingcart_item set is_checked=$checked where user_id=$uid";
  mysqli_query($conn,$sql);
}