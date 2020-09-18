// Your web app's Firebase configuration
console.log("hi");
var firebaseConfig = {
  apiKey: "AIzaSyDGz-JZAC6I61gl7fVJ_pcvR9BE2hO7V90",
  authDomain: "ab-machines-2020.firebaseapp.com",
  databaseURL: "https://ab-machines-2020.firebaseio.com",
  projectId: "ab-machines-2020",
  storageBucket: "ab-machines-2020.appspot.com",
  messagingSenderId: "265193914832",
  appId: "1:265193914832:web:2add09353e2b72da6039d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function saveToFirebase(email) {
  var emailObject = {
    email: email
  };

  firebase.database().ref('subscription-entries').push().set(emailObject);
}

saveToFirebase('abc');

var ref = firebase.database().ref('subscription-entries');

ref.once("value")
  .then(function(snapshot) {
    console.log(snapshot.numChildren()); // 1 ("name")
  });

let el = document.getElementById('sendMail');
el.onclick = function() {
  document.getElementById("content").innerHTML = `
    <h1>FAN MAIL</h1>
    <a id='home' href='#'>home</a>
    <h2>Step 1 of 3</h2>
    <p>Choose which superstar you’d like to write to!</p>
    <a id='marilyn' href='#'><h3>MARILYN:</h3></a>
    <p><i>“I’m the kind of person that lingers in someone’s mind.”</i><br>Likes: gossip, spending money, nudes<br>Dislikes: bills, fake people, dust<br>Fears: death</p>
    <a id='liz' href='#'><h3>LIZ:</h3></a>
    <p><i>“Who needs your boredom?”</i><br>Likes: snacking, horror films, poppers<br>Dislikes: pennies, leftovers, other people’s problems<br>Fears: death</p>
    <a id='jackie' href='#'><h3>JACKIE:</h3></a>
    <p><i>“Every day is a new day — because I can’t remember the day before.”</i><br>Likes: skin care, alcohol, nothing<br>Dislikes: conflict, pimples, having feelings<br>Fears: death</p>
  `;
  document.getElementById('marilyn').onclick = function() {
    renderForm();
  }
  document.getElementById('liz').onclick = function() {
    renderForm();
  }
  document.getElementById('jackie').onclick = function() {
    renderForm();
  }
  return false;
}

function renderForm() {
  document.getElementById("content").innerHTML = `
  <h1>FAN MAIL</h1>
  <a id='home' href='#'>home</a>
  <h2>Step 2 of 3</h2>
  <form id="recommendationForm">
    <div class="form-group">
      <label for="name">First Name: </label>
      <input class="form-control" id="name" placeholder="Emma Abraham">
    </div>

    <div class="form-group">
      <label for="location">Location: </label>
      <input class="form-control" id="location" placeholder="Orange County">
    </div>

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" rows="3" cols="150" placeholder="Examples: How does it feel to be the most famous person in the world??
Your aura is so aesthetic!
Help! I looked in the mirror and now all I can think about is the looming inevitability of mortality! Any advice??"></textarea>
    </div>
  </form>
  <div id='nextStep'>
    <p>NEXT STEP</p>
  </div>
  `;
  nameInput = document.getElementById('name');
  locationInput = document.getElementById('location');
  messageInput = document.getElementById('message');
  nameInput.onkeyup = function() {
    if (nameInput.value.length != 0 && locationInput.value.length != 0 && messageInput.value.length != 0) {
      document.getElementById("nextStep").innerHTML = "<a id='nextStepBtn' href='#'>NEXT STEP</a>";
      document.getElementById('nextStepBtn').onclick = function() {
        renderCamera();
      }
    } else {
      document.getElementById("nextStep").innerHTML = '<p>NEXT STEP</p>';
    };
  };
  locationInput.onkeyup = function() {
    if (nameInput.value.length != 0 && locationInput.value.length != 0 && messageInput.value.length != 0) {
      document.getElementById("nextStep").innerHTML = "<a id='nextStepBtn' href='#'>NEXT STEP</a>";
      document.getElementById('nextStepBtn').onclick = function() {
        renderCamera();
      }
    } else {
      document.getElementById("nextStep").innerHTML = '<p>NEXT STEP</p>';
    };
  };
  messageInput.onkeyup = function() {
    if (nameInput.value.length != 0 && locationInput.value.length != 0 && messageInput.value.length != 0) {
      document.getElementById("nextStep").innerHTML = "<a id='nextStepBtn' href='#'>NEXT STEP</a>";
      document.getElementById('nextStepBtn').onclick = function() {
        renderCamera();
      }
    } else {
      document.getElementById("nextStep").innerHTML = '<p>NEXT STEP</p>';
    };
  };
}

function renderCamera() {
  document.getElementById("content").innerHTML = `
  <h1>FAN MAIL</h1>
  <a id='home' href='#'>home</a>
  <h2>Step 2 of 3</h2>
  <p>Share a selfie!</p>
  <p>This photograph may be used during tonight’s performance — it will not be saved after the show. If you’d prefer not to take a photo or have any technical issues, you can skip this part.]</p>
	<div id="my_camera"></div>
	
	<!-- First, include the Webcam.js JavaScript Library -->
	
	
	<!-- Configure a few settings and attach camera -->
	<script language="JavaScript">

	</script>
	
	<!-- A button for taking snaps -->
	<form>
		<input type=button id="screenshot" value="Take Large Snapshot">
  </form>
  
  <div id="results">Your captured image will appear here...</div>
  
	<!-- Code to handle taking the snapshot and displaying it locally -->
	<div id='nextStep'>
    <p>SUBMIT YOUR FAN MAIL!</p>
  </div>
  `;

  Webcam.set({
    // live preview size
    width: 1280,
    height: 720,
    
    // device capture size
    dest_width: 1280,
    dest_height: 720,
    
    // final cropped size
    crop_width: 480,
    crop_height: 480,
    
    // format and quality
    image_format: 'jpeg',
    jpeg_quality: 90
  });
  
  Webcam.attach( '#my_camera' );

  document.getElementById('screenshot').onclick = function() {
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
      // display results in page
      document.getElementById('results').innerHTML = 
        '<h2>Here is your large image:</h2>' + 
        '<img src="'+data_uri+'"/>';
    } );
  }


}


