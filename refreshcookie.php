<?php
  require 'conn.php';
  if(isset($_GET['username']) && !empty($_GET['username'])){
    $username = mysqli_real_escape_string($mysqli, $_GET['username']);
    setcookie('user', $username, time() + 365*24*60*60);
  }
  header('Location: ./index.php');
?>
