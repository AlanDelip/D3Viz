const fs = require('fs');

let weatherJson = fs.readFileSync('ny_weather_1711-1810.json');
let weatherArr = JSON.parse(weatherJson);
let data = {};
for (let hd of weatherArr) {
	let max_htemp = k2f(hd.main.temp_max);
	let min_htemp = k2f(hd.main.temp_min);
	let time = hd.dt_iso;
	let year = parseInt(time.substr(0, 4));
	let month = parseInt(time.substr(5, 2));
	let day = parseInt(time.substr(8, 2));
	let id = `${year}${month}${day}`;

	if (data[id]) {
		data[id].max_temp = Math.max(data[id].max_temp, max_htemp);
		data[id].min_temp = Math.min(data[id].min_temp, max_htemp);
	} else {
		data[id] = {
			max_temp: max_htemp,
			min_temp: min_htemp
		}
	}
}

let nyLoadJson = JSON.parse(fs.readFileSync('../../data/ny-load-data/ny_load.json'));
let eventsJSON = JSON.parse(fs.readFileSync("../google/ny-events.json"));
let holidaysJSON = JSON.parse(fs.readFileSync("../google/ny-holidays.json"));
for (let load of nyLoadJson) {
	let id = `${load.year}${load.month}${load.day}`;
	load.max_temp = parseFloat(data[id].max_temp.toFixed(2));
	load.min_temp = parseFloat(data[id].min_temp.toFixed(2));

	if (!load.type) {
		load.type = [];
	}

	if (!load.desc) {
		load.desc = [];
	}

	if (load.max_temp >= 89.6) {
		load.type.push("temp");
		load.desc.push("high temp")

	} else if (load.min_temp <= 23) {
		load.type.push("temp");
		load.desc.push("low temp")
	}

	for (let holiday of holidaysJSON) {
		let start = new Date(holiday.start);
		let end = new Date(holiday.end);
		let name = holiday.name;
		let startTag = parseInt(`${start.getFullYear()}${amplify(start.getMonth() + 1)}${amplify(start.getDate() + 1)}`);
		let endTag = parseInt(`${end.getFullYear()}${amplify(end.getMonth() + 1)}${amplify(end.getDate() + 1)}`);
		let currentTag = parseInt(`${load.year}${amplify(load.month)}${amplify(load.day)}`);
		if (currentTag >= startTag && currentTag < endTag) {
			load.type.push('holiday');
			load.desc.push(name);
		}
	}

	for (let event of eventsJSON) {
		let start = new Date(event.start);
		let end = new Date(event.end);
		let name = event.name;
		let startTag = parseInt(`${start.getFullYear()}${amplify(start.getMonth() + 1)}${amplify(start.getDate() + 1)}`);
		let endTag = parseInt(`${end.getFullYear()}${amplify(end.getMonth() + 1)}${amplify(end.getDate() + 1)}`);
		let currentTag = parseInt(`${load.year}${amplify(load.month)}${amplify(load.day)}`);
		if (currentTag >= startTag && currentTag < endTag) {
			load.type.push('event');
			load.desc.push(name);
		}
	}

	if (load.day_of_week === 1 || load.day_of_week === 7) {
		load.type.push('weekend');
		load.desc.push('weekend');
	}
}

mergeEvents(nyLoadJson);

function mergeEvents(result) {
	fs.writeFile("ny-load.json", JSON.stringify(result), res => {
		console.log("write success");
	})
}

function k2f(temp) {
	return (temp - 273.15) * 9 / 5 + 32;
}

function amplify(num) {
	if (num.length === 1) {
		return '0' + num;
	}
	return num;
}