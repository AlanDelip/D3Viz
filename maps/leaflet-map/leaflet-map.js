const d3 = require('d3');
const shades = require('leaflet-shades');
import L from 'leaflet';
import chroma from 'chroma-js';
import introJs from 'intro.js';

/**************************Landing page**************************/
export function gotoIntuition() {
	d3.select('#landing-page').attr("class", "full-page leave");

	setTimeout(() => {
		d3.select('#intuition-page').style("display", "block");
		loadIntuition();
	}, 1000);
}


/**************************Intuition page**************************/
export function gotoValidation() {
	d3.select('#intuition-page').attr("class", "full-page leave");
	svg.remove();
	map.remove();

	setTimeout(() => {
		d3.select('#validation-page').style("display", "block");
		loadValidation();
	}, 1000);
}

// Las Vegas city data
let data = [];
let filteredData = [];
let map;
let svg;
let g;
let analysisSvg;
let overallSvg;
let count_size;
let points;
let selectedPoints;
let selectedPane;
let rect;
let star_color = chroma.scale(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'])
	.domain([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
let star_color_selected = chroma.scale(['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'])
	.domain([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);

function loadIntuition() {
	// load and process data
	d3.json("https://raw.githubusercontent.com/AlanDelip/D3Viz/master/data/las_vegas.json").then(res => {
		Object.keys(res).forEach(k => {
			let restaurant = res[k];
			if (restaurant.price_range) {
				data.push({
					name: restaurant.name,
					latitude: restaurant.latitude,
					longitude: restaurant.longitude,
					stars: restaurant.stars,
					review_count: restaurant.review_count,
					LatLng: new L.LatLng(restaurant.latitude, restaurant.longitude),
					price_range: restaurant.price_range
				});
			}
		});

		initMap();
		initData();

		map.on("zoomend", e => {
			update(points, e.target.getZoom());
			update(selectedPoints, e.target.getZoom());
		});

		let guide = introJs();
		guide.setOptions({
			steps: [
				{
					intro: "This is the map of Las Vegas with dots representing restaurant ratings."
				},
				{
					element: "#select-area",
					intro: "You can drag and select an area that you want to explore and see what the ratings are going on there.",
					position: "right"
				},
				{
					element: "#clear-area",
					intro: "You can reset your selection using this button or press 'ESC' key in your keyboard.",
					position: "right"
				},
				{
					intro: "Now try to drag and select the area of McCarran International Airport in Las Vegas."
				}
			]
		}).oncomplete(() => {
			map.setView([36.085273, -115.148976], 14);
		});
		guide.start();

		renderAnalysisBarChart(data, overallSvg, "#6baed6", "white", "white", true);
	});
}

function initMap() {
	// init position in the airport of Las Vegas
	map = L.map('leaflet-map', {editable: true}).setView([36.1, -115.173107], 12);

	// connect to mapbox data
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiYWxhbmRlbGlwIiwiYSI6ImNqbXpibXh1ajB1a2wzcWxyaWM3d2p0NWUifQ.92kYDOA_t_Wv6FgDhaqyQA'
	}).addTo(map);

	// init map and d3
	svg = d3.select(map.getPanes().overlayPane).append("svg").attr("width", document.getElementById("leaflet-map").offsetWidth).attr("height", document.getElementById("leaflet-map").offsetHeight);
	g = svg.append("g").attr("class", "leaflet-zoom-hide");
	analysisSvg = d3.select("#analysis-bar-chart").append("svg").attr("width", document.getElementById("analysis-bar-chart").offsetWidth).attr("height", document.getElementById("analysis-bar-chart").offsetHeight);
	overallSvg = d3.select("#overall-bar-chart").append("svg").attr("width", document.getElementById("overall-bar-chart").offsetWidth).attr("height", document.getElementById("overall-bar-chart").offsetHeight);
	selectedPane = svg.append("g").attr("class", "leaflet-zoom-hide");
}

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
		{count: parseInt((max + min) / 2, 0), size: count_size((max + min) / 2)},
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
	filteredData = data.filter(restaurant =>
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
	renderAnalysisBarChart(filteredData, analysisSvg, "#fd8d3c", "white", "white", true);
	document.getElementById("side-panel").classList.remove("hidden");
}

function renderAnalysisBarChart(data, svgContainer, barColor, lineColor, textColor, renderAxis) {
	svgContainer.selectAll("g").remove();
	svgContainer.selectAll("line").remove();
	svgContainer.selectAll("text").remove();

	let margin = ({top: 20, right: 20, bottom: 30, left: 40});
	let width = svgContainer.attr("width");
	let height = svgContainer.attr("height");

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
		.domain([1, d3.max(starData, d => d.star)])
		.range([margin.left, width - margin.right]);

	let y = d3.scaleLinear()
		.domain([0, d3.max(starData, d => d.count)])
		.range([height - margin.bottom, margin.top + 15]);

	if (renderAxis) {
		let xAxis = g => g
			.attr("class", "axisWhite")
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x).tickSizeOuter(0));

		let yAxis = g => g
			.attr("class", "axisWhite")
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y).tickSize(10).tickSizeOuter(0))
			.call(g => g.select(".domain").remove());

		svgContainer.append("g")
			.call(xAxis);

		svgContainer.append("g")
			.call(yAxis);
	}

	let bars =
		svgContainer.append("g")
			.attr("fill", barColor)
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
		svgContainer.append("g")
			.attr("fill", textColor)
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
		svgContainer.append("line")
			.attr("stroke", lineColor)
			.attr("stroke-width", 3)
			.attr("stroke-dasharray", 10)
			.attr("x1", x_linear(ave_city_data))
			.attr("x2", x_linear(ave_city_data))
			.attr("y1", margin.top)
			.attr("y2", margin.top);

	ave_line.transition()
		.duration(1000)
		.attr("y2", height - margin.bottom);

	svgContainer.append("text")
		.attr("fill", textColor)
		.attr("text-anchor", "middle")
		.style("font", "12px sans-serif")
		.attr("x", x_linear(ave_city_data))
		.attr("y", margin.top - 10)
		.text(`average: ${ave_city_data}`);

	svgContainer.append("text")
		.attr("fill", textColor)
		.attr("y", margin.top - 5)
		.attr("x", 0)
		.text("Count of Stars");

	svgContainer.append("text")
		.attr("text-anchor", "end")
		.attr("fill", textColor)
		.attr("y", height - margin.bottom + 15)
		.attr("x", width)
		.text("Stars");

	return {bars, x: x_linear, y, margin, height, width};
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
		selectedPoints.remove();
	}
	document.getElementById("side-panel").classList.add("hidden");
}


