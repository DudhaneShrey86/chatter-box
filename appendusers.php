<?php
  require 'conn.php';
  if(isset($_GET['user']) && !empty($_GET['user'])){
    $user = $_GET['user'];
    $res = '[';
    $query = "SELECT * FROM `users` WHERE `username` != '$user'";
    $qr = mysqli_query($mysqli, $query);
    while($row = mysqli_fetch_assoc($qr)){
      $res .= '{"id": "'.$row['id'].'", "username": "'.$row['username'].'", "online": "'.$row['online'].'"}';
    }
    $res .= ']';
    echo $res;
  }
?>
