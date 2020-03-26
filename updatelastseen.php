<?php
  include('links.php');
  require 'conn.php';
  if(isset($_GET['user']) && !empty($_GET['user'])){
    $user = $_GET['user'];
    echo '<script type="text/javascript">
      $(document).ready(function(){
        var ti = firebase.firestore.Timestamp.now();
        var user = "'.$user.'";
        db.collection("users").where("username", "==", user).get().then((snapshot)=>{
          snapshot.forEach((doc)=>{
            db.collection("users").doc(doc.id).set({
              lastseen: ti,
              online: false
            }, { merge: true });
          });
        });
      });
      console.log("done");
    </script>';
  }
?>
