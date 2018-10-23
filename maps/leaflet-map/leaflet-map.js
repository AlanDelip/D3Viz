const d3 = require('d3');
const shades = require('leaflet-shades');
import L from 'leaflet';
import chroma from 'chroma-js';

// Las Vegas city data
let data = [];

// init position in the airport of Las Vegas
let map = L.map('leaflet-map', {editable: true}).setView([36.161778, -115.173107], 12);

// connect to mapbox data
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYWxhbmRlbGlwIiwiYSI6ImNqbXpibXh1ajB1a2wzcWxyaWM3d2p0NWUifQ.92kYDOA_t_Wv6FgDhaqyQA'
}).addTo(map);

// init map and d3
let svg = d3.select(map.getPanes().overlayPane).append("svg").attr("width", document.getElementById("leaflet-map").offsetWidth).attr("height", document.getElementById("leaflet-map").offsetHeight);
let g = svg.append("g").attr("class", "leaflet-zoom-hide");
let analysisSvg = d3.select("#analysis-bar-chart").append("svg").attr("width", document.getElementById("analysis-bar-chart").offsetWidth).attr("height", document.getElementById("analysis-bar-chart").offsetHeight);
let overallSvg = d3.select("#overall-bar-chart").append("svg").attr("width", document.getElementById("overall-bar-chart").offsetWidth).attr("height", document.getElementById("overall-bar-chart").offsetHeight);
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
// https://raw.githubusercontent.com/AlanDelip/D3Viz/master/data/las_vegas_airport.json
d3.json("https://raw.githubusercontent.com/AlanDelip/D3Viz/master/data/las_vegas.json").then(res => {
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

	initData();

	map.on("zoomend", e => {
		update(points, e.target.getZoom());
		update(selectedPoints, e.target.getZoom());
	});

	renderOverallAnalysis();
});

function initData() {
	// map sizes
	count_size = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.review_count)])
		.range([3, 10]);

	points = g.selectAll("circle")
		.data(data)
		.enter().append("circle")
		.style("fill", d => star_color(d.stars))
		.attr("r", d => 0);

	// init points position
	update(points, map.getZoom());

	// add color legend
	let legendData = [{star: 1}, {star: 1.5}, {star: 2}, {star: 2.5}, {star: 3}, {star: 3.5}, {star: 4}, {star: 4.5}, {star: 5}];
	for (let legend of legendData) {
		legend.color = star_color(legend.star);
	}
	let legendSvg = d3.select("#legend").append("svg");
	let legend = legendSvg.append("g")
		.selectAll("g")
		.data(legendData)
		.enter().append("g")
		.attr("transform", (d, i) => `translate(${i * 16},0)`);

	legend.append("rect")
		.attr("width", 15)
		.attr("height", 15)
		.attr("fill", d => d.color);

	legend.append("text")
		.style("font-size", ".85em")
		.attr("x", 3)
		.attr("y", 30)
		.text(d => {
			if (d.star in [1, 2, 3, 4, 5, 6]) {
				return d.star;
			} else {
				return "";
			}
		});

	// add size legend
	let sizeData = [];
	let min = d3.min(data, d => d.review_count), max = d3.max(data, d => d.review_count);
	sizeData.push(
		{count: min, size: count_size(min)},
		{count: (max + min) / 2, size: count_size((max + min) / 2)},
		{count: max, size: count_size(max)});
	let sizeLegendSvg = d3.select("#size-legend").append("svg");
	let sizeLegend = sizeLegendSvg.append("g")
		.selectAll("g")
		.data(sizeData)
		.enter().append("g")
		.attr("transform", (d, i) => `translate(${i * 45 + 10},10)`);

	sizeLegend.append("circle")
		.attr("r", d => d.size)
		.attr("fill", "#6baed6");

	sizeLegend.append("text")
		.style("font-size", ".85em")
		.attr("x", 0)
		.attr("y", 30)
		.attr("text-anchor", "middle")
		.text(d => d.count);

	document.getElementById("loading-mask").classList.add("transparent");
}

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
		.style("fill", d => star_color_selected(d.stars))
		.attr("r", 0);

	update(selectedPoints, map.getZoom());
	renderSelectedAnalysis(filteredData);
	document.getElementById("side-panel").classList.remove("hidden");
}

