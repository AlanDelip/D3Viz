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
for (let load of nyLoadJson) {
	let id = `${load.year}${load.month}${load.day}`;
	load.max_temp = parseFloat(data[id].max_temp.toFixed(2));
	load.min_temp = parseFloat(data[id].min_temp.toFixed(2));

	if (!load.type) {
		load.type = [];
	}

	if (load.max_temp >= 78.8) {
		load.type.push("temp");
		if (!load.desc) {
			load.desc = [];
		}
		load.desc.push("high temp")

	} else if (load.min_temp <= 41) {
		load.type.push("temp");

		if (!load.desc) {
			load.desc = [];
		}
		load.desc.push("low temp")
	}
}

mergeOutput(nyLoadJson);

function mergeOutput(result) {
	fs.writeFile("ny-load.json", JSON.stringify(result), res => {
		console.log("write success");
	})
}

function k2f(temp) {
	return (temp - 273.15) * 9 / 5 + 32;
}