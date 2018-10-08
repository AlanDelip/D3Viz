const d3 = require('d3');
import L from 'leaflet';
import chroma from 'chroma-js';

let data = [];

// init position in the airport of Las Vegas
let map = L.map('leaflet-map').setView([36.085273, -115.148976], 14);

// connect to mapbox data
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYWxhbmRlbGlwIiwiYSI6ImNqbXpibXh1ajB1a2wzcWxyaWM3d2p0NWUifQ.92kYDOA_t_Wv6FgDhaqyQA'
}).addTo(map);

// init map and d3
let svg = d3.select(map.getPanes().overlayPane).append("svg").attr("width", map.getSize().x).attr("height", 900);
let g = svg.append("g").attr("class", "leaflet-zoom-hide");

// load and process data
d3.json("las_vegas_airport.json").then(res => {
	Object.keys(res).forEach(k => {
		let restaurant = res[k];
		data.push({
			name: restaurant.name,
			latitude: restaurant.latitude,
			longitude: restaurant.longitude,
			stars: restaurant.stars,
			review_count: restaurant.review_count,
			LatLng: new L.LatLng(restaurant.latitude, restaurant.longitude)
		});
	});

	// map colors
	let star_color = chroma.scale(['grey', 'steelblue', 'red'])
		.domain([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);

	// map sizes
	let count_size = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.review_count)])
		.range([5, 15]);

	let points = g.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.style("opacity", .75)
		.style("fill", d => star_color(d.stars))
		.attr("r", d => 0);

	points.transition()
		.delay((d, i) => i)
		.attr("r", d => count_size(d.review_count));

	map.on("zoom", () => {
		update(points)
	});

	// init points position
	update(points);
});

function update(points) {
	points.attr("transform",
		d => {
			return `translate(${map.latLngToLayerPoint(d.LatLng).x},${map.latLngToLayerPoint(d.LatLng).y})`;
		})
}