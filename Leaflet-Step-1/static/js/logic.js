// get earthquake data
let strURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// define array to hold circles
let arrCir = [];

// GRAB DATA
d3.json(strURL).then(function(jsonObj){
	// define array of "Features" (Quake objects)
	let arrQuake = jsonObj.features;
	console.log('arrQuake:');
	console.log(arrQuake);
	
	// define high and low quake magnitudes
	let fltHi = 0;
	let fltLo = 1000000;
	
	// iterate thru Quakes #1: get high and low quake magnitudes
	arrQuake.forEach(objQuake=>{
		let fltMag = objQuake.properties.mag;
		if(typeof fltMag == "number"){
			fltHi = d3.max([fltHi, fltMag]);
			fltLo = d3.min([fltLo, fltMag]);
		}
	});
	console.log('lo to hi: ' + fltLo + " to " + fltHi);
	
	// define green-to-yellow-to-red color array
	let arrCol = ["#008000", "#9ACD32", "#FFFF00",	"#FFA500", "#FF4500"];

	// iterate thru Quakes #2: populate Circle array
	arrQuake.forEach(objQuake=>{
		// create vars for Magnitude, Latitude, Longitude, Place
		let fltMag = objQuake.properties.mag;
		let fltLat = objQuake.geometry.coordinates[1]; // Lat comes second, ugh
		let fltLng = objQuake.geometry.coordinates[0]; // Lng comes first, ugh
		let strPlace = objQuake.properties.place;
		// confirm we got numbers
		if(typeof fltLat=="number" && typeof fltLng=="number" && typeof fltMag=="number"){
			// define size, 0 to 4. tried scaleLinear() and couldn't get it working right
			let intSize = 4 - parseInt((fltHi - fltMag) / (fltHi - fltLo) * 4)
			// populate array of Leaflet circles
			arrCir.push(
				L.circle([fltLat, fltLng], {
					stroke: true,
					fillOpacity: 0.9,
					color: "#000000",
					fillColor: arrCol[intSize],
					radius: (intSize + 1) / 6 *
									1000000 * 
									(1 - Math.abs(fltLat) / 110), // adjust for Mercator Projection! shrink circles further from equator
					title: fltMag
				})
				.bindPopup(`<h2>${strPlace}<br/>(${fltLat}, ${fltLng})<hr>Magnitude ${fltMag}</h2>`)
			)
		}	
	});
	console.log('arrCir:');
	console.log(arrCir);

	// create base layers
	let lgQuake = L.layerGroup(arrCir);

	// light map tiles
	let tlLight = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.light",
		accessToken: API_KEY
	});

	// satellite map tiles
	let tlSatellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.satellite",
		accessToken: API_KEY
	});

	// wheatpaste tiles
	let tlWheatpaste = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.wheatpaste",
		accessToken: API_KEY
	});

	// create Base layer. add tile layers
	let layrBase = {
		Light: tlLight,
		Satellite: tlSatellite,
		Wheatpaste: tlWheatpaste
	};

	// create Overlay layer. add Quake and Epicenter layer groups
	let layrOverlay = {
		Earthquakes: lgQuake
	};

	// set map defaults: Light tile layer plus Quake layer group
	let map = L.map("map", {
		center: [20, 0],
		zoom: 3,
		layers: [tlLight, lgQuake]
	});

	// add Base and Overlay layers to map (with uncollapsed control)
	L.control.layers(layrBase, layrOverlay, {
		collapsed: false
	}).addTo(map);
	
	let legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {
		let div = L.DomUtil.create('div', 'info legend');
		let labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (let i = 0; i < arrCol.length; i++) {
			div.innerHTML +=
				'<i style="background:' + arrCol[i] + '"></i> ' +
				`${(fltLo + i / 5 * (fltHi - fltLo)).toFixed(2)} - ${(fltLo + (i + 1) / 5 * (fltHi - fltLo)).toFixed(2)}<br/>`;
		}

		return div;
	};

	legend.addTo(map);
});