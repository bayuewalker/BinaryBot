<?php
session_start();
include "core/data.php";

$sql = "DELETE FROM transactions";
$proces = mysqli_query($con,$sql) or die(mysqli_connect_error());

?>
