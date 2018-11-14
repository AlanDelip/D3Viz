import ScrollMagic from 'scrollmagic';
import CalendarPlot from './plot/calendar-plot';
import {loadData, hourlyDataSet, eventDataSet} from './utils/data-loader';
import {createCalendarHLScene, createScatterHLScene, createFixedScene, createTriggerScene} from './utils/scene-maker';
import CategoricalScatterPlot from "./plot/c-scatter-plot";
import QuantitativeScatter from './plot/q-scatter-plot';
import LinePlot from './plot/line-plot';

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

	/** preview section **/
	{
		let highTempScene = createCalendarHLScene(
			scrollCtrl,
			calendarPlot,
			calendarPlot.getCalendar(),
			[{month: 7, week: 1, day_of_week: 1}, {month: 7, week: 1, day_of_week: 2},
				{month: 7, week: 1, day_of_week: 3}, {month: 7, week: 1, day_of_week: 4},
				{month: 7, week: 1, day_of_week: 5}],
			{
				triggerElement: "#preview-trigger-1",
				duration: window.innerHeight,
				textElement: d3.select("#preview-1 .content")
			});

		let lowTempScene = createCalendarHLScene(
			scrollCtrl,
			calendarPlot,
			calendarPlot.getCalendar(),
			[{month: 1, week: 1, day_of_week: 2}, {month: 1, week: 1, day_of_week: 3},
				{month: 1, week: 1, day_of_week: 4}, {month: 1, week: 1, day_of_week: 5},
				{month: 1, week: 1, day_of_week: 6}, {month: 1, week: 1, day_of_week: 7}],
			{
				triggerElement: "#preview-trigger-2",
				duration: window.innerHeight,
				textElement: d3.select("#preview-2 .content")
			});

		let holidayScene = createCalendarHLScene(
			scrollCtrl,
			calendarPlot,
			calendarPlot.getCalendar(),
			[{month: 12, week: 5, day_of_week: 1}, {month: 12, week: 5, day_of_week: 2}],
			{
				triggerElement: "#preview-trigger-3",
				duration: window.innerHeight,
				textElement: d3.select("#preview-3 .content")
			});

		let eventScene = createCalendarHLScene(
			scrollCtrl,
			calendarPlot,
			calendarPlot.getCalendar(),
			[{month: 2, week: 2, day_of_week: 1}],
			{
				triggerElement: "#preview-trigger-4",
				duration: window.innerHeight,
				textElement: d3.select("#preview-4 .content")
			});

		let weekendScene = createCalendarHLScene(
			scrollCtrl,
			calendarPlot,
			calendarPlot.getCalendar(),
			[{month: 7, week: 1, day_of_week: 7}, {month: 7, week: 2, day_of_week: 7},
				{month: 7, week: 3, day_of_week: 7}, {month: 7, week: 4, day_of_week: 7},
				{month: 7, week: 1, day_of_week: 1}, {month: 7, week: 2, day_of_week: 1},
				{month: 7, week: 3, day_of_week: 1}, {month: 7, week: 4, day_of_week: 1},
				{month: 7, week: 5, day_of_week: 1}],
			{
				triggerElement: "#preview-trigger-5",
				duration: window.innerHeight,
				textElement: d3.select("#preview-5 .content")
			});
	}

	/** relation exploration section **/
	{
		let cScatterPlot = CategoricalScatterPlot.of("#special-load", data).draw();
		let qScatterPlot = QuantitativeScatter.of("#temp-load", data);

		createTriggerScene(scrollCtrl, {
			triggerElement: "#relation-exploration-trigger-1"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					qScatterPlot.draw();
					cScatterPlot.hide();
				} else {
					cScatterPlot.reset();
					qScatterPlot.hide();
				}
			}
		});

		let addHighlightEvent = (qScatterPlot, ...eles) => {
			for (let ele of eles) {
				let eleDOM = document.getElementById(ele.id);
				eleDOM.addEventListener("mouseover", e => {
					qScatterPlot.highlight([ele.type]);
				});
				eleDOM.addEventListener("mouseleave", e => {
					qScatterPlot.reset();
				});
			}
		};

		addHighlightEvent(qScatterPlot,
			{id: "high-temp-label", type: "high temp"},
			{id: "low-temp-label", type: "low temp"},
			{id: "holiday-label", type: "holiday"},
			{id: "event-label", type: "event"},
			{id: "weekend-label", type: "weekend"},
			{id: "normal-day-label", type: "normal days"});

		createScatterHLScene(scrollCtrl, qScatterPlot, "#temp-load-container", {
			triggerElement: "#relation-exploration-trigger-2",
			duration: 1200
		});
	}

	/** typical days exploration section **/
	{
		createFixedScene(scrollCtrl, "#one-day-labels", {
			triggerElement: "#typical-day-exploration-trigger-1",
			duration: 400
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					d3.select("#temp-load-container .labels")
						.attr("class", "labels hidden");
					d3.select("#one-day-labels")
						.attr("class", "labels");
				} else {
					d3.select("#temp-load-container .labels")
						.attr("class", "labels");
					d3.select("#one-day-labels")
						.attr("class", "labels hidden");
				}
			},
			progressCB: e => {
				let progress = e.progress;
				d3.selectAll("#one-day-labels .label")
					.style("opacity", (d, i) => i !== 0 ? 1 - progress : 1)
					.style("transform", (d, i) => i !== 0 ? "" : `scale(${(progress + 1)})`);
				d3.select("#one-day-labels .label .text")
					.style("opacity", 1 - progress);
				d3.select("#one-day-labels .label .next-text")
					.style("opacity", progress);
			}
		});
		// let circleData = [];
		// 	() => {
		// 		if (circleData.length === 0) {
		// 			let leftEle = document.getElementById("one-day-high-temp");
		// 			let numberOfPoints = 24;
		// 			let radius = 20;
		// 			let margin = {top: 10, left: 0};
		// 			let lineLength = 2 * radius * Math.PI;
		// 			for (let i = 0; i < numberOfPoints; i++) {
		// 				let imag = margin.left + radius * Math.sin(2 * i * Math.PI / (numberOfPoints - 1));
		// 				let real = margin.top + radius - radius * Math.cos(2 * i * Math.PI / (numberOfPoints - 1));
		// 				circleData.push({x: imag, y: real});
		// 			}
		//
		// 			let lineFunction = d3.line()
		// 				.x(d => d.x)
		// 				.y(d => d.y);
		//
		// 			let circleSVG = d3.select("#high-temp-circle")
		// 				.append("svg").attr("width", "100%").attr("height", "100%");
		//
		// 			let circle = circleSVG.append("g")
		// 				.attr("transform", `translate(${leftEle.offsetLeft * 2 + radius / 2},0)`)
		// 				.append("path")
		// 				.data([circleData])
		// 				.attr("d", lineFunction);
		// 		}
		// 	});

		let linePlot = LinePlot.of("#typical-day-temp-chart");

		createFixedScene(scrollCtrl, "#typical-day-temp-chart", {
			triggerElement: "#typical-day-exploration-trigger-2",
			duration: 6300
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					// dispatch line
					linePlot.data(hourlyDataSet["hot-day-1"], "#fdb02d", "hot-day-1").draw();
				} else {
					linePlot.removeAll();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-3"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.highlightPeak();
				} else {
					linePlot.resetPeak();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-4"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.data(hourlyDataSet["hot-day-2"], "#fdb02d", "hot-day-2").draw();
					linePlot.highlightPeak();
				} else {
					linePlot.resetPeak();
					linePlot.remove("hot-day-2");
					linePlot.highlightPeak();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-5"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.remove("hot-day-2");
					linePlot.data(hourlyDataSet["cold-day-1"], "#a6e7fd", "cold-day-1")
						.data(hourlyDataSet["cold-day-2"], "#a6e7fd", "cold-day-2").draw();
					linePlot.highlightPeak();
				} else {
					linePlot.resetPeak();
					linePlot.remove("cold-day-1");
					linePlot.remove("cold-day-2");
					linePlot.data(hourlyDataSet["hot-day-2"], "#fdb02d", "hot-day-2").draw();
					linePlot.highlightPeak();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-6"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.removeAll();
					linePlot.data(hourlyDataSet["weekend-1"], "#a1e7a6", "weekend-1")
						.data(hourlyDataSet["weekend-2"], "#a1e7a6", "weekend-2")
						.data(hourlyDataSet["normal-2"], "#909290", "normal-2").draw();
					linePlot.highlightPeak();
				} else {
					linePlot.resetPeak();
					linePlot.removeAll();
					linePlot.data(hourlyDataSet["hot-day-1"], "#fdb02d", "hot-day-1")
						.data(hourlyDataSet["cold-day-1"], "#a6e7fd", "cold-day-1")
						.data(hourlyDataSet["cold-day-2"], "#a6e7fd", "cold-day-2").draw();
					linePlot.highlightPeak();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-7"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.removeAll();
					linePlot.switchXAxis();
					linePlot.data(eventDataSet["trump"], "#e2ea64", "trump")
						.data(eventDataSet["trump-now"], "#909290", "trump-now")
						.draw(true);
				} else {
					linePlot.removeAll();
					linePlot.resetXAxis();
					linePlot.data(hourlyDataSet["weekend-1"], "#a1e7a6", "weekend-1")
						.data(hourlyDataSet["weekend-2"], "#a1e7a6", "weekend-2")
						.data(hourlyDataSet["normal-2"], "#909290", "normal-2").draw();
					linePlot.highlightPeak();
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-8"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.removeAll();
					linePlot.data(eventDataSet["financial"], "#e2ea64", "financial")
						.data(eventDataSet["financial-now"], "#909290", "financial-now")
						.draw(true);
				} else {
					linePlot.removeAll();
					linePlot.data(eventDataSet["trump"], "#e2ea64", "trump")
						.data(eventDataSet["trump-now"], "#909290", "trump-now")
						.draw(true);
				}
			}
		});

		createTriggerScene(scrollCtrl, {
			triggerElement: "#typical-day-exploration-trigger-9"
		}, {
			startCB: e => {
				if (e.scrollDirection === "FORWARD") {
					linePlot.removeAll();
					linePlot.data(eventDataSet["storm"], "#e2ea64", "storm")
						.data(eventDataSet["storm-now"], "#909290", "storm-now")
						.draw(true);
				} else {
					linePlot.removeAll();
					linePlot.data(eventDataSet["financial"], "#e2ea64", "financial")
						.data(eventDataSet["financial-now"], "#909290", "financial-now")
						.draw(true);
				}
			}
		});
	}
});

