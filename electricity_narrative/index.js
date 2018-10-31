import ScrollMagic from 'scrollmagic';
import CalendarPlot from './plot/calendar-plot';

const d3 = require('d3');
const scrollCtrl = new ScrollMagic.Controller();
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

let data = [
	{x: 100, y: 100, size: 10, color: "#bff098"},
	{x: 130, y: 100, size: 10, color: "#bff098"},
	{x: 50, y: 50, size: 20, color: "#00b7ff"},
	{x: 50, y: 100, size: 20, color: "#00b7ff"},
	{x: 1100, y: 650, size: 15, color: "#ffb063"},
	{x: 1100, y: 600, size: 15, color: "#ffb063"}
];

let calendarPlot = CalendarPlot.of(
	{
		container: "#calendar-plot",
		margin: {left: 20, right: 20, top: 20, bottom: 20}
	})
	.data(data)
	.draw();

let festivalScene = createHighlightScene(
	calendarPlot.getCalendar(),
	[{x: 50, y: 50}, {x: 50, y: 100}],
	{
		triggerElement: "#preview-trigger-1",
		duration: window.innerHeight,
		textElement: d3.select("#preview-1 .content")
	});

let temperatureScene = createHighlightScene(
	calendarPlot.getCalendar(),
	[{x: 1100, y: 650}, {x: 1100, y: 600}],
	{
		triggerElement: "#preview-trigger-2",
		duration: window.innerHeight,
		textElement: d3.select("#preview-2 .content")
	});

function createHighlightScene(selection, highlightedData, {triggerElement, duration, textElement}) {
	let zoom = d3.zoom()
		.extent([[0, 0], [0, 0]])	// set view port to the left top corner
		.on(".zoom", null)
		.on("zoom", () => selection.attr("transform", d3.event.transform));

	let viewportOfPreview = {x: window.innerWidth / 4, y: window.innerHeight / 2};
	let highlightBlock = [
		{
			x: highlightedData.map(d => d.x).reduce((a, b) => a < b ? a : b),
			y: highlightedData.map(d => d.y).reduce((a, b) => a < b ? a : b)
		},
		{
			x: highlightedData.map(d => d.x).reduce((a, b) => a > b ? a : b),
			y: highlightedData.map(d => d.y).reduce((a, b) => a > b ? a : b)
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
				calendarPlot.highlight(highlightedData);

			} else if (progress > 0.85) {
				let mappedProgress = d3.scaleLinear().domain([0.85, 1]).range([1, 0])(progress);
				transitPlots(mappedProgress);
				transitText(mappedProgress);

			}
		})
		.on("start end", e => {
			calendarPlot.reset();
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
}
