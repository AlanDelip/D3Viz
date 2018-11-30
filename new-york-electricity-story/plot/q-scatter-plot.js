const d3 = require('d3');

export default class QuantitativeScatter {
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

		let containerDOM = document.getElementById(this.container.substr(1));
		this.svg = d3.select(this.container).append("svg")
			.attr("width", containerDOM.offsetWidth)
			.attr("height", containerDOM.offsetHeight);
		this.margin = {top: 30, right: 40, bottom: 30, left: 60};
		this.height = this.svg.attr("height");
		this.width = this.svg.attr("width");

		this.x = d3.scaleLinear()
			.domain([d3.min(this.flatData, d => d.temp), d3.max(this.flatData, d => d.temp)])
			.range([this.margin.left, this.width - this.margin.right]);

		this.y = d3.scaleLinear()
			.domain([d3.min(this.flatData, d => d.load), d3.max(this.flatData, d => d.load)])
			.range([this.height - this.margin.bottom, this.margin.top]);

		let xAxis = g => g
			.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
			.call(d3.axisBottom(this.x).tickSize(4));

		let yAxis = g => g
			.attr("transform", `translate(${this.margin.left},0)`)
			.call(d3.axisLeft(this.y).tickSize(4));

		this.svg.append("g")
			.style("font", "1em Lora")
			.call(xAxis);

		this.svg.append("g")
			.style("font", ".8em Lora")
			.call(yAxis);

		let yText = this.svg.append('text')
			.attr("x", 0)
			.attr("y", this.margin.top - 5)
			.attr("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Electricity Load (Megawatt)");

		let xText = this.svg.append('text')
			.attr("x", this.width - this.margin.right - 5)
			.attr("y", this.height - this.margin.bottom - 5)
			.attr("text-anchor", "end")
			.style("font-weight", "bold")
			.text("Temperature (°F)");
	}

	static of(container, data) {
		return new QuantitativeScatter(container, data);
	}

	draw() {
		if (!this.circles) {
			this.circles = this.svg.selectAll("circle")
				.data(this.flatData).enter()
				.append("circle")
				.attr("opacity", 0)
				.attr("cx", d => this.x((d3.min(this.flatData, d => d.temp) + d3.max(this.flatData, d => d.temp) / 2) - 5))
				.attr("cy", -5);
		}
		this.circles.transition()
			.delay((d, i) => i * 3)
			.attr("cx", d => this.x(d.temp))
			.attr("cy", d => this.y(d.load))
			.attr("r", 5)
			.attr("opacity", 1)
			.attr("fill", d => {
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

		let aveLoad = d3.mean(this.flatData, d => d.load);
		let aveLine = this.svg.append("line")
			.attr("stroke", "grey")
			.attr("stroke-width", 2)
			.attr("stroke-dasharray", 10)
			.attr("x1", this.margin.left + 15)
			.attr("x2", this.width - this.margin.right)
			.attr("y1", this.y(aveLoad))
			.attr("y2", this.y(aveLoad));

		let aveText = this.svg.append('text')
			.attr("x", this.width - 10)
			.attr("y", this.y(aveLoad) - 10)
			.attr("opacity", .5)
			.attr("text-anchor", "end")
			.style("font-weight", "bold")
			.text("Average Electricity Load");

		return this;
	}

	highlight(types) {
		if (!this.highlightLock) {
			this.circles
				.attr("stroke", "grey")
				.attr("opacity", d => {
					for (let type of types) {
						if (d.type.indexOf("temp") !== -1 && d.desc.indexOf('high temp') !== -1 && type === 'high temp') {
							return 1;
						}

						if (d.type.indexOf("temp") !== -1 && d.desc.indexOf('low temp') !== -1 && type === 'low temp') {
							return 1;
						}

						if (d.type.indexOf('holiday') !== -1 && type === 'holiday') {
							return 1;
						}

						if (d.type.indexOf('event') !== -1 && type === 'event') {
							return 1;
						}

						if (d.type.indexOf('weekend') !== -1 && type === 'weekend') {
							return 1;
						}

						if (d.type.length === 0 && type === 'normal days') {
							return 1;
						}
					}
					return .15;
				});
		}
	}

	lockHighlight(lock) {
		this.highlightLock = lock;
	}

	reset() {
		if (!this.highlightLock) {
			this.circles.attr("opacity", 1)
				.attr("stroke", "transparent");
		}
	}

	hide() {
		this.circles.transition()
			.delay((d, i) => i * 3)
			.attr("opacity", 0)
			.attr("cx", d => this.x((d3.min(this.flatData, d => d.temp) + d3.max(this.flatData, d => d.temp) / 2) - 5))
			.attr("cy", -5);
	}
}