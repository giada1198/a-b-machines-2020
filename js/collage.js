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
let n;

for (i = 0; i < 15; i++) {
    content.innerHTML += `<div class="circle" id="circle-${i}"></div>`;
}

for (i = 0; i < 15; i++) {
    circle.push(document.getElementById(`circle-${i}`));
}

ref.once('value', function(mails) {
    n = 0;
    mails.forEach(function(mail) {
        let url = mail.val()['image'];
        circle[n].style.backgroundImage = `url('${url}')`;
        n += 1;
    });
});

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

var myVar = setInterval(myTimer, 3000);

function myTimer() {
    shuffle(circle);
    ref.once('value', function(mails) {
        n = 0;
        mails.forEach(function(mail) {
            let url = mail.val()['image'];
            circle[n].style.backgroundImage = `url('${url}')`;
            n += 1;
        });
    });
}

