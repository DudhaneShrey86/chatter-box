<?php
  require 'conn.php';
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Chatter Box</title>
    <?php include("./links.php"); ?>
  </head>
  <body onclick="checkclick(event)">
    <div id="container">
      <div id="loadercontainer">
        <div id="loaderdiv">
          <div id="loadercircle">

          </div>
          <div id="loadertext">
            Loading
          </div>
        </div>
      </div>
      <?php
        if(!isset($_COOKIE['user']) || empty($_COOKIE['user'])){
          $user = "";
        }
        else{
          $user = $_COOKIE['user'];
        }
      ?>
      <div id="logindiv" class="appdivs">
        <form id="loginformdiv">
          <h2>Register Your Username</h2>
          <input type="text" id="usernameregister" placeholder="Eg: dudhaneshrey">
          <small>This will be your ID which will be visible to other users</small>
          <button type="submit" class="buts" onclick="validateregisteration(event)">Register</button>
        </form>
        <input type="hidden" id="user" value="<?php echo $user ?>">
      </div>
      <div id="maindiv" class="appdivs pushtoright">
        <header>
          <h1>Chatter Box</h1>
          <div class="options" onclick="opensettings()">
            <span class="optionspan"></span>
            <span class="optionspan"></span>
            <span class="optionspan"></span>
          </div>
        </header>
        <div id="maincontent">

        </div>
      </div>
      <div id="chatdiv" class="appdivs pushtoright">
        <header class="chatheader">
          <img src="./images/arrow.png" alt="" onclick="backtomainfromchat()">
          <div>
            <h1>dudhaneshrey86</h1>
            <p class="checkonline">online</p>
          </div>
          <div class="options" id="chatsettings" onclick="openchatsettings()">
            <span class="optionspan"></span>
            <span class="optionspan"></span>
            <span class="optionspan"></span>
          </div>
          <div id="chatoptions">
            <p>Delete selected messages</p>
            <p onclick="clearchat()">Clear Chat</p>
          </div>
        </header>
        <div id="chatcontentcontainer">
          <div id="chatcontent">

          </div>
        </div>
        <div id="chatmessagediv">
          <img src="./images/meme.png" alt="meme button" id="browsememeicon" onclick="browsememes()">
          <textarea id="message" placeholder="Enter a message"></textarea>
          <img src="./images/apex.png" alt="send button" id="sendmessageicon" onclick="sendmessage()">
        </div>
      </div>
      <div id="settingsdiv" class="appdivs pushtoright">
        <header class="settingsheader">
          <img src="./images/arrow.png" alt="" onclick="backtomainfromsettings()">
          <h1 class="settingsh1">Settings</h1>
        </header>
        <div class="settingscontent">
          <h2 id="showusername">
            <span>Username: </span>
            <span id="shownusername"><?php echo $_COOKIE['user']?></span>
          </h2>
          <div class="settingsoptioncontainer">
            <div class="settingsoptioncard">
              <p><button type="button" class="buttons" onclick="logoutuser()">Logout (Delete Account)</button></p>
              <p>
                Theme:
                <label class="switch">
                  <?php
                    if(isset($_COOKIE['mode']) && !empty($_COOKIE['mode'])){
                      if(@$_COOKIE['mode'] == 'dark'){
                        ?><input type="checkbox" id="themecheckbox" checked><?php
                      }
                      else{
                        ?><input type="checkbox" id="themecheckbox"><?php
                      }
                    }
                    else{
                      ?><input type="checkbox" id="themecheckbox"><?php
                    }
                  ?>
                  <span class="slider"></span>
                </label>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
