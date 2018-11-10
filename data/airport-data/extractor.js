const d3 = require('d3');
global.fetch = require("node-fetch");
var fs = require('fs');

d3.json("https://s3-us-west-2.amazonaws.com/alansite/resources/las_vegas_raw.json").then(rawData => {
	d3.json("https://s3-us-west-2.amazonaws.com/alansite/resources/las_vegas_airport.json").then(airportData => {
		let data = {};
		Object.keys(rawData).forEach(k => {
			let restaurant = rawData[k];
			Object.keys(airportData).forEach(ak => {
				if (ak == k && restaurant.price_range) {
					data[k] = restaurant;
				}
			});
		});
		fs.writeFile("/tmp", JSON.stringify(data), function (err) {
			if (err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});
	});
});