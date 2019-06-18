<?
include "core/config.php";
?>
<?
if(isset($_COOKIE["usNick"]) && isset($_COOKIE["usPass"]))
{
$_COOKIE["usNick"] = "";
setcookie(usNick,"x",time() - 86400);
$_COOKIE["usPass"] = "";
setcookie(usPass,"x",time() - 86400);
}

session_unset();
// destroy the session
session_destroy();
header('Location: /');
exit();
?>
