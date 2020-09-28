let firebaseConfig = {
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
firebase.analytics();

let fan_mail = new Object();
let current_snapshot;
let have_taken_snapshot;

function renderHomePage() {
	fan_mail = {};
	current_snapshot = '';
	document.getElementById("content").innerHTML = `
		<img src='./img/visitor-counter.jpg' width='195' height='45'>
		<h1>A<div class='dark-blue'>/</div>B MACHINES</h1>
		<div class='credit'>adapted from the work of Andy Warhol<br>created and directed by Philip Wesley Gates<br>Philadelphia Fringe Festival 2020</div>
		<p>Welcome, public! Tonight you will get a glimpse into the life and routine of three very glamorous and important individuals. Our superstars are so thrilled you’ll be joining them.</p>
		<p>We invite you to get into a LOOK for the performance — whatever that means to you! Remember going out to a show and looking cute? Imagine we’re all in a theatre lobby together, chatting, laughing, maybe having a preshow drink, maybe checking each other out…</p>
		<p>Once you’ve got yourself ready, there will be a chance for you to share a selfie before the show — no pressure, you can enjoy the performance without doing so if you prefer. But we’d love to see all of your faces — and you just might make a guest star appearance!</p>
		<div class='quote'>“I’ve never met a person I couldn’t call a beauty.” — Andy Warhol</div>
		<div class='span-50'></div>
		<h2>Meet The Superstars!</h2>
		<div class='character'>
			<img class='portrait' src='./img/portrait-marilyn.jpg' width='250' height='250'>
			<div>
				<h3>MARILYN</h3>
				<div class='quote'>“I’m the kind of person that lingers in someone’s mind.”</div>
				<p>Likes: gossip, spending money, nudes<br>Dislikes: bills, fake people, dust<br>Fears: death</p>
			</div>
		</div>
		<div class='character'>
			<img class='portrait' src='./img/portrait-liz.jpg' width='250' height='250'>
			<div>
				<h3>LIZ</h3>
				<div class='quote'>“Who needs your boredom?”</div>
				<p>Likes: snacking, horror films, poppers<br>Dislikes: pennies, leftovers, other people’s problems<br>Fears: death</p>
			</div>
		</div>
		<div class='character'>
			<img class='portrait' src='./img/portrait-jackie.jpg' width='250' height='250'>
			<div>
				<h3>JACKIE</h3>
				<div class='quote'>“Every day is a new day — because I can’t remember the day before.”</div>
				<p>Likes: skin care, alcohol, nothing<br>Dislikes: conflict, pimples, having feelings<br>Fears: death</p>
			</div>
		</div>
		<div class='highlight'>Before the Show...<br>Our superstars want to hear from you!</div>
		<div class='button'>	
			<a class='link-large' id='startLink' href='#'>SEND FAN MAIL TO YOUR FAVORITE SUPERSTAR!</a>
		</div>
		<div class='span-10'></div>
		<a class='link' href='#'>or directly join the show</a>
	`;
	document.getElementById('startLink').onclick = () => {
		renderStartPage();
	}
}

renderHomePage();

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function renderStartPage() {
	document.getElementById("content").innerHTML = `
		<h1>FAN MAIL</h1>
		<a id='homeLink' href='#'>home</a>
		<h2>Step 1 of 3</h2>
		<p>Choose which superstar you’d like to write to!</p>
		<a id='marilynLink' href='#'><h3>MARILYN:</h3></a>
		<p><i>“I’m the kind of person that lingers in someone’s mind.”</i><br>Likes: gossip, spending money, nudes<br>Dislikes: bills, fake people, dust<br>Fears: death</p>
		<a id='lizLink' href='#'><h3>LIZ:</h3></a>
		<p><i>“Who needs your boredom?”</i><br>Likes: snacking, horror films, poppers<br>Dislikes: pennies, leftovers, other people’s problems<br>Fears: death</p>
		<a id='jackieLink' href='#'><h3>JACKIE:</h3></a>
		<p><i>“Every day is a new day — because I can’t remember the day before.”</i><br>Likes: skin care, alcohol, nothing<br>Dislikes: conflict, pimples, having feelings<br>Fears: death</p>
	`;

	document.getElementById('homeLink').onclick = () => renderHomePage();

	document.getElementById('marilynLink').onclick = () => {
		fan_mail.to = 'Marilyn';
		renderForm();
	}
	document.getElementById('lizLink').onclick = () => {
		fan_mail.to = 'Liz';
		renderForm();
	}
	document.getElementById('jackieLink').onclick = () => {
		fan_mail.to = 'Jackie';
		renderForm();
	}
}

function renderForm() {
	document.getElementById("content").innerHTML = `
		<h1>FAN MAIL</h1>
		<a id='homeLink' href='#'>home</a>
		<h2>Step 2 of 3</h2>
		<form id="recommendationForm">
			<div class="form-group">
			<label for="name">First Name: </label>
			<input class="form-control" id="nameInput" placeholder="Emma Abraham">
			</div>

			<div class="form-group">
			<label for="location">Location: </label>
			<input class="form-control" id="locationInput" placeholder="Orange County">
			</div>

			<div class="form-group">
			<label for="message">Message:</label>
			<textarea id="messageInput" rows="3" cols="100" placeholder="Examples: How does it feel to be the most famous person in the world??
Your aura is so aesthetic!
Help! I looked in the mirror and now all I can think about is the looming inevitability of mortality! Any advice??"></textarea>
			</div>
		</form>
		<div id='nextStepBtn'>
			<p>NEXT STEP</p>
		</div>
	`;

	document.getElementById('homeLink').onclick = () => renderHomePage();
	name_input = document.getElementById('nameInput');
	location_input = document.getElementById('locationInput');
	message_input = document.getElementById('messageInput');

	function checkInput() {
		console.log('hi!');
		if (name_input.value.length != 0 && location_input.value.length != 0 && message_input.value.length != 0) {
			document.getElementById('nextStepBtn').innerHTML = "<a id='nextStepLink' href='#'>NEXT STEP</a>";
			document.getElementById('nextStepLink').onclick = () => {
				fan_mail.name = name_input.value;
				fan_mail.location = location_input.value;
				fan_mail.message = message_input.value;
				renderCamera();
			}
		} else {
			document.getElementById("nextStepBtn").innerHTML = '<p>NEXT STEP</p>';
		};
	}

	name_input.onkeyup = () => checkInput();
	location_input.onkeyup = () => checkInput();
	message_input.onkeyup = () => checkInput();
}

function renderCamera() {
	have_taken_snapshot = false;
	document.getElementById("content").innerHTML = `
		<h1>FAN MAIL</h1>
		<a id='homeLink' href='#'>home</a>
		<h2>Step 2 of 3</h2>
		<p>Share a selfie!</p>
		<p>This photograph may be used during tonight’s performance — it will not be saved after the show. If you’d prefer not to take a photo or have any technical issues, you can skip this part.]</p>
		<div class="camera-interface">
			<div>
				<div id="my_camera"></div>
				<form>
					<input type=button id="screenshot" value="Take Large Snapshot">
				</form>
			</div>
			<div id="results">Your captured image will appear here...</div>
		</div>	
		<div id='submitBtn'>
			<p>SUBMIT YOUR FAN MAIL!</p>
		</div>
	`;

	document.getElementById('homeLink').onclick = () => renderHomePage();

	Webcam.set({
		// live preview size
		width: 320,
		height: 320,

		constraints: {
			width: 320,
			height: 320,
			facingMode: "user"
		},
		
		// format and quality
		image_format: 'jpeg',
		jpeg_quality: 60,
		flip_horiz: true
	});
	Webcam.attach( '#my_camera' );

	// Get a reference to the storage service, which is used to create references in your storage bucket
	let storage = firebase.storage();
	// Create a storage reference from our storage service
	let storageRef = storage.ref();

	document.getElementById('screenshot').onclick = function() {
		// take snapshot and get image data
		Webcam.snap((data_uri) => {
			// display results in page
			current_snapshot = data_uri;
			document.getElementById('results').innerHTML = 
				'<h2>Here is your large image:</h2>' + 
				'<img src="' + current_snapshot + '"/>';
			if(!have_taken_snapshot) {
				have_taken_snapshot = true;
				document.getElementById('submitBtn').innerHTML = "<a id='submitLink' href='#'>SUBMIT YOUR FAN MAIL!</a>";
				document.getElementById('submitLink').onclick = () => {
					let d = new Date();
					fan_mail.time = TwoDigits(d.getMonth()) + '/' + TwoDigits(d.getDate()) + '/' + TwoDigits(d.getFullYear()) + ' ' +
									TwoDigits(d.getHours()) + ':' + TwoDigits(d.getMinutes()) + ':' + TwoDigits(d.getSeconds());
					let fan_mail_post = firebase.database().ref('fan-mails').push();
					fan_mail_post.set(fan_mail);
					// upload snapshot
					let uploadTask = storageRef.child('snapshots/' + fan_mail_post.key + '.jpg').put(dataURLtoBlob(current_snapshot));
					uploadTask.on('state_changed', (snapshot) => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
						}
					}, (error) => {
						// Handle unsuccessful uploads
					}, () => {
						// Handle successful uploads on complete
						uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
							console.log('File available at', downloadURL);
							fan_mail.image = downloadURL;
							fan_mail_post.set(fan_mail);
							renderConfirmationPage();
						});
					});
				}
			}	
		});
	}
}

function renderConfirmationPage() {
	document.getElementById("content").innerHTML = `
		<h1>FAN MAIL</h1>
		<a id='homeLink' href='#'>home</a>
		<h2>Succed!</h2>
	`;
	document.getElementById('homeLink').onclick = () => renderHomePage();
}

function TwoDigits(n) {
	if(n < 10 && n >= 0) {
		return ('0' + n.toString());
	} else {
		return n.toString();
	}
}