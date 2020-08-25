// Alters preferences if a local 'cookie' exists
var is24 = (localStorage.getItem('ac') === 'active') ? true : false;
var voiceOn = (localStorage.getItem('vc') === 'active') ? true : false;
var storedColor = (localStorage.getItem('color') == "") ? '#17182f' : localStorage.getItem('color');

document.getElementById('vcSwitch').checked = voiceOn ? true : false
document.getElementById('acSwitch').checked = is24 ? true : false
document.getElementById('enterColor').placeholder = storedColor;
document.body.style.backgroundColor = storedColor;

var today = new Date();

// Color wheel initialization
var colorPicker = new iro.ColorPicker('#picker', {
  width: 220,
  color: storedColor
});

colorPicker.on("color:change", () => {
  changeColor(colorPicker.color.hexString);
})

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
  if (h == 0) {
    h = 12;
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

// Alter preferences

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
  localStorage.setItem('ac', newAC);
}

function toggleVC() {
  voiceOn = voiceOn ? false : true;
  let newVC = voiceOn ? 'active' : 'inactive';
  localStorage.setItem('vc', newVC);
}

function changeColor(color) {
  if (!color.startsWith('#'))
    color = '#' + color;
  // Verifies hex code as acceptable for color code
  if (!(/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color))) {
    document.getElementById('colorNote').innerHTML = "Enter a valid hex code";
    document.getElementById('colorNote').style.display = 'block';
    return;
  }
  document.getElementById('colorNote').innerHTML = "Original color was 17182f";
  if (document.body.style.backgroundColor != '#17182f')
    document.getElementById('colorNote').style.display = 'block';
  else
    document.getElementById('colorNote').style.display = 'none';

  localStorage.setItem('color', color);
  document.getElementById('enterColor').value = color;
  document.body.style.backgroundColor = color;
  colorPicker.color.hexString = color;
}

/* Utility methods */

// Writes time to DOM every second
setInterval(function () {
  tellTime();
}, 1000)

const prompts = ["Engage", 'Punch it', "Make it so", "Go (boldly)", "Assimilate this", "Energize"
];

document.getElementById('warp9').innerHTML = prompts[Math.floor(Math.random() * Math.floor(prompts.length))]

// Check whether String is a url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

// Reverts to the first color passed to the window
function revertColor() {
  colorPicker.reset();
}

// Intercepts 'enter' keypress
var coord = document.getElementById('heading');
coord.addEventListener("keyup", function (event) {
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
    let engageNo = Math.floor(Math.random() * 7)
    var picard = new Audio("Engage mp3s/engage" + engageNo + ".mp3");
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

// Open/close the preferences menu
function togglePrefs() {
  if (document.getElementById('sidebar').style.marginLeft != '0px')
    document.getElementById('sidebar').style.marginLeft = '0px';
  else
    document.getElementById('sidebar').style.marginLeft = '-260px';
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