let d3 = require('d3');
let rawData = [
	{letter: "A", frequency: .08167},
	{letter: "B", frequency: .01492},
	{letter: "C", frequency: .02782},
	{letter: "D", frequency: .04253},
	{letter: "E", frequency: .12702},
	{letter: "F", frequency: .02288},
	{letter: "G", frequency: .02015},
	{letter: "H", frequency: .06094},
	{letter: "I", frequency: .06966},
	{letter: "J", frequency: .00153},
	{letter: "K", frequency: .00772},
	{letter: "L", frequency: .04025},
	{letter: "M", frequency: .02406},
	{letter: "N", frequency: .06749},
	{letter: "O", frequency: .07507},
	{letter: "P", frequency: .01929},
	{letter: "Q", frequency: .00095},
	{letter: "R", frequency: .05987},
	{letter: "S", frequency: .06327},
	{letter: "T", frequency: .09056},
	{letter: "U", frequency: .02758},
	{letter: "V", frequency: .00978},
	{letter: "W", frequency: .02360},
	{letter: "X", frequency: .00150},
	{letter: "Y", frequency: .01974},
	{letter: "Z", frequency: .00074}
];

data = rawData
	.slice()
	.sort((a, b) => b.frequency - a.frequency)
	.map(({letter, frequency}) => ({name: letter, value: frequency}));

let svg = d3.select("svg");
let margin = {top: 20, right: 0, bottom: 30, left: 40};
let height = 500, width = 900;

let x = d3.scaleBand()
	.domain(data.map(d => d.name))
	.range([margin.left, width - margin.right])
	.padding(0.1);

let y = d3.scaleLinear()
	.domain([0, d3.max(data, d => d.value)]).nice()
	.range([height - margin.bottom, margin.top]);

let xAxis = g => g
	.attr("transform", `translate(0,${height - margin.bottom})`)
	.call(d3.axisBottom(x)
		.tickSizeOuter(0));

let yAxis = g => g
	.attr("transform", `translate(${margin.left},0)`)
	.call(d3.axisLeft(y))
	.call(g => g.select(".domain").remove());

svg.append("g")
	.attr("fill", "steelblue")
	.selectAll("rect").data(data).enter().append("rect")
	.attr("x", d => x(d.name))
	.attr("y", d => y(d.value))
	.attr("height", d => y(0) - y(d.value))
	.attr("width", x.bandwidth());

svg.append("g")
	.call(xAxis);

svg.append("g")
	.call(yAxis);
