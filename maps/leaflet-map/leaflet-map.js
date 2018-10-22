const d3 = require('d3');
const shades = require('leaflet-shades');
import L from 'leaflet';
import chroma from 'chroma-js';

// Las Vegas city data
let data = [];

// init position in the airport of Las Vegas
let map = L.map('leaflet-map', {editable: true}).setView([36.085273, -115.148976], 14);

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
let analysisG = d3.select("#analysis-bar-chart").append("svg").attr("height", 300).append("g");
let count_size;
let points;
let selectedPoints;
let selectedPane = svg.append("g").attr("class", "leaflet-zoom-hide");
let rect;
let star_color = chroma.scale(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'])
	.domain([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
let star_color_selected = chroma.scale(['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'])
	.domain([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);

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

	// map sizes
	count_size = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.review_count)])
		.range([4, 10]);

	points = g.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.style("opacity", .85)
		.style("fill", d => star_color(d.stars))
		.attr("r", d => 0);

	points.transition()
		.delay((d, i) => i)
		.attr("r", d => count_size(d.review_count));

	// init points position
	update(points, map.getZoom());

	map.on("zoom", e => {
		update(points, e.target.getZoom());
		update(selectedPoints, e.target.getZoom());
	});
});

function update(points, level) {
	if (points != null) {
		points.attr("transform", d => `translate(${map.latLngToLayerPoint(d.LatLng).x},${map.latLngToLayerPoint(d.LatLng).y})`)
			.attr("r", d => 1 / 14 * level * count_size(d.review_count));
	}
}

function filterData(topLeft, bottomRight) {
	let filteredData = data.filter(restaurant =>
		restaurant.latitude <= topLeft.lat &&
		restaurant.latitude >= bottomRight.lat &&
		restaurant.longitude <= topLeft.lng &&
		restaurant.longitude >= bottomRight.lng
	);

	selectedPane.selectAll("circle").remove();
	selectedPoints = selectedPane.selectAll("circle").data(filteredData)
		.enter().append("circle")
		.style("opacity", .85)
		.style("fill", d => star_color_selected(d.stars))
		.attr("r", d => count_size(d.review_count));

	update(selectedPoints, map.getZoom());
	document.getElementById("side-panel").classList.remove("hidden");
}

export function startRect() {
	reset();
	rect = map.editTools.startRectangle();
	rect.on('editable:vertex:dragend', e => {
		filterData(e.vertex.latlngs[0], e.vertex.latlngs[2]);
	});

	rect.on('mouseup', e => {
		filterData(e.target.getBounds().getNorthEast(), e.target.getBounds().getSouthWest());
	});

	// register for exit event
	document.addEventListener('keyup', e => {
		if (e.keyCode === 27) {
			reset();
		}
	});
}

export function reset() {
	if (rect != null) {
		rect.remove();
	}

	if (selectedPoints != null) {
		selectedPoints.transition().delay((d, i) => i).remove();
	}
	document.getElementById("side-panel").classList.add("hidden");
}