<link rel="stylesheet" href="./css/index.css">
<link rel="stylesheet" href="" id="darkcss">
<link href="./css/roboto.css" rel="stylesheet">
<link rel="manifest" href="./manifest.json">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"></script>
<script>
  var firebaseConfig = {
    apiKey: "AIzaSyAXKAJqD48kZ2iIJJ-OGgPolSNkMty6wPM",
    authDomain: "test-chat-app-86.firebaseapp.com",
    databaseURL: "https://test-chat-app-86.firebaseio.com",
    projectId: "test-chat-app-86",
    storageBucket: "test-chat-app-86.appspot.com",
    messagingSenderId: "1010207905715",
    appId: "1:1010207905715:web:0a29a14369474b8a6d5dc6",
    measurementId: "G-9JZ5JW0R1X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const accountname = "";
  firebase.analytics();
</script>
<script src="./js/jquery.js" charset="utf-8"></script>
<script src="./js/index.js" charset="utf-8"></script>
<script src="./js/sweetalert.js"></script>
<script src="./js/clickable.js"></script>
