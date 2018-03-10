<?php
//data/cart/updateCart.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
if($iid){
  if($count>0){
    $sql="update sd_shoppingcart_item set count=$count where iid=$iid";
    mysqli_query($conn,$sql);
  }else{
    $sql="delete from sd_shoppingcart_item where iid=$iid";
    mysqli_query($conn,$sql);
  }
}