function renderOverallAnalysis() {
	overallSvg.selectAll("g").remove();
	overallSvg.selectAll("line").remove();
	overallSvg.selectAll("text").remove();

	let margin = ({top: 20, right: 20, bottom: 30, left: 40});
	let width = overallSvg.attr("width");
	let height = overallSvg.attr("height");

	let starData = [
		{star: 1, count: 0},
		{star: 1.5, count: 0},
		{star: 2, count: 0},
		{star: 2.5, count: 0},
		{star: 3, count: 0},
		{star: 3.5, count: 0},
		{star: 4, count: 0},
		{star: 4.5, count: 0},
		{star: 5, count: 0}
	];

	data.forEach(data => {
		for (let singleData of starData) {
			if (singleData.star === data.stars) {
				singleData.count++;
			}
		}
	});

	let x = d3.scaleBand()
		.domain(starData.map(d => d.star))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	let x_linear = d3.scaleLinear()
		.domain([0, d3.max(starData, d => d.star)])
		.range([margin.left, width - margin.right]);

	let y = d3.scaleLinear()
		.domain([0, d3.max(starData, d => d.count)])
		.range([height - margin.bottom, margin.top + 15]);

	let xAxis = g => g
		.attr("class", "axisWhite")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).tickSizeOuter(0));

	let yAxis = g => g
		.attr("class", "axisWhite")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y).tickSize(10).tickSizeOuter(0))
		.call(g => g.select(".domain").remove());

	overallSvg.append("g")
		.call(xAxis);

	overallSvg.append("g")
		.call(yAxis);

	let bars =
		overallSvg.append("g")
			.attr("fill", "#6baed6")
			.selectAll("rect").data(starData).enter()
			.append("rect")
			.attr("x", d => x(d.star) + x.bandwidth() / 4)
			.attr("y", d => y(d.count))
			.attr("height", 0)
			.attr("width", x.bandwidth() / 2);

	bars.transition()
		.delay((d, i) => i * 50)
		.attr("height", d => y(0) - y(d.count));

	let texts =
		overallSvg.append("g")
			.attr("fill", "white")
			.attr("text-anchor", "middle")
			.selectAll("text").data(starData).enter()
			.append("text")
			.attr("x", d => x(d.star) + x.bandwidth() / 2)
			.attr("y", 0)
			.text(d => d.count);

	texts.transition()
		.delay((d, i) => i * 50)
		.attr("y", d => y(d.count) - 5);

	let star_sum = 0;
	let star_count = 0;
	starData.forEach(d => {
		star_sum += d.count * d.star;
		star_count += d.count;
	});
	let ave_city_data = parseFloat(d3.format(".3f")(star_sum / star_count));

	let ave_line =
		overallSvg.append("line")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("stroke-dasharray", 10)
			.attr("x1", x_linear(ave_city_data))
			.attr("x2", x_linear(ave_city_data))
			.attr("y1", margin.top)
			.attr("y2", margin.top);

	ave_line.transition()
		.duration(1000)
		.attr("y2", height - margin.bottom);

	overallSvg.append("text")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
		.style("font", "12px sans-serif")
		.attr("x", x_linear(ave_city_data))
		.attr("y", margin.top - 10)
		.text(`average: ${ave_city_data}`);

	overallSvg.append("text")
		.attr("fill", "white")
		.attr("y", margin.top - 5)
		.attr("x", 0)
		.text("Count of Stars");

	overallSvg.append("text")
		.attr("text-anchor", "end")
		.attr("fill", "white")
		.attr("y", height - margin.bottom + 15)
		.attr("x", width)
		.text("Stars");
}

