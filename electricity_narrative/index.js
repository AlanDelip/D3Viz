import ScrollMagic from 'scrollmagic';
import CalendarPlot from './plot/calendar-plot';
import {loadData} from './utils/data-loader';
import {createHighlightScene} from './utils/scene-maker';

const d3 = require('d3');
const scrollCtrl = new ScrollMagic.Controller();
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');

loadData().then(data => {
	let calendarPlot = CalendarPlot.of(
		{
			container: "#calendar-plot",
			margin: {left: 10, right: 10, top: 10, bottom: 10}
		})
		.data(data)
		.draw();

	let festivalScene = createHighlightScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 3, week: 2, day_of_week: 1}, {month: 3, week: 2, day_of_week: 2}],
		{
			triggerElement: "#preview-trigger-1",
			duration: window.innerHeight,
			textElement: d3.select("#preview-1 .content")
		});

	let eventScene = createHighlightScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 3, week: 2, day_of_week: 1}, {month: 3, week: 2, day_of_week: 2}],
		{
			triggerElement: "#preview-trigger-2",
			duration: window.innerHeight,
			textElement: d3.select("#preview-2 .content")
		});

	let highTemperatureScene = createHighlightScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 8, week: 2, day_of_week: 1}, {month: 8, week: 2, day_of_week: 2}, {month: 8, week: 2, day_of_week: 3}],
		{
			triggerElement: "#preview-trigger-3",
			duration: window.innerHeight,
			textElement: d3.select("#preview-3 .content")
		});

	let lowTemperatureScene = createHighlightScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 8, week: 2, day_of_week: 1}, {month: 8, week: 2, day_of_week: 2}, {month: 8, week: 2, day_of_week: 3}],
		{
			triggerElement: "#preview-trigger-4",
			duration: window.innerHeight,
			textElement: d3.select("#preview-4 .content")
		});

	let rainyScene = createHighlightScene(
		scrollCtrl,
		calendarPlot,
		calendarPlot.getCalendar(),
		[{month: 8, week: 2, day_of_week: 1}, {month: 8, week: 2, day_of_week: 2}, {month: 8, week: 2, day_of_week: 3}],
		{
			triggerElement: "#preview-trigger-5",
			duration: window.innerHeight,
			textElement: d3.select("#preview-5 .content")
		});
});
