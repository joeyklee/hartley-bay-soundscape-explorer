	
	L.mapbox.accessToken = 'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';
    var map = L.mapbox.map('map', 'mapbox.streets', {
        zoomControl: false,
        center: [ 53.420121,-129.252830 ], // starting position
	    zoom: 9,  // starting zoom,
	    attributionControl:false
    });