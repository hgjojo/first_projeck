<?php
require_once("../init.php");
@$checked=$_REQUEST["checked"];
@$iid=$_REQUEST["iid"];
if($iid!=null&&$checked!=null){
  $sql="update sd_shoppingcart_item set is_checked=$checked where iid=$iid";
  mysqli_query($conn,$sql);
}