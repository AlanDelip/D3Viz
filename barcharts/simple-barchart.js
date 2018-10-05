let d3 = require('d3');
import {cate_cont} from '../data/xy-data'

// clean/analyze/convert the data
let data = cate_cont
	.slice()
	.sort((a, b) => b.frequency - a.frequency)
	.map(({letter, frequency}) => ({name: letter, value: frequency}));

// define svg work zone and its appearance (width, height, margin, padding)
let svg = d3.select("#simple-barchart");
let margin = {top: 20, right: 0, bottom: 30, left: 40};
let height = svg.attr("height"), width = svg.attr("width");

// mapping function
// for a xy-coordinate, we should have x() and y() mapping functions. Each contains a domain and a mapping range.
let x = d3.scaleBand()
	// scaleBand() used for building up bands with averaged width and padding
	// in this case, we are mapping ordinal domains to a continuous range
	.domain(data.map(d => d.name))
	.range([margin.left, width - margin.right])
	.padding(0.1);

let y = d3.scaleLinear()
	.domain([0, d3.max(data, d => d.value)]).nice()
	.range([height - margin.bottom, margin.top]);

// configurations of axis
let xAxis = g => g
	// small tweaks because of margin
	.attr("transform", `translate(0,${height - margin.bottom})`)
	// Invokes the specified function exactly once, passing in this selection along with any optional arguments.
	// Returns this selection. This is equivalent to invoking the function by hand but facilitates method chaining.
	.call(d3.axisBottom(x).tickSizeOuter(0));

let yAxis = g => g
	.attr("transform", `translate(${margin.left},0)`)
	.call(d3.axisLeft(y).tickSize(10).tickSizeOuter(0))
	// .domain means axis here, not including ticks
	.call(g => g.select(".domain").remove());

// add axis
svg.append("g")
	.call(xAxis);
svg.append("g")
	.call(yAxis);

// map real data to rect
svg.append("g")
	.attr("fill", "#4285f4")
	.selectAll("rect").data(data).enter().append("rect")
	// map x using x() from category/value to coordinates
	.attr("x", d => x(d.name))
	.attr("y", d => y(d.value))
	// mapping of y: the top of the rect is the start of y.
	.attr("height", d => y(0) - y(d.value))
	// calculated bandwidth
	.attr("width", x.bandwidth());
