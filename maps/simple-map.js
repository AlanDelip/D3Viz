const d3 = require('d3');
const topojson = require("topojson-client");

let svg = d3.select("#simple-map");
let path = d3.geoPath();
let defs = svg.select("defs");
let width = svg.attr("width"), height = svg.attr("height");

d3.json("https://unpkg.com/us-atlas@1/us/10m.json").then(us => {
	defs.append("path")
		.attr("id", "nation")
		.attr("d", path(topojson.feature(us, us.objects.nation)));

	svg.append("use")
		.attr("xlink:href", "#nation")
		.attr("fill-opacity", 0.2)
		.attr("filter", "url(#blur)");

	svg.append("use")
		.attr("xlink:href", "#nation")
		.attr("fill", "#fff");

	svg.append("path")
		.attr("fill", "none")
		.attr("stroke", "#777")
		.attr("stroke-width", 0.35)
		.attr("d", path(topojson.mesh(us, us.objects.counties, function (a, b) {
			return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0);
		})));

	svg.append("path")
		.attr("fill", "none")
		.attr("stroke", "#777")
		.attr("stroke-width", 0.70)
		.attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
			return a !== b;
		})));

});