/**************************Validation page**************************/
let validationSelectedSvg, validationOverallSvg, distributionSvg, overallBars, selectedBars;

function loadValidation() {
	validationSelectedSvg = d3.select("#selected-validation-barchart").append("svg").attr("width", document.getElementById("selected-validation-barchart").offsetWidth).attr("height", document.getElementById("selected-validation-barchart").offsetHeight);
	validationOverallSvg = d3.select("#overall-validation-barchart").append("svg").attr("width", document.getElementById("overall-validation-barchart").offsetWidth).attr("height", document.getElementById("overall-validation-barchart").offsetHeight);
	overallBars = renderAnalysisBarChart(data, validationOverallSvg, "#6baed6", "#7b7373", "#7b7373");
	selectedBars = renderAnalysisBarChart(filteredData, validationSelectedSvg, "#fd8d3c", "#7b7373", "#7b7373");
	distributionSvg = d3.select("#distribution-chart").append("svg").attr("width", document.getElementById("distribution-chart").offsetWidth).attr("height", document.getElementById("distribution-chart").offsetHeight);
	initDistribution();

	let guide = introJs();
	guide.setOptions({
		steps: [
			{
				intro: "Click 'Map distribution' to see whether a price factor causes the difference in distribution."
			}
		]
	});
	guide.start();
}

