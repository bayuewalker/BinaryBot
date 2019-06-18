<?php
include "config.php";
global $con;
//USER DATA
$date = date("Y-m-d H:i:s");
$app_id = getConfig('app_id');
function dataUser($username)
{
  global $con;
  $sql = mysqli_query($con,"SELECT * FROM `users` WHERE `login_id`='$username' ");
  $b = mysqli_fetch_array($sql);
  return $b;
}

function getConfig($item)
{
  global $con;
  $sql = mysqli_query($con,"SELECT description FROM `config` WHERE `item`='$item' ");
  $b = mysqli_fetch_array($sql);
  return $b['description'];
}

function insertTransactions($order_time,$reference_id,$payout,$contract,$buy_price,$sell_price,$profit_loss)
{
  global $con;
  $sql = "INSERT INTO transactions(`order_time`, `reference_id`, `payout`, `contract`, `buy_price`, `sell_price`, `profit_loss`) VALUES('$order_time','$reference_id','$payout','$contract','$buy_price','$sell_price','$profit_loss')";
  $send = mysqli_query($con,$sql) or die(mysqli_connect_error());

}

function sumProfitLoss($status)
{
  global $con;
  $sql = "SELECT SUM(profit_loss) AS total FROM transactions WHERE status='$status'";
  $result = mysqli_query($con,$sql);
  $x = mysqli_fetch_assoc($result);
  return $x['total'];
}

function tradeCount()
{
  global $con;
  $sql = "SELECT * FROM transactions ";
  $result = mysqli_query($con,$sql);
  $x = mysqli_num_rows($result);
  return $x;
}
