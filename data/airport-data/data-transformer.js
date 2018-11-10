const fs = require('fs');
const d3 = require('d3');
global.fetch = require('node-fetch');

d3.json("https://raw.githubusercontent.com/AlanDelip/D3Viz/master/data/las_vegas_raw.json").then(res => {
	let data = [];
	Object.keys(res).forEach(k => {
		res[k].id = parseInt(k);
		data.push(res[k]);
	});

	fs.writeFileSync('las_vegas_stream.json', JSON.stringify(data), res => {
		console.log("The file was saved!");
	});
});
