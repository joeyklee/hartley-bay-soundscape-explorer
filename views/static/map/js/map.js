// $(document).ready(function() {
var sound1, sound2, sound3, sound4, sound5, sound6;
var soundList = [sound1, sound2, sound3, sound4, sound5, sound6];
var linkList = [ "assets/sounds/light_bulb_breaking.mp3","assets/sounds/sample.m4a", "assets/sounds/water_droplet_3.mp3", "assets/sounds/cd_tray.mp3", "assets/sounds/camera_flashing_2.mp3", "assets/sounds/sample.m4a",]
function preload(){
	for (var i =0; i < soundList.length ; i++) {
		soundList[i] = loadSound(linkList[i]);
	}
}

function setup(){	
    var geojson = [{
        "geometry": {
            "type": "Point",
            "coordinates": [54.312028, -130.405892]
        },
        "properties": {
            "id": "cover",
            "zoom": 13
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.321369, -130.310031]
        },
        "properties": {
            "id": "location1",
            "sound": "assets/sounds/sample.m4a"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.359438, -130.045270]
        },
        "properties": {
            "id": "location2",
            "sound": "assets/sounds/sample.m4a"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.214698, -129.703033]
        },
        "properties": {
            "id": "location3",
            "sound": "assets/sounds/sample.m4a"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.100640, -129.878030]
        },
        "properties": {
            "id": "location4",
            "sound": "assets/sounds/sample.m4a"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.114232, -130.078776]
        },
        "properties": {
            "id": "location5",
            "sound": "assets/sounds/sample.m4a"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.071679, -130.487628]
        },
        "properties": {
            "id": "location6"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.257395, -130.296676]
        },
        "properties": {
            "id": "location7"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [54.194780, -130.724856]
        },
        "properties": {
            "id": "location8"
        }
    }];

    L.mapbox.accessToken = 'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';
    var map = L.mapbox.map('map', 'mapbox.streets', {
        zoomControl: false
    });

    // var placesLayer = L.mapbox.featureLayer(places)
    //     .addTo(map);

    //    // Ahead of time, select the elements we'll need -
    // // the narrative container and the individual sections
    // var narrative = document.getElementById('narrative'),
    //     sections = narrative.getElementsByTagName('section'),
    //     currentId = '';

    // Array of story section elements.
    var sections = document.getElementsByTagName('section');
    // console.log(sections);

    // Array of marker elements with order matching section elements.
    // var markers = _(sections).map(function(section) {
    //     return _(spots.markers()).find(function(m) {
    //         return m.data.properties.id === section.id;
    //     });
    // });

    // console.log(markers);


    // Helper to set the active section.
    var setActive = function(index, ease) {
        // Set active class on sections, markers.
        _(sections).each(function(s) {
            s.className = s.className.replace(' active', '')
        });

        
       
        // _(markers).each(function(m) {
        //     m.element.className = m.element.className.replace(' active', '')
        // });
        sections[index].className += ' active';
        // markers[index].element.className += ' active';

        // Set a body class for the active section.
        document.body.className = 'section-' + index;


        // Ease map to active marker.
        if (!ease) {
            map.setView([geojson[index].geometry.coordinates[0], geojson[index].geometry.coordinates[1]], geojson[index].properties.zoom || 13);

            
        } else {
            map.setView([geojson[index].geometry.coordinates[0], geojson[index].geometry.coordinates[1]], geojson[index].properties.zoom || 14);
        }

        return true;
    };

    // Bind to scroll events to find the active section.
    window.onscroll = _(function() {
        // IE 8
        if (window.pageYOffset === undefined) {
            var y = document.documentElement.scrollTop;
            var h = document.documentElement.clientHeight;
        } else {
            var y = window.pageYOffset;
            var h = window.innerHeight;
        }

        // If scrolled to the very top of the page set the first section active.
        if (y === 0) return setActive(0, true);


        // Otherwise, conditionally determine the extent to which page must be
        // scrolled for each section. The first section that matches the current
        // scroll position wins and exits the loop early.
        var memo = 0;
        var buffer = (h * 0.3333);
        var active = _(sections).any(function(el, index) {
            memo += el.offsetHeight;

            	// if switched to a section check if active and play sound. 
            	// if it is a short soundbit it will play over and over on window scroll just fyi
            	if(sections[index].className == " active" && geojson[index].properties.sound && soundList[index] !== undefined){
            		if(soundList[index].isPlaying() && soundList[index] !== undefined){
            			console.log("yes");
            		}else{
            			soundList.forEach(function(obj){
            				obj.stop();
            			})
            			soundList[index].play();
            		}
		             
	             } else if (soundList[index] !== undefined){
	             	soundList[index].stop();
	             	console.log("no");
	             }


            return y < (memo - buffer) ? setActive(index, true) : false;
        });

        // If no section was set active the user has scrolled past the last section.
        // Set the last section active.
        if (!active) setActive(sections.length - 1, true);

    }).debounce(10);

    // Set map to first section.
    setActive(0, false);



}


// var mySound;
         //    if(sections[index].className == " active" && geojson[index].properties.sound){
	        //     var mySound = loadSound(geojson[index].properties.sound, function(){
         //    	if(sections[index].className == " active" && geojson[index].properties.sound){
		       //       mySound.play();
		       //       console.log("yes")
	        //      } else{
	        //      	mySound.stop();
	        //      	console.log("no")
	        //      }
         //    });
	        // }


// });


          //   var mySound;
          //   function preload(){
          //   	mySound = loadSound(geojson[index].properties.sound);
          //   }
          //   console.log(geojson[index].properties.sound)
	         // if (sections[index].className == " active" && geojson[index].properties.sound) {
	         //     mySound.play();
	         //     console.log("yes")
	         // } else {
	         //     mySound.stop();
	         //     console.log("false")
	         // }


// var test =  new p5.SoundFile(geojson[index].properties.sound);
// 	         if (sections[index].className == " active" && geojson[index].properties.sound){
	         	
// 	        		test.play();
// 	        		console.log("yes")
// 	        } else{
// 	        		test.stop();
// 	        		console.log("false")
// 	        }

// function preload() {
//     mySound = loadSound('assets/sounds/sample.m4a');
// }

