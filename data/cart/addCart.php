<?php
   require_once("../init.php");
   @$lid=$_REQUEST["lid"];
   @$count=$_REQUEST["count"];
    session_start();
    @$uid=$_SESSION["uid"];
   if($lid && $count && $uid){
   $sql="select * from sd_shoppingcart_item where product_id=$lid and user_id=$uid";
   $result=mysqli_query($conn,$sql);
       if(!mysqli_fetch_row($result)){
           $sql="insert into sd_shoppingcart_item values(null,$lid,$uid,$count,0)";
       }else{
        $sql="update sd_shoppingcart_item set count=count+$count where product_id=$lid and user_id=$uid";
       }
    $result=mysqli_query($conn,$sql);
   }

