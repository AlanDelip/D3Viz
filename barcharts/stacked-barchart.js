const d3 = require('d3');

let n = 4, // The number of series.
	m = 30; // The number of values per series.

// The xz array has m elements, representing the x-values shared by all series.
// The yz array has n elements, representing the y-values of each of the n series.
// Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
// The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
let xz = d3.range(m),
	yz = d3.range(n).map(() => bumps(m)),
	y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
	yMax = d3.max(yz, y => d3.max(y)),					// max of y value in one series
	y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));	// max of stacked value

let svg = d3.select("#stacked-barchart"),
	margin = {top: 40, right: 20, bottom: 20, left: 20},
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom;

let g = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleBand()
	.domain(xz)
	.rangeRound([0, width])
	.padding(0.1);

let y = d3.scaleLinear()
	.domain([0, y1Max])
	.range([height, 0]);

// mapping series to colors
let color = d3.scaleOrdinal()
	.domain(d3.range(n))
	.range(d3.schemePaired);

let series = g.selectAll(".series")
	.data(y01z)
	.enter().append("g")
	.attr("fill", (d, i) => color(i));

let rect = series.selectAll("rect")
	.data(d => d)
	.enter().append("rect")
	.attr("x", (d, i) => x(i))
	.attr("y", height)
	.attr("width", x.bandwidth())
	.attr("height", 0);

rect.transition()
	.delay((d, i) => i * 10)
	.attr("y", d => y(d[1]))
	.attr("height", d => y(d[0]) - y(d[1]));

g.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
function bumps(m) {
	let values = [], i, j, w, x, y, z;

	// Initialize with uniform random values in [0.1, 0.2).
	for (i = 0; i < m; ++i) {
		values[i] = 0.1 + 0.1 * Math.random();
	}

	// Add five random bumps.
	for (j = 0; j < 5; ++j) {
		x = 1 / (0.1 + Math.random());
		y = 2 * Math.random() - 0.5;
		z = 10 / (0.1 + Math.random());
		for (i = 0; i < m; i++) {
			w = (i / m - y) * z;
			values[i] += x * Math.exp(-w * w);
		}
	}

	// Ensure all values are positive.
	for (i = 0; i < m; ++i) {
		values[i] = Math.max(0, values[i]);
	}

	return values;
}