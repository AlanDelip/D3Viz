const d3 = require('d3');

export default class CalendarPlot {
	constructor({container, margin, size}) {
		this.container = container;
		this.margin = margin;
		this.size = size;
		this.svg = null;
	}

	/**
	 * init with configurations
	 * @param container
	 * @param margin
	 * @param size
	 * @returns {CalendarPlot}
	 */
	static of({container, margin, size}) {
		return new CalendarPlot({container, margin, size});
	}

	data(data) {
		this.data = data;
		return this;
	}

	draw() {
		this._validateConfig();

		this.svg = d3.select(this.container)
			.append("svg")
			.attr("width", this.size.width)
			.attr("height", this.size.height);

		this.calendar = this.svg.append("g")
			.selectAll("circle")
			.data(this.data).enter()
			.append("circle")
			.attr("cx", d => d.x)
			.attr("cy", d => d.y)
			.attr("r", d => d.size)
			.attr("fill", d => d.color);

		return this;
	}

	highlight(data) {
		this.calendar.attr("opacity", original_data => {
			for (let highlight_data of data) {
				if (original_data.x === highlight_data.x && original_data.y === highlight_data.y) {
					return 1;
				}
			}
			return .3;
		});
	}

	reset() {
		this.calendar.attr("opacity", 1);
	}

	_validateConfig() {
		if (this.size == null) {
			let container = document.getElementById(this.container.substr(1));
			this.size = {width: container.offsetWidth, height: container.offsetHeight};
		}
	}

	getSvg() {
		return this.svg;
	}

	getCalendar() {
		return this.calendar;
	}
}