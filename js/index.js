function setchatheight(){
  var chatheight = $('.chatheader').height() + $('#chatmessagediv').height();
  $('#chatcontentcontainer').height($(window).height() - chatheight - 8);
}
function loader(t){
  $('#loadercontainer').show().find('#loadertext').text(t);
}
function hideloader(){
  $('#loadercontainer').hide();
}

if(window.XMLHttpRequest){
  var xhttp = new XMLHttpRequest();
}
else{
  var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

var userto;
var chatid = "";
var oldmsgdate = "";
var editmode = 0;
var editdocid = "";
var listening = 0;
var selectedmessagesarray = [];
var timeoutID;
var stoplistening;
//////////////////////logging in user/////////////////////
function validateregisteration(event){
  event.preventDefault();
  var v = $('#usernameregister').val();
  if(v != ""){
    loader("Checking availability of username...");
    const userref = db.collection('users');
    userref.where('username', '==', v).get().then((snapshot) => {
      hideloader();
      console.log(snapshot.empty);
      if(!snapshot.empty){
        Swal.fire({
          text: 'Username already exists!',
          icon: 'info',
          confirmButtonText: 'Ok'
        });
      }
      else{
        userref.add({
          lastseen: firebase.firestore.Timestamp.now(),
          online: true,
          username: v
        }).then(function(){
          window.location.replace("./login.php?username="+v);
        }).catch(function(){
          Swal.fire({
            title: 'Error',
            text: 'Some error occured, please try again later',
            confirmButtonText: 'Ok'
          });
        });
        loader("Registeration Successful!");
      }
    });
  }
  else{
    Swal.fire({
      text: 'Please enter a username first',
      icon: 'warning',
      confirmButtonText: 'Got it!'
    });
  }
}
//////////////////////logging user out/////////////////////
function logout(){
  window.location.replace("./logout.php");
}

function appendusers(){
  db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      if(doc.data().username != user.value){
        appendtheuser(doc);
      }
    })
  });
}

function appendtheuser(doc){
  var str = '<div class="usercard" id="'+doc.data().username+'" onclick="chatwithuser($(this))"><p class="chatuser"><span class="userlogo">'+doc.data().username.slice(0, 1).toUpperCase()+'</span><span class="userusername">'+doc.data().username+'</span>';
  if(doc.data().online == true){
    str += '<span class="useronline active"><span></span></span></p></div>';
  }
  else{
    str += '<span class="useronline"><span></span></span></p></div>';
  }
  $('#maincontent').append(str);
}

function chatwithuser(t){
  oldmsgdate = "";
  $('#chatcontent').empty();
  userto = t.attr('id');
  $('#maindiv').removeClass('bring').addClass('pushtoleft');
  $('#chatdiv').addClass('bring').removeClass('pushtoright');
  loader("Loading Chats");
  $('.chatheader h1').text(userto);
  var str1 = user.value + ', ' + userto;
  var str2 = userto + ', ' + user.value;
  const chatidref = db.collection('chat_ids');
  chatidref.where('participants', 'in', [str1, str2]).get().then((snapshot) => {
    if(snapshot.empty){
      createrandno(chatidref, str1);
      hideloader();
    }
    else{
      snapshot.forEach((doc)=>{
        chatid = doc.id;
      });
      hideloader();
      //getchats(chatid);
    }
    listenmessages(chatid);
  });
}
async function createrandno(ref, str1){
  var res = "";
  var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var slen = s.length;
  var i = 0;
  for(i=0;i<5;i++){
    res += s.charAt(Math.floor(Math.random()*slen));
  }
  ref.doc(res).get().then((doc)=>{
    if(doc.exists){
      createrandno(ref);
    }
    else{
      ref.doc(res).set({
        participants: str1
      });
      chatid = res;
      //getchats(chatid);
    }
  });
}

function getchats(i){
  db.collection('chats').where('chatID', '==', i).orderBy('time').get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
      appendchats(doc);
    })
  });
  hideloader();
}

function appendchats(doc){
  var str = "";
  var c = "";
  var timestr = "";
  if(doc.data().from == user.value){
    c = "mymsg";
  }
  else{
    c = "othersmsg";
  }
  var tstamp = doc.data().time;
  var msgdate = new Date(tstamp.toDate()).toLocaleDateString();
  var msgtime = new Date(tstamp.toDate()).toLocaleTimeString();
  if(oldmsgdate != msgdate){
    oldmsgdate = msgdate;
    var datestr = '<div class="datedivs"><p>'+oldmsgdate+'</p></div>';
    $('#chatcontent').append(datestr);
  }
  str = '<div class="'+c+' messagedivs" id="'+doc.id+'" onclick="opencontextmenu($(this))"><pre><span class="messagetext">'+doc.data().message+'</span><span class="messagetime">'+msgtime+'</span></pre></div>';
  $('#chatcontent').append(str);
}

