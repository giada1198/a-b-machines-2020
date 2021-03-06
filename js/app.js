const twitch_link = 'https://www.twitch.tv/abmachines';
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
		<p style='text-align: center;'>Welcome, public!<br>Tonight you will get a glimpse into the life and routine of three very glamorous and important individuals. Our superstars are so thrilled you’ll be joining them.</p>
		<div class='span-50'></div>
		<h2>Before the Show...<br>Our superstars want to hear from you!</h2>
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
		<div class='button'>	
			<a class='link-large' id='startLink' href='#'>SEND FAN MAIL TO YOUR FAVORITE SUPERSTAR!</a>
		</div>
		<div class='span-10'></div>
		<a class='link' href='${twitch_link}'>or directly join the show</a>
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
	document.getElementById('content').innerHTML = `
		<a id='home-link' href='#'>home</a>
		<h1 class='with-home-btn'>FAN MAIL</h1>
		<img class='fan-mail-sample' src='./img/fan-mail-sample.png'>
		<h2 class='step'>Step 1 of 3</h2>
		<p class='step-description'>Choose which superstar you’d like to write to!</p>
		<div class='character'>
			<img class='portrait' src='./img/portrait-marilyn.jpg' width='250' height='250'>
			<div>
				<a id='marilyn-link' href='#'><h3>MARILYN</h3></a>
				<div class='quote'>“I’m the kind of person that lingers in someone’s mind.”</div>
				<p>Likes: gossip, spending money, nudes<br>Dislikes: bills, fake people, dust<br>Fears: death</p>
			</div>
		</div>
		<div class='character'>
			<img class='portrait' src='./img/portrait-liz.jpg' width='250' height='250'>
			<div>
				<a id='liz-link' href='#'><h3>LIZ</h3></a>
				<div class='quote'>“Who needs your boredom?”</div>
				<p>Likes: snacking, horror films, poppers<br>Dislikes: pennies, leftovers, other people’s problems<br>Fears: death</p>
			</div>
		</div>
		<div class='character'>
			<img class='portrait' src='./img/portrait-jackie.jpg' width='250' height='250'>
			<div>
				<a id='jackie-link' href='#'><h3>JACKIE</h3></a>
				<div class='quote'>“Every day is a new day — because I can’t remember the day before.”</div>
				<p>Likes: skin care, alcohol, nothing<br>Dislikes: conflict, pimples, having feelings<br>Fears: death</p>
			</div>
		</div>`;

	document.getElementById('home-link').onclick = () => renderHomePage();

	document.getElementById('marilyn-link').onclick = () => {
		fan_mail.to = 'Marilyn';
		renderForm();
	}
	document.getElementById('liz-link').onclick = () => {
		fan_mail.to = 'Liz';
		renderForm();
	}
	document.getElementById('jackie-link').onclick = () => {
		fan_mail.to = 'Jackie';
		renderForm();
	}
}

function renderForm() {
	document.getElementById('content').innerHTML = `
		<a id='home-link' href='#'>home</a>
		<h1 class='with-home-btn'>FAN MAIL</h1>
		<h2>Step 2 of 3</h2>
		<form class='mail-form'>
			<div class="form-group">
				<label for='name'>First Name</label>
				<input class='form-control' id='name-input' placeholder='Emma'>
			</div>

			<div class='form-group'>
				<label for='location'>Location</label>
				<input class='form-control' id='location-input' placeholder='San Diego'>
			</div>

			<div class='form-group'>
				<label for='message'>Message (Maximum 100 Characters)</label>
				<textarea id='message-input' rows='3' maxlength='100' placeholder='Your aura is so aesthetic! How does it feel to be the most famous person in the world??'></textarea>
			</div>
		</form>
		<div class='button' id='next-step-btn'>
			<div class='link-large-disable'>NEXT STEP!</div>
		</div>
	`;

	document.getElementById('home-link').onclick = () => renderHomePage();
	name_input = document.getElementById('name-input');
	location_input = document.getElementById('location-input');
	message_input = document.getElementById('message-input');

	function checkInput() {
		if (name_input.value.length != 0 && location_input.value.length != 0 && message_input.value.length != 0) {
			document.getElementById('next-step-btn').innerHTML = "<a class='link-large' id='next-step-link' href='#'>NEXT STEP!</a>";
			document.getElementById('next-step-link').onclick = () => {
				fan_mail.name = name_input.value;
				fan_mail.location = location_input.value;
				fan_mail.message = message_input.value;
				renderCamera();
			}
		} else {
			document.getElementById('next-step-btn').innerHTML = `<div class='link-large-disable'>NEXT STEP!</div>`;
		};
	}

	name_input.onkeyup = () => checkInput();
	location_input.onkeyup = () => checkInput();
	message_input.onkeyup = () => checkInput();
}

