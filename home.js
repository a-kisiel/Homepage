var today = new Date();

var h = today.getHours();
var m = today.getMinutes();
var qual;

if (h < 13)
    qual = 'am';
else {
    h -= 12;
    qual = 'pm';
}
if (m < 10)
    m = '0' + m;

const prompts = ["Engage", 'Punch it', "Make it so", "Go (boldly)", "Assimilate this",
    "Energize"];

document.getElementById('clock').innerHTML = h + ":" + m + " " + qual;
document.getElementById('go').value = prompts[Math.floor(Math.random() * Math.floor(prompts.length))]
if (document.readyState === "complete")
  document.getElementById('textfield').focus();

setInterval(function() {
    var today = new Date();

    var h = today.getHours();
    var m = today.getMinutes();
    var qual;

    if (h == 0)
      h = 12;
    if (h < 13)
        qual = 'am';
    else {
        h -= 12;
        qual = 'pm';
    }
    if (m < 10)
        m = '0' + m;

    document.getElementById('clock').innerHTML = h + ":" + m + " " + qual;
}, 1000)

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