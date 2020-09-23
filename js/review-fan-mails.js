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
let ref = firebase.database().ref('fan-mails').orderByChild('time');

let content = document.getElementById('content');

ref.once('value', function(mails) {
	mails.forEach(function(mail) {
		let val = mail.val();
		content.innerHTML += ('<div class="mail">' +
							  '<img src="' + val['image'] + ' width="200" height="200">' +
							  '<br><b>No:</b> ' + mail.key +
							  '<br><b>To:</b> ' + val['to'] +
							  '<br><b>Name:</b> ' + val['name'] +
							  '<br><b>From:</b> ' + val['location'] +
							  '<br><b>Message:</b> ' + val['message'] +
							  '<br><b>Posted:</b> ' + val['time'] +
							  '</div>');
	});
});