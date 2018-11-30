const d3 = require('d3');

export default class LinePlot {
	constructor(container) {
		let containerDOM = document.getElementById(container.substr(1));
		this.svg = d3.select(container).append("svg")
			.attr("width", containerDOM.offsetWidth)
			.attr("height", containerDOM.offsetHeight);
		this.margin = {top: 30, right: 40, bottom: 30, left: 60};
		this.height = this.svg.attr("height");
		this.width = this.svg.attr("width");
		this.datas = [];

		this.xText = this.svg.append('text')
			.attr("x", this.width - this.margin.right)
			.attr("y", this.height - this.margin.bottom - 5)
			.attr("text-anchor", "end")
			.style("font-weight", "bold");

		this.resetXAxis();
		let yText = this.svg.append('text')
			.attr("x", 0)
			.attr("y", this.margin.top - 10)
			.attr("text-anchor", "start")
			.style("font-weight", "bold")
			.text("Electricity Load (MegaWatt)");
	}

	static of(container) {
		return new LinePlot(container);
	}

	data(data, color, name) {
		this.datas.push({data, color, name});
		this.refresh();
		return this;
	}

	draw(noCircle) {
		this.circles = [];
		this.lines = [];
		this.datas.forEach(res => {
			let data = res.data;
			let name = res.name;
			let color = res.color;
			this.svg.selectAll(`circle.${name}`).remove();
			let circles = this.svg.selectAll(`circle.${name}`)
				.data(data)
				.enter()
				.append("circle")
				.attr("class", name)
				.attr("stroke", "darkgrey")
				.attr("fill", "transparent")
				.attr("opacity", noCircle ? 0 : 1)
				.attr("cx", d => {
					if (d.day) {
						return this.x(`${d.day}/${d.hour}`)
					} else {
						return this.x(d.hour);
					}
				})
				.attr("cy", d => this.y(d.load))
				.attr("r", 0);

			circles.transition()
				.delay((d, i) => i * 50)
				.attr("r", 4);

			this.svg.selectAll(`path.${name}`).remove();
			let line = d3.line()
				.x(d => {
					if (d.day) {
						return this.x(`${d.day}/${d.hour}`)
					} else {
						return this.x(d.hour);
					}
				})
				.y(d => this.y(d.load))
				.curve(d3.curveCatmullRom.alpha(0.5));

			let lines = this.svg.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("class", name)
				.attr("stroke", "transparent")
				.attr("stroke-width", 2)
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round");

			this.svg.select(`path.${name}`)
				.datum(data)
				.attr("opacity", 1)
				.attr("d", line)
				.call(path => {
					path.transition()
						.duration(1500)
						.attr("stroke", color)
						.attrTween("stroke-dasharray", tweenDash);
				});

			this.update(this.circles, {data: circles, name});
			this.update(this.lines, {data: line, name});
		});


		function tweenDash() {
			let l = this.getTotalLength(),
				i = d3.interpolateString("0," + l, l + "," + l);
			return function (t) {
				return i(t);
			};
		}
	}

	update(od, nd) {
		let exist = false;
		od.forEach(data => {
			if (data.name === nd.name) {
				exist = true;
			}
		});
		if (!exist) {
			od.push(nd);
		}
	}

	highlightAxis() {
		this.highlightBlock = this.svg.append('rect')
			.attr("opacity", 0)
			.attr("x", this.x("2/0"))
			.attr("y", 20)
			.attr("width", this.x("3/0") - this.x("2/0"))
			.attr("height", document.getElementById("typical-day-temp-chart").offsetHeight)
			.attr("fill", "#e4dfdf");

		this.highlightBlock
			.transition()
			.duration(300)
			.attr("opacity", .2);
	}

	removeHighlightAxis() {
		this.highlightBlock.transition().duration(300).attr("opacity", 0).remove();
	}

