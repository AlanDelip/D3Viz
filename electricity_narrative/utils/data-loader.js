const d3 = require("d3");

export function loadData() {
	return d3.json("https://s3-us-west-2.amazonaws.com/alansite/resources/ny_load_1711-1810.json").then(res => res);
}

function getDayOfWeek(year, month, day) {
	let a = Math.floor((14 - month) / 12);
	let y = year - a;
	let m = month + 12 * a - 2;
	return (day + y + Math.floor(y / 4) - Math.floor(y / 100) +
		Math.floor(year / 400) + Math.floor((31 * m) / 12)) % 7;
}