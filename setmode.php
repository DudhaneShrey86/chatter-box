<?php
  require 'conn.php';
  if(isset($_GET['mode']) && !empty($_GET['mode'])){
    $mode = $_GET['mode'];
    setcookie('mode', $mode, time() + 365*24*60*60);
  }
?>
