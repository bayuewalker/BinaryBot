<?php
session_start();
include "core/data.php";

if($_POST)
{
  $app_id = $_POST['app_id'];
  $login_id = $_POST['loginid'];
  $order_time = $_POST['order_time'];
  $reference_id = $_POST['reference_id'];
  $contract= $_POST['contract'];
  $shortcode= $_POST['shortcode'];
  $longcode= $_POST['longcode'];
  $payout= $_POST['payout'];
  $buy_price= $_POST['buy_price'];
  $sell_price= $_POST['sell_price'];
  $profit_loss= $_POST['profit_loss'];
  $status= $_POST['status'];
  $indicator = $_POST['indicator'];

  if($status != "won" && $buy_price > 20){
    $sql = "INSERT INTO transactions (`app_id`,`order_time`, `reference_id`, `login_id`,`payout`, `contract`, `short_code`, `long_code`, `buy_price`, `sell_price`, `profit_loss`, `status`, `indicator`)
    VALUES('$app_id','$order_time','$reference_id','$login_id','$payout','$contract','$shortcode','$longcode','$buy_price','$sell_price','$profit_loss','hidden','$indicator')";
    $proses = mysqli_query($con,$sql) or die(mysqli_connect_error());
  }else{
    $sql = "INSERT INTO transactions (`app_id`,`order_time`, `reference_id`, `login_id`,`payout`, `contract`, `short_code`, `long_code`, `buy_price`, `sell_price`, `profit_loss`, `status`, `indicator`)
    VALUES('$app_id','$order_time','$reference_id','$login_id','$payout','$contract','$shortcode','$longcode','$buy_price','$sell_price','$profit_loss','$status','$indicator')";
    $proses = mysqli_query($con,$sql) or die(mysqli_connect_error());

  }
}

?>
