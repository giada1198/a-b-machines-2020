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
let ref = firebase.database().ref('fan-mails');

let content = document.getElementById('background');

let circle = new Array();
let mail_copy = new Array();
let n;

for (i = 0; i < 15; i++) {
    content.innerHTML += `<div class="circle" id="circle-${i}"></div>`;
}

for (i = 0; i < 15; i++) {
    circle.push(document.getElementById(`circle-${i}`));
}

ref.once('value', function(mails) {
    mails.forEach(function(mail) {
        if('image' in mail.val()) {
            console.log(mail.val()['image']);
            mail_copy.push(mail.val()['image']);
        }
    });
});

shuffle(mail_copy);

for (i = 0; i < 15; i++) {
    circle[i].style.backgroundImage = `url('${mail_copy[i]}')`;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

var myVar = setInterval(myTimer, 5000);

function myTimer() {
    shuffle(mail_copy);
    for (i = 0; i < 15; i++) {
        circle[i].style.backgroundImage = `url('${mail_copy[i]}')`;
    }
}