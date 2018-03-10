<?php
//data/index/getFloors.php
//data/init.php
header("Content-Type:application/json");
require_once("../init.php");
$output=[
  //recommend=>[{...},{...},...],
  //phone=>[{...},{...},...],
  //book=>[{...},{...},...],
  //tv=>[{...},{...},...],
  //earphone=>[{...},{...},...],
  //sales=>[{...},{...},...],
];
//加载第1楼recommend的数据
$sql="select * from sd_index_product where recommend!=0 order by recommend";
$result=mysqli_query($conn,$sql);
$output["recommend"]=mysqli_fetch_all($result,1);
//var_dump($output);
//加载第2楼phone
$sql="select * from sd_index_product where phone!=0 order by phone";
$result=mysqli_query($conn,$sql);
$output["phone"]=mysqli_fetch_all($result,1);
//加载第3楼book的数据
$sql="select * from sd_index_product where book!=0 order by book";
$result=mysqli_query($conn,$sql);
$output["book"]=mysqli_fetch_all($result,1);
//加载第4楼tv的数据
$sql="select * from sd_index_product where tv!=0 order by tv";
$result=mysqli_query($conn,$sql);
$output["tv"]=mysqli_fetch_all($result,1);
//加载第5楼earphone的数据
$sql="select * from sd_index_product where earphone!=0 order by earphone";
$result=mysqli_query($conn,$sql);
$output["earphone"]=mysqli_fetch_all($result,1);
//加载第6楼sales的数据
$sql="select * from sd_index_product where sales!=0 order by sales";
$result=mysqli_query($conn,$sql);
$output["sales"]=mysqli_fetch_all($result,1);
echo json_encode($output);