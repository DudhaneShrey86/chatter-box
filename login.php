<?php
  require 'conn.php';
  if(isset($_GET['username']) && !empty($_GET['username'])){
    setcookie('user', $_GET['username'], time() + 365*24*60*60);
  }
  header('Location: ./index.php')
?>