function renderCamera() {
	have_taken_snapshot = false;
	document.getElementById("content").innerHTML = `
		<a id='home-link' href='#'>home</a>
		<h1 class='with-home-btn'>FAN MAIL</h1>
		<h2 class='step'>Step 3 of 3</h2>
		<p class='step-description'>Share a selfie!</p>
		<div class='camera-interface'>
			<div>
				<div id="my_camera"></div>
				<div class='button-medium' id='screenshot'>
					<a class='link-medium'>Take Snapshot</a>
				</div>
			</div>
			<div class='camera-preview' id="results">
				<div class='camera-preview-text'>Your captured image will appear here...</div>
			</div>
		</div>
		<p>This photograph may be used during tonight’s performance — it will not be saved after the show. If you’d prefer not to take a photo or have any technical issues, you can skip this part.</p>
		<p>Chrome and Safari are recommended for best user experience.</p>
		<div class='button' id='submit-btn'>
			<div class='link-large-disable'>SEND YOUR FAN MAIL!</div>
		</div>
		<div class='span-10'></div>
		<a class='link' id='submit-without-selfie-link' href='#'>or send without your selfie</a>
	`;

	document.getElementById('home-link').onclick = () => renderHomePage();

	Webcam.set({
		// live preview size
		width: 370,
		height: 370,

		constraints: {
			width: 370,
			height: 370,
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
			document.getElementById('results').innerHTML = `<img src='${current_snapshot}' />`;
			if(!have_taken_snapshot) {
				have_taken_snapshot = true;
				document.getElementById('submit-btn').innerHTML = "<a class='link-large' id='submit-link' href='#'>SUBMIT YOUR FAN MAIL!</a>";
				document.getElementById('submit-link').onclick = () => {
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
							// console.log('File available at', downloadURL);
							fan_mail.image = downloadURL;
							fan_mail_post.set(fan_mail);
							renderConfirmationPage();
						});
					});
				}
			}	
		});
	}

	document.getElementById('submit-without-selfie-link').onclick = () => {
		let d = new Date();
		fan_mail.time = TwoDigits(d.getMonth()) + '/' + TwoDigits(d.getDate()) + '/' + TwoDigits(d.getFullYear()) + ' ' +
						TwoDigits(d.getHours()) + ':' + TwoDigits(d.getMinutes()) + ':' + TwoDigits(d.getSeconds());
		let fan_mail_post = firebase.database().ref('fan-mails').push();
		fan_mail_post.set(fan_mail, function(error) {
			if(error) {
				console.log(error);
			} else {
				renderConfirmationPage();
			}
		});
	}
}

function renderConfirmationPage() {
	document.getElementById("content").innerHTML = `
		<a id='home-link' href='#'>home</a>
		<h1 class='with-home-btn'>FAN MAIL</h1>
		<img class='fan-mail-sample' src='./img/fan-mail-front.jpg'>
		<h3 style='font-weight: 500;'>Fan mail received!</h3>
		<div class='button'>	
			<a class='link-large' href='${twitch_link}'>RETURN TO THE PERFORMANCE</a>
		</div>
	`;
	document.getElementById('home-link').onclick = () => renderHomePage();
}

function TwoDigits(n) {
	if(n < 10 && n >= 0) {
		return ('0' + n.toString());
	} else {
		return n.toString();
	}
}