import ScrollMagic from "scrollmagic";

const d3 = require("d3");

export let createCalendarHLScene = (scrollCtrl, calendar, selection, highlightedData, {triggerElement, duration, textElement}) => {
	let zoom = d3.zoom()
		.extent([[0, 0], [0, 0]])	// set view port to the left top corner
		.on(".zoom", null)
		.on("zoom", () => selection.attr("transform", d3.event.transform));

	let viewportOfPreview = {x: window.innerWidth / 4, y: window.innerHeight / 2};
	let x = calendar.getXScale();
	let y = calendar.getYScale();
	let highlightBlock = [
		{
			x: highlightedData.map(d => x(6 * ((d.month - 1) % 6) + d.week)).reduce((a, b) => a < b ? a : b),
			y: highlightedData.map(d => y(Math.floor(((d.month - 1) / 6)) * 8 + d.day_of_week)).reduce((a, b) => a < b ? a : b)
		},
		{
			x: highlightedData.map(d => x(6 * ((d.month - 1) % 6) + d.week)).reduce((a, b) => a > b ? a : b),
			y: highlightedData.map(d => y(Math.floor(((d.month - 1) / 6)) * 8 + d.day_of_week)).reduce((a, b) => a > b ? a : b)
		}
	];
	let highlightCenter = {
		x: (highlightBlock[0].x + highlightBlock[1].x) / 2,
		y: (highlightBlock[0].y + highlightBlock[1].y) / 2
	};

	let scene = new ScrollMagic.Scene({triggerElement, duration})
		.addTo(scrollCtrl)
		.on("progress", e => {
			let progress = e.progress;
			if (progress <= 0.5) {
				let mappedProgress = progress * 2;
				transitPlots(mappedProgress);
				transitText(mappedProgress);

			} else if (progress > 0.5 && progress <= 0.85) {
				calendar.highlight(highlightedData);

			} else if (progress > 0.85) {
				let mappedProgress = d3.scaleLinear().domain([0.85, 1]).range([1, 0])(progress);
				transitPlots(mappedProgress);
				transitText(mappedProgress);

			}
		})
		.on("enter", e => {
			calendar.hideMarks();
			calendar.update(highlightedData);
			selection = calendar.getCalendar();
		})
		.on("leave", e => {
			calendar.showMarks();
			calendar.reset();
			selection = calendar.getCalendar();
		});

	let transitPlots = mappedProgress => {
		selection
			.call(zoom.translateTo, -mappedProgress * (viewportOfPreview.x / 2 - highlightCenter.x), -mappedProgress * (viewportOfPreview.y / 2 - highlightCenter.y))
			.call(zoom.scaleTo, 1 + mappedProgress);
	};

	let transitText = mappedProgress => {
		textElement.attr("style", `opacity:${mappedProgress}`)
	};

	return {scene, zoom, selection};
};

export let createScatterHLScene = (scrollCtrl, scatterPlot, pinnedEle, {triggerElement, duration}) => {
	return new ScrollMagic.Scene({triggerElement, duration})
		.setPin(pinnedEle)
		.addTo(scrollCtrl)
		.on("progress", e => {
			let progress = e.progress;
			if (progress < .25) {
				scatterPlot.lockHighlight(false);
				scatterPlot.reset();
			}
			if (progress >= .25 && progress < .5) {
				scatterPlot.lockHighlight(false);
				scatterPlot.highlight(["high temp", "low temp"]);
				scatterPlot.lockHighlight(true);
			}
			if (progress >= .5 && progress < .88) {
				scatterPlot.lockHighlight(false);
				scatterPlot.highlight(["normal days", "weekend"]);
				scatterPlot.lockHighlight(true);
			}
			if (progress >= .88) {
				scatterPlot.lockHighlight(false);
				scatterPlot.reset();
			}
		})
		.on("leave", e => {
			scatterPlot.lockHighlight(false);
			scatterPlot.reset();
		});
};

export let createFixedScene = (scrollCtrl, pinnedEle, {triggerElement, duration}, {startCB, progressCB, endCB} = {}) => {
	return new ScrollMagic.Scene({triggerElement, duration})
		.setPin(pinnedEle)
		.addTo(scrollCtrl)
		.on("start", e => startCB ? startCB(e) : null)
		.on("progress", e => progressCB ? progressCB(e) : null)
		.on("end", e => endCB ? endCB() : null);
};

export let createTriggerScene = (scrollCtrl, {triggerElement, duration = 0}, {startCB, progressCB, endCB}) => {
	return new ScrollMagic.Scene({triggerElement, duration})
		.addTo(scrollCtrl)
		.on("start", e => startCB ? startCB(e) : null)
		.on("progress", e => progressCB ? progressCB(e) : null)
		.on("end", e => endCB ? endCB() : null);
};