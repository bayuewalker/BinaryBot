<?php
date_default_timezone_set("Asia/Bangkok");
$servername = "localhost";
$username = "fastbot_user";
$password = "Ub5zCX9-ud";
$database = "binaryfastbot_db";

$con = mysqli_connect($servername, $username, $password,$database);

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


?>