function backtomainfromchat(){
  $('#chatdiv').removeClass('bring').addClass('pushtoright');
  $('#maindiv').addClass('bring').removeClass('pushtoleft');
  /////////////will have to change it/////////////////
  $('#chatcontent').empty();
  stoplistening();
}

function backtomainfromsettings(){
  $('#settingsdiv').removeClass('bring').addClass('pushtoright');
  $('#maindiv').addClass('bring').removeClass('pushtoleft');
  /////////////will have to change it/////////////////
}

function sendmessage(){
  var v = $('#message').val();
  var t = $('.chatheader h1').text();
  var ti = firebase.firestore.Timestamp.now();
  if(v != ''){
    if(editmode == 1){
      editmode = 0;
      db.collection('chats').doc(editdocid).update({
        message: v
      });
    }
    else{
      db.collection('chats').add({
        chatID: chatid,
        from: user.value,
        message: v,
        time: ti
      });
    }
  }
  $('#message').val('');
}
function browsememes(){

}

function opencontextmenu(t){
  var pos = t.position();
  var st = "";
  const swalmixin = Swal.mixin({
    background: '#886dcf',
    confirmButtonText: 'Delete',
    buttonsStyling: false,
    padding: 0,
    focusConfirm: false,
    reverseButtons: true
  });
  if(t.hasClass('mymsg')){
    swalmixin.fire({
      showCancelButton: true,
      cancelButtonText: 'Edit',
    }).then((result)=>{
      if(result.value){
        deletemessage(t);
      }
      else if(result.dismiss === Swal.DismissReason.cancel){
        editmessage(t);
      }
    });
  }
  else{
    swalmixin.fire().then((result)=>{
      if(result.value){
        deletemessage(t);
      }
    });
  }
  $('.swal2-actions').addClass('popupcontext');
  $('.swal2-container').addClass('nobackdrop');
  $('.swal2-popup').addClass('popup');
  if(t.hasClass('mymsg')){
    $('.swal2-popup').css({"top": pos.top+"px", "right": "10px"});
  }
  else{
    $('.swal2-popup').css({"top": pos.top+"px", "left": "10px"});
  }
}

function editmessage(t){
  editmode = 1;
  editdocid = t.attr('id');
  var msgval = t.find('pre').find('.messagetext').text();
  $('#message').focus().val(msgval);
}
function deletemessage(t){
  var deletedocid = t.attr('id');
  db.collection('chats').doc(deletedocid).delete();
}
function clearchat(){
  db.collection('chats').where('chatID', '==', chatid).get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
      db.collection('chats').doc(doc.id).delete();
    });
  });
}
function listenmessages(chatid){
    stoplistening = db.collection('chats').where('chatID', '==', chatid).orderBy('time').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if(change.type == "added"){
        fl = 1;
        appendchats(change.doc);
      }
      else if(change.type == "modified"){
        var cid = $('#'+change.doc.id);
        cid.find('pre').find('.messagetext').text(change.doc.data().message);
      }
      else if(change.type == "removed"){
        var mid = $('#'+change.doc.id);
        mid.remove();
      }
    });
    $('#chatcontentcontainer').scrollTop($('#chatcontent').height());
  });
}

/////////////////////SETTINGS//////////////////////////
function opensettings(){
  $('#maindiv').removeClass('bring').addClass('pushtoleft');
  $('#settingsdiv').addClass('bring').removeClass('pushtoright');
}

function openchatsettings(){
  $('#chatoptions').addClass('sho');
}

//////////////////////settings options///////////////////////
function logoutuser(){
  Swal.fire({
    title: 'Are you sure?',
    text: 'Your account will be deleted but your messages will be kept',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    preConfirm: ()=>{
      db.collection('users').where('username', '==', user.value).get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
          db.collection('users').doc(doc.id).delete();
        });
      });
    }
  }).then((result)=>{
    console.log(user.value);
    if(result.value){
      Swal.fire({
        text: 'Your account has been deleted! You will now be redirected to registeration page',
        icon: 'success'
      }).then(()=>{
        logout();
      });
    }
  });
}

function checkmode(t){
  var mode = '';
  console.log(t.checked);
  if(t.checked){
    $('#darkcss').attr('href', './css/dark.css');
    mode = 'dark';
  }
  else{
    $('#darkcss').attr('href', '');
    mode = 'light';
  }
  xhttp.open('GET', 'setmode.php?mode='+mode, true);
  xhttp.send();
}
///////////////////////////Document functions///////////////////
$(document).ready(function(){
  var user = $('#user').val();
  if(user != ''){
    $('#logindiv').hide();
    $('#maindiv').addClass('bring').removeClass('pushtoright');
  }
  $('#themecheckbox').change(function(){
    checkmode(this);
  });
  $('#message').keypress(function(event){
    if(event.ctrlKey && event.keyCode == 10){
      sendmessage();
    }
  });
  checkmode(document.getElementById('themecheckbox'));
  appendusers();
  setchatheight();
});
