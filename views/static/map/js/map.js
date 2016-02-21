$(document).ready(function() {
    // var places = {
    //     type: 'FeatureCollection',
    //     features: [{
    //         geometry: { type: "Point", coordinates: [-0.12960000, 51.50110000] },
    //         properties: { id: "cover", zoom: 9 },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.15591514, 51.51830379] },
    //         properties: { id: "baker" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.07571203, 51.51424049] },
    //         properties: { id: "aldgate" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.08533793, 51.50438536] },
    //         properties: { id: "london-bridge" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [0.05991101, 51.48752939] },
    //         properties: { id: "woolwich" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.18335806, 51.49439521] },
    //         properties: { id: "gloucester" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.19684993, 51.5033856] },
    //         properties: { id: "caulfield-gardens" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.10669358, 51.51433123] },
    //         properties: { id: "telegraph" },
    //         type: 'Feature'
    //     }, {
    //         geometry: { type: "Point", coordinates: [-0.12416858, 51.50779757] },
    //         properties: { id: "charing-cross" },
    //         type: 'Feature'
    //     }]
    // };

    var geojson = [{
        "geometry": {
            "type": "Point",
            "coordinates": [53.420121, -129.252830]
        },
        "properties": {
            "id": "cover",
            "zoom": 13
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.389010, -129.162193]
        },
        "properties": {
            "id": "location1"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.559837, -128.905388]
        },
        "properties": {
            "id": "location2"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.773014, -128.877922]
        },
        "properties": {
            "id": "location3"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.302872, -129.051457]
        },
        "properties": {
            "id": "location4"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.189280, -129.497771]
        },
        "properties": {
            "id": "location5"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.134132, -129.731425]
        },
        "properties": {
            "id": "location6"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.044382, -129.178564]
        },
        "properties": {
            "id": "location7"
        }
    }, {
        "geometry": {
            "type": "Point",
            "coordinates": [53.605014, -129.248651]
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
    console.log(sections);

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

        console.log(geojson[index]);

        // Ease map to active marker.
        if (!ease) {
            map.setView([geojson[index].geometry.coordinates[0], geojson[index].geometry.coordinates[1]], geojson[index].properties.zoom || 13);
        } else {
            map.setView([geojson[index].geometry.coordinates[0], geojson[index].geometry.coordinates[1]], geojson[index].properties.zoom || 12);
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
            return y < (memo - buffer) ? setActive(index, true) : false;
        });

        // If no section was set active the user has scrolled past the last section.
        // Set the last section active.
        if (!active) setActive(sections.length - 1, true);
    }).debounce(10);

    // Set map to first section.
    setActive(0, false);


});
