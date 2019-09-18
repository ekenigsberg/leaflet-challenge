# leaflet-challenge (BootCampHomework 14, due 2019-09-18)
[JavaScript](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/static/js/logic.js), [CSS](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/static/css/style.css), and [HTML](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/index.html) solutions<br/>
to<br/>
[Data Analytics Boot Camp Homework #14](https://github.com/the-Coding-Boot-Camp-at-UT/UTAMCB201904DATA3/blob/master/17-Mapping-Web/Homework/Instructions/README.md)

# Screenshot: Earthquake Mapping
![Screenshot](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/Images/screenshot1.png)

# Technical Insights
* It was nice to learn that markers aren't needed. The `.bindPopup()` method can add pop-ups directly to a shape.
* I didn't get `scaleLinear()` working quite right (can it map from continuous numbers to discrete colors? not sure), so I just did a math transform and left it at that.
* It was pleasantly surprising to discover GitHub automatically creates [a reasonably passable map, with markers and popups, from a raw JSON file](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/static/js/quakes.json).
* I didn't implement the bonus assignment, but I've got one snazzy legend (implemented from the [choropleth example on the Leaflet site](https://leafletjs.com/examples/choropleth/#custom-legend-control)).
* The Wheatpaste tile layer is always good for a laugh.<br/>
![Wheatpaste Screenshot](https://github.com/ekenigsberg/leaflet-challenge/blob/master/Leaflet-Step-1/Images/screenshot2.png)
