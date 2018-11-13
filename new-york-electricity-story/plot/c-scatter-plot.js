const d3 = require('d3');

export default class CategoricalScatterPlot {
	constructor(container, data) {
		this.container = container;
		this.data = data;
		this.flatData = [];
		data.forEach(d => {
			d.temp = parseFloat(((d.max_temp + d.min_temp) / 2).toFixed(2));
			if (d.type.length) {
				d.type.forEach((type, index) => {
					this.flatData.push({
						type,
						temp: d.temp,
						max_temp: d.max_temp,
						min_temp: d.min_temp,
						load: d.load,
						desc: d.desc
					})
				});
			} else {
				this.flatData.push({
					type: d.type,
					temp: d.temp,
					max_temp: d.max_temp,
					min_temp: d.min_temp,
					load: d.load,
					desc: d.desc
				})
			}
		});
	}

	static of(container, data) {
		return new CategoricalScatterPlot(container, data);
	}

	draw() {
		let containerDOM = document.getElementById(this.container.substr(1));
		let svg = d3.select(this.container).append("svg")
			.attr("width", containerDOM.offsetWidth)
			.attr("height", containerDOM.offsetHeight);
		let margin = {top: 30, right: 40, bottom: 30, left: 60};
		let height = svg.attr("height"), width = svg.attr("width");
		this.height = height;

		this.x = d3.scaleBand()
			.domain(["high temp", "low temp", "holiday", "event", "weekend", "normal days"])
			.range([margin.left, width - margin.right])
			.padding(1);

		this.y = d3.scaleLinear()
			.domain([d3.min(this.flatData, d => d.load), d3.max(this.flatData, d => d.load)])
			.range([height - margin.bottom, margin.top]);

		let xAxis = g => g
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(this.x).tickSize(4));

		let yAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(this.y).tickSize(4));

		svg.append("g")
			.style("font", "1em Lora")
			.call(xAxis);

		svg.append("g")
			.style("font", ".8em Lora")
			.call(yAxis);

		this.circles = svg.selectAll("circle")
			.data(this.flatData).enter()
			.append("circle")
			.attr("cx", d => {
				if (d.type.indexOf('temp') !== -1) {
					if (d.desc[d.type.indexOf('temp')] === 'high temp') {
						return this.x("high temp");
					} else {
						return this.x("low temp");
					}
				} else if (d.type.indexOf('holiday') !== -1) {
					return this.x("holiday");
				} else if (d.type.indexOf('event') !== -1) {
					return this.x("event");
				} else if (d.type.indexOf('weekend') !== -1) {
					return this.x("weekend");
				} else {
					return this.x("normal days");
				}
			})
			.attr("cy", d => this.y(d.load))
			.attr("r", 0)
			.attr("fill", 'transparent')
			.attr("stroke", d => {
				if (d.type.indexOf('temp') !== -1) {
					if (d.desc[d.type.indexOf('temp')] === 'high temp') {
						return "#fdb02d";
					} else {
						return "#a6e7fd";
					}
				} else if (d.type.indexOf('holiday') !== -1) {
					return "#f5a9b6"
				} else if (d.type.indexOf('event') !== -1) {
					return "#fdfc7f";
				} else if (d.type.indexOf('weekend') !== -1) {
					return "#a1e7a6";
				} else {
					return "#909290";
				}
			});

		this.circles.transition()
			.delay(300)
			.attr("opacity", 1)
			.attr("r", 8);

		let yText = svg.append('text')
			.attr("x", 0)
			.attr("y", margin.top - 5)
			.attr("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Electricity Load (MegaWatt)");

		let xText = svg.append('text')
			.attr("x", width - margin.right)
			.attr("y", height - margin.bottom - 5)
			.attr("text-anchor", "end")
			.style("font-weight", "bold")
			.text("Types");

		let aveLoad = d3.mean(this.data, d => d.load);
		let aveLine = svg.append("line")
			.attr("stroke", "grey")
			.attr("stroke-width", 2)
			.attr("stroke-dasharray", 10)
			.attr("x1", margin.left + 15)
			.attr("x2", width - margin.right)
			.attr("y1", this.y(aveLoad))
			.attr("y2", this.y(aveLoad));

		let aveText = svg.append('text')
			.attr("x", width - 10)
			.attr("y", this.y(aveLoad) - 10)
			.attr("opacity", .5)
			.attr("text-anchor", "end")
			.style("font-weight", "bold")
			.text("Average Electricity Load");

		return this;
	}

	hide() {
		this.circles.transition()
			.delay((d, i) => i * 3)
			.attr("cx", (this.x("holiday") + this.x("event")) / 2)
			.attr("cy", this.height)
			.attr("opacity", 0)
	}

	reset() {
		this.circles.transition()
			.delay((d, i) => i * 3)
			.attr("cx", d => {
				if (d.type.indexOf('temp') !== -1) {
					if (d.desc[d.type.indexOf('temp')] === 'high temp') {
						return this.x("high temp");
					} else {
						return this.x("low temp");
					}
				} else if (d.type.indexOf('holiday') !== -1) {
					return this.x("holiday");
				} else if (d.type.indexOf('event') !== -1) {
					return this.x("event");
				} else if (d.type.indexOf('weekend') !== -1) {
					return this.x("weekend");
				} else {
					return this.x("normal days");
				}
			})
			.attr("cy", d => this.y(d.load))
			.attr("opacity", 1);
	}
}