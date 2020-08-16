// Cookie Operations

console.log("Cookie upon load: " + document.cookie)

// Bakes a fresh new cookie
function bakeCookie(cooKey, value, shelfLife) {
  var d = new Date();
  d.setTime(d.getTime() + (shelfLife*24*60*60*1000));
  var expiration = "expires=" + d.toUTCString();

  document.cookie = 
    cooKey + "=" + value + "; " +
    "sameSite=lax" + "; " + 
    expiration + "; path=/;" + 
    "Secure=true";
}

// Checks whether a given cookie exists
function isCookie(cooKey) {
  if (document.cookie.split(';').some(function(item) {
    return item.trim().indexOf(cooKey + '=') == 0
  })) 
    return true;
  else
    return false;
}

// Gets a value from an existing cookie using a key
function getCookie(cooKey) {
  if (document.cookie == ""){
    return;
  }
  const cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith(cooKey))
  .split('=')[1];

  return cookieValue;
}

// Always make brand new cookie on settings change based on current (i.e. most recent) settings

// Default preferences
var is24 = false;
var voiceOn = true;

// Alters preferences if a cookie exists
if (document.cookie != "") {
  if (getCookie('vc') === 'active') {
    voiceOn = true;
    document.getElementById('vcSwitch').checked = true;
  }
  if (getCookie('ac') === 'active') {
    is24 = true;
    document.getElementById('acSwitch').checked = true;
  }
}

// Preferences adjustments

function toggleVC() {
  voiceOn = voiceOn ? false : true;
  let newVC = voiceOn ? 'active' : 'inactive';
  bakeCookie('vc', newVC, 100);
  let newAC = is24 ? 'active' : 'inactive';
  bakeCookie('ac', newAC, 100);
}

var today = new Date();

// Normal time
function normalTime() {
  let h = today.getHours();
  let m = today.getMinutes();
  let qual;

  if (h < 13)
      qual = 'am';
  else {
      h -= 12;
      qual = 'pm';
  }
  if (m < 10)
      m = '0' + m;

    document.getElementById('stardate').innerHTML = h + ":" + m + " " + qual;
}

// 24-hour time
function time24() {
  let h = today.getHours();
  let m = today.getMinutes();

  if (m < 10)
    m = '0' + m;

  document.getElementById('stardate').innerHTML = h + ":" + m;
}

var tellTime = is24 ? time24 : normalTime;

tellTime();

function toggleClock() {
  if (is24) {
    is24 = false;
    tellTime = normalTime; 
  }
  else {
    is24 = true;
    tellTime = time24;
  }

  let newAC = (is24 == true) ? 'active' : 'inactive';
  bakeCookie('ac', newAC, 100);
  let newVC = (voiceOn == true) ? 'active' : 'inactive';
  bakeCookie('vc', newVC, 100);
}

// Writes time to DOM every second
setInterval(function() {
  tellTime();
}, 1000)

const prompts = ["Engage", 'Punch it', "Make it so", "Go (boldly)", "Assimilate this",
    "Energize"];

document.getElementById('warp9').innerHTML = prompts[Math.floor(Math.random() * Math.floor(prompts.length))]

// Check whether String is a url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// Intercepts 'enter' keypress
var coord = document.getElementById('heading');
coord.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('warp9').click();
  }
});

// E N G A G E
function engage() {
  let heading = document.getElementById('heading').value;

  // Unless there's been something typed in the text field don't navigate anywhere (address bar has its own mechanism)
  if (heading === '')
    return;

  if (voiceOn) {
      var picard = new Audio('engage.mp3');
      picard.play();
      if (validURL(heading))
        window.open('http://' + heading);
      else  
        window.open('http://google.com/search?q=' + heading);

      setTimeout(() => {
        window.close()
      }, 2400);
    }
  else {
    window.open('http://google.com/search?q=' + heading, '_self');
  }
}

function togglePrefs() {
  if (document.getElementById('prefpanel').style.width != "260px") {
    document.getElementById('prefpanel').style.width = "260px";
    let elements = document.getElementsByClassName('switch');
    for (var i=0; i<elements.length; i++) {
      elements[i].style.display = 'block';
    }
    setTimeout(function(){
      elements = document.getElementsByClassName('preflabel');
      for (var i=0; i<elements.length; i++) {
      elements[i].style.display = 'block';
      }
    }, 400)
  }
  else {
    document.getElementById('prefpanel').style.width = "0px";
    let elements = document.getElementsByClassName('switch');
    for (var i=0; i<elements.length; i++) {
      elements[i].style.display = 'none';
    }
    elements = document.getElementsByClassName('preflabel');
    for (var i=0; i<elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }
}

/* Begin particle implementation */

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 355,
        "density": {
          "enable": true,
          "value_area": 789.1476416322727
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.48927153781200905,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 83.91608391608392,
          "size": 1,
          "duration": 3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });