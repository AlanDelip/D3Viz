const d3 = require('d3');
const fs = require('fs');
const csv = require('csv');
global.fetch = require("node-fetch");

function extractExistedData2File() {
	d3.csv("https://s3-us-west-2.amazonaws.com/alansite/resources/nyiso_loads.csv")
		.then(res => {
			let data = [];
			let index = 0;
			for (let daily_data of res) {
				let year = parseInt(daily_data.Year);
				let month = parseInt(daily_data.Month);
				let week = Math.floor((daily_data.Day - 1) / 7) + 1;
				let day = (daily_data.Day - 1) % 7 + 1;
				let day_of_week = getDayOfWeek(year, month, day) + 1;
				week = day_of_week - day < 0 ? week + 1 : week;

				let load = Object.keys(daily_data)
					.map(k => {
						if (k !== "Year" && k !== "Month" && k !== "Day" && k !== "Hr25") {
							return parseInt(daily_data[k]);
						} else {
							return 0;
						}
					})
					.reduce((a, b) => a + b);

				data.push({
					id: index++,
					year,
					month,
					week,
					day: parseInt(daily_data.Day),
					day_of_week,
					load
				});
			}
			return data;
		})
		.then(data => {
			fs.writeFile('ny_load.json', JSON.stringify(data), res => {
				console.log("The file was saved!");
			});
		});
}

function getDayOfWeek(year, month, day) {
	let a = Math.floor((14 - month) / 12);
	let y = year - a;
	let m = month + 12 * a - 2;
	return (day + y + Math.floor(y / 4) - Math.floor(y / 100) +
		Math.floor(year / 400) + Math.floor((31 * m) / 12)) % 7;
}

function extractData() {
	fs.readdir("./ny-load-data/2017_12_ny_load_csv", (err, files) => {
		let data = [];
		let index = 332;
		files.forEach((file, i) => {
			let stream = fs.createReadStream(`./ny-load-data/2017_12_ny_load_csv/${file}`);
			let header = true;
			let load = 0;
			let csvStream = csv.parse()
				.on("data", data => {
					if (header) {
						header = false;
					} else {
						load += parseInt(data[4]);
					}
				})
				.on("end", () => {
					let year = parseInt(file.substr(0, 4));
					let month = parseInt(file.substr(4, 2));
					let day = (parseInt(file.substr(6, 2)) - 1) % 7 + 1;
					let week = Math.floor((file.substr(6, 2) - 1) / 7) + 1;
					let day_of_week = getDayOfWeek(year, month, day) + 1;
					week = day_of_week - day < 0 ? week + 1 : week;
					data.push({
						id: index++,
						year,
						month,
						week,
						day: parseInt(file.substr(6, 2)),
						day_of_week,
						load
					});

					if (i === 30) {
						fs.writeFile('ny_load_1712.json', JSON.stringify(data), res => {
							console.log("The file was saved!");
						});
					}
					stream.close();
				});

			stream.pipe(csvStream);
		});
	});
}

function extractHourlyData() {
	let stream = fs.createReadStream("./ny-load-data/20180901palIntegrated_csv/20180929palIntegrated.csv");
	let header = true;
	let load = 0;
	let hdata = [];
	let index = 0;
	let csvStream = csv.parse()
		.on("data", data => {
			if (index !== 0) {
				load += parseFloat(data[4]);
				if (index % 11 === 0) {
					hdata.push({hour: index / 11 - 1, load: parseFloat(load.toFixed(1))});
					load = 0;
				}
			}
			index++;
		})
		.on("end", () => {
			fs.writeFile('ny_load_180929.json', JSON.stringify(hdata), res => {
				console.log("The file was saved!");
			});
			stream.close();
		});

	stream.pipe(csvStream);
}

function convertHourlyData() {
	let data = JSON.parse(fs.readFileSync("./ny-load-data/hourly-data/financial-now.json"));
	let day = 0;
	let current = 0;
	data = data.map(d => {
		if (d.Time_Stamp.substr(3, 2) !== day) {
			day = d.Time_Stamp.substr(3, 2);
			current++;
		}
		return {day: current, hour: parseInt(d.Time_Stamp.substr(11, 2)), load: d.Integrated_Load}
	});
	fs.writeFile("financial-now.json", JSON.stringify(data), res => console.log("saved"));
}

// extractExistedData2File();
// extractData();
// extractHourlyData();
convertHourlyData();