<?php
//1 小图片(sm),中图片(md),大图片(lg)
//2 拿到title(物品详情)、price(价格)、color(颜色选择(图片))、容量(spec)、描述(miaosu)
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[
    //product_info:{title,price,color,spec,miaosu},
    //pic_list:{sm,md,lg}，
];
if($lid){
    $sql="select * from sd_laptop where lid=$lid";
    $result=mysqli_query($conn,$sql);
    $output["product_info"]=mysqli_fetch_all($result,1)[0];
    $sql="select * from sd_laptop_pic where laptop_id=$lid";
    $result=mysqli_query($conn,$sql);
    $output["pic_list"]=mysqli_fetch_all($result,1);
    echo json_encode($output);
}