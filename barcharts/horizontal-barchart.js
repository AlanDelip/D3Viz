const d3 = require('d3');
import {cate_cont} from "../data/xy-data";

let data = cate_cont
	.map(({letter, frequency}) => ({name: letter, value: frequency}));

// find matched area
let svg = d3.select("#horizontal-barchart");
let width = svg.attr("width"), height = svg.attr("height");
let margin = {top: 20, right: 40, bottom: 30, left: 40};

// mapping functions
let x = d3.scaleLinear()
	.domain([0, d3.max(data, d => d.value)]).nice()
	.range([margin.left, width - margin.right]);

let y = d3.scaleBand()
	.domain(data.map(d => d.name))
	.range([margin.top, height - margin.bottom])
	.padding(0.1);

let xAxis = g => g
	.attr("transform", `translate(0,${margin.top})`)
	.call(d3.axisTop(x))
	.call(g => g.select(".domain").remove());

let yAxis = g => g
	.attr("transform", `translate(${margin.left},0)`)
	.call(d3.axisLeft(y));

svg.append("g")
	.call(xAxis);
svg.append("g")
	.call(yAxis);

svg.append("g")
	.attr("fill", "#4285f4")
	.selectAll("rect").data(data).enter().append("rect")
	.attr("x", x(0))
	.attr("y", d => y(d.name))
	.attr("width", d => x(d.value) - x(0))
	.attr("height", y.bandwidth());

let format = d3.format(".3f");
svg.append("g")
	.attr("fill", "white")
	.attr("text-anchor", "end")
	.style("font", "12px sans-serif")
	.selectAll("text")
	.data(data.filter(d => d.value > 0.008)).enter().append("text")
	.attr("x", d => x(d.value) - 4)
	.attr("y", d => y(d.name) + y.bandwidth() / 2)
	.attr("dy", "0.35em")
	.text(d => format(d.value));

svg.append("g")
	.attr("fill", "black")
	.style("font", "12px sans-serif")
	.selectAll("text")
	.data(data.filter(d => d.value <= 0.008)).enter().append("text")
	.attr("x", d => x(d.value) + 2)
	.attr("y", d => y(d.name) + y.bandwidth() / 2)
	.attr("dy", "0.35em")
	.text(d => format(d.value));