function initDistribution() {
	let margin = ({top: 40, right: 40, bottom: 40, left: 40});
	let width = distributionSvg.attr("width");
	let height = distributionSvg.attr("height");
	let x = d3.scaleLinear().domain([1, 5]).range([margin.left + 30, width - margin.right - 30]);
	let y = d3.scaleLinear().domain([1, 4]).range([height - margin.bottom - 30, margin.top + 30]);

	let xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x).tickSize(4));

	let yAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y).ticks(4).tickSize(4));

	distributionSvg.append("g")
		.call(xAxis);

	distributionSvg.append("g")
		.call(yAxis);

	distributionSvg.append("text")
		.attr("y", margin.top - 5)
		.attr("x", 0)
		.text("Price Range");

	distributionSvg.append("text")
		.attr("text-anchor", "end")
		.attr("y", height)
		.attr("x", width)
		.text("Stars");

	initDistributionLegend();
}

function initDistributionLegend() {
	let sizeData = [];
	sizeData.push(
		{name: "min", size: 3},
		{name: "max", size: 20});
	let sizeLegendSvg = d3.select("#distribution-size-legend").append("svg");
	let sizeLegend = sizeLegendSvg.append("g")
		.selectAll("g")
		.data(sizeData)
		.enter().append("g")
		.attr("transform", (d, i) => `translate(${i * 45 + 10},25)`);

	sizeLegend.append("circle")
		.attr("r", d => d.size)
		.attr("fill", "#6baed6");

	sizeLegend.append("text")
		.style("font-size", ".85em")
		.attr("x", 0)
		.attr("y", 30)
		.attr("text-anchor", "middle")
		.text(d => d.name);
}

let finished = [false, false];

export function fillOverall() {
	if (!finished[0]) {
		fillDistribution(distributionSvg, data, overallBars, 0.6, "#6baed6");
		finished[0] = true;
		checkConclusion();
	}
}

export function fillSelected() {
	if (!finished[1]) {
		fillDistribution(distributionSvg, filteredData, selectedBars, .9, "#fd8d3c");
		finished[1] = true;
		checkConclusion();
	}
}

function checkConclusion() {
	if (finished.reduce((a, b) => a && b)) {
		setTimeout(() => {
			d3.select("#validation-chart-container").attr("class", "validation-chart-container slide-left");
			d3.select("#conclusion-container").attr("class", "conclusion-container slide-left");
		}, 600);
	}
}

function fillDistribution(svg, data, linkedBarConfig, opacity, color) {
	let margin = ({top: 40, right: 40, bottom: 40, left: 40});
	let width = svg.attr("width");
	let height = svg.attr("height");
	let initData = [];
	let stars = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
	let price_ranges = [1, 2, 3, 4];
	for (let star of stars) {
		for (let range of price_ranges) {
			initData.push({star: star, price_range: range, count: 0});
		}
	}
	data.forEach(d => {
		let star = d.stars;
		let count = d.review_count;
		let price_range = d.price_range;
		initData.forEach(c => {
			if (c.star == star && c.price_range == price_range) {
				c.count += count;
			}
		})
	});

	let x = d3.scaleLinear().domain([1, 5]).range([margin.left + 30, width - margin.right - 30]);
	let y = d3.scaleLinear().domain([1, 4]).range([height - margin.bottom - 30, margin.top + 30]);
	let r = d3.scaleLinear().domain([1, d3.max(initData, d => d.count)]).range([3, 20]);

	linkedBarConfig.bars.transition()
		.delay((d, i) => i * 30)
		.attr("y", linkedBarConfig.height - linkedBarConfig.margin.top)
		.attr("height", 0);

	let circle = svg
		.append("g")
		.attr("opacity", opacity)
		.selectAll("circle").data(initData).enter()
		.append("circle")
		.style("fill", color)
		.attr("cx", 300)
		.attr("cy", 0)
		.attr("r", d => r(d.count));

	circle.transition()
		.delay((d, i) => i * 15)
		.attr("cx", d => x(d.star))
		.attr("cy", d => y(d.price_range));
}