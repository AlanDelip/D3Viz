const d3 = require("d3");

export function loadData() {
	return d3.csv("https://s3-us-west-2.amazonaws.com/alansite/resources/nyiso_loads.csv")
		.then(res => {
			let data = [];
			let index = 0;
			for (let daily_data of res) {
				let year = parseInt(daily_data.Year);
				let month = parseInt(daily_data.Month);
				let week = Math.floor((daily_data.Day - 1) / 7) + 1;
				let day = (daily_data.Day - 1) % 7 + 1;
				let day_of_week = getDayOfWeek(year, month, day) + 1;
				week = day_of_week + 1 - day < 0 ? week + 1 : week;

				let load = Object.keys(daily_data)
					.map(k => {
						if (k !== "Year" && k !== "Month" && k !== "Day" && k !== "Hr25") {
							return parseInt(daily_data[k]);
						} else {
							return 0;
						}
					})
					.reduce((a, b) => a + b);

				let types = ["high-temp", "low-temp", "event", "festival", "special-weather", "", "", "", ""];
				let type = types[Math.floor(Math.random() * 8)];
				data.push({
					id: index++,
					year,
					month,
					week,
					day,
					day_of_week,
					load,
					type
				});
			}
			return data;
		});
}

function getDayOfWeek(year, month, day) {
	let a = Math.floor((14 - month) / 12);
	let y = year - a;
	let m = month + 12 * a - 2;
	return (day + y + Math.floor(y / 4) - Math.floor(y / 100) +
		Math.floor(year / 400) + Math.floor((31 * m) / 12)) % 7;
}