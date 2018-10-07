const d3 = require('d3');
import L from 'leaflet';

const locations = [
	{latitude: 36.0803201, longitude: -115.1217779},
	{latitude: 36.083965, longitude: -115.119842}
];

let map = L.map('leaflet-map').setView([36.085273, -115.148976], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYWxhbmRlbGlwIiwiYSI6ImNqbXpibXh1ajB1a2wzcWxyaWM3d2p0NWUifQ.92kYDOA_t_Wv6FgDhaqyQA'
}).addTo(map);

let svg = d3.select(map.getPanes().overlayPane).append("svg").attr("width",900).attr("height",900);
let g = svg.append("g").attr("class", "leaflet-zoom-hide");

// var transform = d3.geoTransform({point: projectPoint});
// function projectPoint(x, y) {
// 	var point = map.latLngToLayerPoint(new L.LatLng(y, x));
// 	this.stream.point(point.x, point.y);
// }

locations.forEach(d => {
	d.LatLng = new L.LatLng(d.latitude, d.longitude);
});

let points = g.selectAll("circle")
	.data(locations)
	.enter().append("circle")
	.style("stroke", "black")
	.style("opacity", .5)
	.style("fill", "red")
	.attr("r", 5);

map.on("viewreset", update);
update();

function update() {
	points.attr("transform",
		function (d) {
			return `translate(${map.latLngToLayerPoint(d.LatLng).x},${map.latLngToLayerPoint(d.LatLng).y})`;
		}
	)
}