	switchXAxis() {
		let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		let domain = [];
		let axisDomain = [];
		for (let i = 1; i <= 3; i++) {
			for (let j = 0; j < 24; j++) {
				if (j % 4 === 0) {
					axisDomain.push(`${i}/${hours[j]}`);
				}
				domain.push(`${i}/${hours[j]}`);
			}
		}
		this.x = d3.scaleBand()
			.domain(domain)
			.range([this.margin.left, this.width - this.margin.right])
			.padding(1);

		this.svg.selectAll(".xaxis").remove();

		let xAxis = g => g
			.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
			.call(d3.axisBottom(this.x)
				.tickValues(axisDomain)
				.tickSize(4));

		this.svg.append("g")
			.attr("class", "xaxis")
			.style("font", "1em Lora")
			.call(xAxis);

		this.xText.text("Time (Day/Hour)");
	}

	resetXAxis() {
		this.x = d3.scaleBand()
			.domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
			.range([this.margin.left, this.width - this.margin.right])
			.padding(1);

		this.svg.selectAll(".xaxis").remove();

		let xAxis = g => g
			.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
			.call(d3.axisBottom(this.x).tickSize(4));

		this.svg.append("g")
			.attr("class", "xaxis")
			.style("font", "1em Lora")
			.call(xAxis);

		this.xText.text("Time (Hour)");
	}

	refresh() {
		let min = 1000000, max = 0;
		this.datas.forEach(res => {
			max = Math.max(d3.max(res.data, d => d.load), max);
			min = Math.min(d3.min(res.data, d => d.load), min);
		});
		this.y = d3.scaleLinear()
			.domain([min, max])
			.range([this.height - this.margin.bottom, this.margin.top]);

		this.svg.selectAll(".yaxis").remove();

		let yAxis = g => g
			.attr("transform", `translate(${this.margin.left},0)`)
			.call(d3.axisLeft(this.y).tickSize(4));

		this.svg.append("g")
			.style("font", ".8em Lora")
			.attr("class", "yaxis")
			.call(yAxis);
	}

	remove(name) {
		let newData = [];
		this.datas.forEach(data => {
			if (data.name !== name) {
				newData.push(data);
			}
		});
		this.datas = newData;

		let newCircles = [];
		this.circles.forEach(circle => {
			if (circle.name !== name) {
				newCircles.push(circle);
			} else {
				this.svg.selectAll(`circle.${name}`).remove();
			}
		});
		this.circles = newCircles;

		let newLines = [];
		this.lines.forEach(line => {
			if (line.name !== name) {
				newLines.push(line);
			} else {
				this.svg.selectAll(`path.${name}`).remove();
			}
		});
		this.lines = newLines;

		this.refresh();
		this.draw();
	}

	removeAll() {
		this.circles.forEach(circle => {
			circle.data.transition().delay(300).attr("opacity", 0).remove()
		});
		this.circles = [];
		this.lines.forEach(line => {
			this.svg.select(`path.${line.name}`).transition().delay(300).attr("opacity", 0).remove()
		});
		this.lines = [];
		this.datas = [];
	}

	highlightPeak() {
		for (let i = 0; i < this.datas.length; i++) {
			let data = this.datas[i].data;
			let color = this.datas[i].color;

			let peakHour = [];
			for (let j = 1; j < data.length - 1; j++) {
				if (data[j - 1].load <= data[j].load && data[j + 1].load <= data[j].load) {
					peakHour.push(data[j].hour)
				}
			}
			this.circles[i].data
				.transition()
				.delay(300)
				.attr("fill", d => {
					if (peakHour.includes(d.hour)) {
						return color;
					} else {
						return "transparent";
					}
				})
				.attr("r", d => {
					if (peakHour.includes(d.hour)) {
						return 9;
					} else {
						return 4;
					}
				})
		}
	}

	resetPeak() {
		this.circles.forEach(circle => {
			circle.data
				.attr("stroke", "darkgrey")
				.attr("fill", "transparent")
				.attr("r", 4);
		})

	}
}