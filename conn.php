<?php
session_start();
ob_start();
$mysqli = mysqli_connect('localhost', 'root', '');
//$mysqli = mysqli_connect('localhost', 'id12623272_root', '123456');
if(mysqli_select_db($mysqli, 'chats')){

}
// if(mysqli_select_db($mysqli, 'id12623272_chats')){
//
// }
else{
  die(mysqli_error($mysqli));
}
?>