function renderSelectedAnalysis(filteredData) {
	analysisSvg.selectAll("g").remove();
	analysisSvg.selectAll("line").remove();
	analysisSvg.selectAll("text").remove();

	let margin = ({top: 20, right: 20, bottom: 30, left: 40});
	let width = analysisSvg.attr("width");
	let height = analysisSvg.attr("height");

	let starData = [
		{star: 1, count: 0},
		{star: 1.5, count: 0},
		{star: 2, count: 0},
		{star: 2.5, count: 0},
		{star: 3, count: 0},
		{star: 3.5, count: 0},
		{star: 4, count: 0},
		{star: 4.5, count: 0},
		{star: 5, count: 0}
	];

	filteredData.forEach(data => {
		for (let singleData of starData) {
			if (singleData.star === data.stars) {
				singleData.count++;
			}
		}
	});

	let x = d3.scaleBand()
		.domain(starData.map(d => d.star))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	let x_linear = d3.scaleLinear()
		.domain([0, d3.max(starData, d => d.star)])
		.range([margin.left, width - margin.right]);

	let y = d3.scaleLinear()
		.domain([0, d3.max(starData, d => d.count)])
		.range([height - margin.bottom, margin.top + 15]);

	let xAxis = g => g
		.attr("class", "axisWhite")
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).tickSizeOuter(0));

	let yAxis = g => g
		.attr("class", "axisWhite")
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y).tickSize(10).tickSizeOuter(0))
		.call(g => g.select(".domain").remove());

	analysisSvg.append("g")
		.call(xAxis);

	analysisSvg.append("g")
		.call(yAxis);

	let bars =
		analysisSvg.append("g")
			.attr("fill", "#fd8d3c")
			.selectAll("rect").data(starData).enter()
			.append("rect")
			.attr("x", d => x(d.star) + x.bandwidth() / 4)
			.attr("y", d => y(d.count))
			.attr("height", 0)
			.attr("width", x.bandwidth() / 2);

	bars.transition()
		.delay((d, i) => i * 50)
		.attr("height", d => y(0) - y(d.count));

	let texts =
		analysisSvg.append("g")
			.attr("fill", "white")
			.attr("text-anchor", "middle")
			.selectAll("text").data(starData).enter()
			.append("text")
			.attr("x", d => x(d.star) + x.bandwidth() / 2)
			.attr("y", 0)
			.text(d => d.count);

	texts.transition()
		.delay((d, i) => i * 50)
		.attr("y", d => y(d.count) - 5);

	let star_sum = 0;
	let star_count = 0;
	starData.forEach(d => {
		star_sum += d.count * d.star;
		star_count += d.count;
	});
	let ave_city_data = parseFloat(d3.format(".3f")(star_sum / star_count));

	let ave_line =
		analysisSvg.append("line")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("stroke-dasharray", 10)
			.attr("x1", x_linear(ave_city_data))
			.attr("x2", x_linear(ave_city_data))
			.attr("y1", margin.top)
			.attr("y2", margin.top);

	ave_line.transition()
		.duration(1000)
		.attr("y2", height - margin.bottom);

	analysisSvg.append("text")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
		.style("font", "12px sans-serif")
		.attr("x", x_linear(ave_city_data))
		.attr("y", margin.top - 10)
		.text(`average: ${ave_city_data}`);

	analysisSvg.append("text")
		.attr("fill", "white")
		.attr("y", margin.top - 5)
		.attr("x", 0)
		.text("Count of Stars");

	analysisSvg.append("text")
		.attr("text-anchor", "end")
		.attr("fill", "white")
		.attr("y", height - margin.bottom + 15)
		.attr("x", width)
		.text("Stars");
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
		selectedPoints.transition().delay((d, i) => i / 2).remove();
	}
	document.getElementById("side-panel").classList.add("hidden");
}