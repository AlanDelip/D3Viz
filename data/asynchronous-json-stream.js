const oboe = require('oboe');

oboe("https://raw.githubusercontent.com/AlanDelip/D3Viz/master/data/las_vegas_stream.json")
	.node('{id name}', res => {
		// manipulating each node containing id and name
	});
