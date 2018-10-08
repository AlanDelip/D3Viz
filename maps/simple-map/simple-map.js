const d3 = require('d3');
const topojson = require("topojson-client");

let svg = d3.select("#simple-map");
let path = d3.geoPath();

d3.json("https://unpkg.com/us-atlas@1/us/10m.json").then(us => {
	svg.append("path")
		.attr("stroke", "#aaa")
		.attr("stroke-width", 0.5)
		.attr("d", path(topojson.mesh(us, us.objects.counties, (a, b) => {
			return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0);
		})));

	svg.append("path")
		.attr("stroke-width", 0.5)
		.attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => {
			return a !== b;
		})));

	svg.append("path")
		.attr("d", path(topojson.feature(us, us.objects.nation)));
});