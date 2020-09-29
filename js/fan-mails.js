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
let id = getQueryStringValue("id");

if(id.length < 20) {
	let ref = firebase.database().ref('fan-mails').orderByChild('time');

	document.getElementById('content').innerHTML = '<div class="preview-mails" id="preview-mails"></div>';
	ref.once('value', function(mails) {
		mails.forEach(function(mail) {
			let val = mail.val();
			let html = `
				<div class='preview-mail'>
					<div style='text-align: right;'>
						<a class='remove-btn' id='${mail.key}' href='#'>Remove</a>
					</div>`;
			!('image' in val) ? html += "<div class='no-image'>No Image</div>" : html += `<img class='with-image' src='${val['image']}'>`;
			html += `
				<p>
					<b>ID:</b> ${mail.key}<br>
					<b>To:</b> ${val['to']}<br>
					<b>Name:</b> ${val['name']}<br>
					<b>From:</b> ${val['location']}<br>
					<b>Message:</b> ${val['message']}<br>
					<b>Posted:</b> ${val['time']}
				</p>
				<a href='?id=${mail.key}'>Render</a></div>`;
			document.getElementById('preview-mails').insertAdjacentHTML('beforeend', html);
			document.getElementById(mail.key).onclick = () => {
				firebase.database().ref('fan-mails/' + mail.key).remove();
				firebase.storage().ref('snapshots/' + mail.key + '.jpg').delete().then(function() {
					location.reload();
				}).catch(function(error) {
					console.log(error);
				});
			}
		});
	});
} else {
	let ref = firebase.database().ref('fan-mails/' + id);
	let container = document.getElementById('content');
	
	ref.once('value', function(mail) {
		let val = mail.val();
		let html = `
			<div class='background'>
				<div class='mail'>
					<div class='mail-text-area'>
						<div class='mail-text'>
							<div class='line'>Dear ${val['to']},</div>
							<div class='line'>${val['message']}</div>
						</div>
						<div class='signature'>${val['name']} from ${val['location']}</div>
					</div>`;
		!('image' in val) ? html += "</div></div>" : html += `<img class='selfie' src='${val['image']}'></div></div>`;
		container.innerHTML = html;
	});
}

function getQueryStringValue(key) {  
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}