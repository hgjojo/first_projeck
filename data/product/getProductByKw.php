<?php
header("Content-Type:Application/json");
require_once("../init.php");
@$kw=$_REQUEST["kw"];
$sql="select *,(select md from sd_laptop_pic where laptop_id=lid limit 1) as md from sd_laptop";
if($kw){
    $kws=explode(" ",$kw);
    for($i=0;$i<count($kws);$i++){
        $kws[$i]=" title like '%$kws[$i]%'";
    }
//    var_dump($kws);
$where=" where ".implode(" and ",$kws);
$sql.=$where;
}
$pageSize=9;
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$count=count($rows);
@$pno=$_REQUEST["pno"];
if(!$pno) $pno=1;
$sql.=" limit ".($pno-1)*$pageSize.",$pageSize";
$output=[
  "pageSize"=>$pageSize,
  "count"=>$count,
  "pageCount"=>ceil($count/$pageSize),
  "pno"=>$pno,
  "data"=>
    mysqli_fetch_All(mysqli_query($conn,$sql),1)
];
echo json_encode($output);