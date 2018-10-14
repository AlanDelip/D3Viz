let sound, fft, spinner,
	width = 900,
	height = 900;

function preload() {
	sound = loadSound('feels.mp3');
}

function setup() {
	fft = new p5.FFT();
	sound.amp(0.5);

	// setup for d3
	spinner = d3.select('#music-spinner').append('svg').attr('width', width).attr('height', height);
	sound.loop();
}

let x = d3.scaleLinear().domain([0, 1024]).range([0, width]);
let h = d3.scalePow().exponent(2).domain([0, 255]).range([5, 350]);
let colors = chroma.scale(['orangered', 'orange', 'steelblue']).domain([0, 512]);
let deg = d3.scaleLinear().domain([0, 1024]).range([0, 400]);
let energy = d3.scalePow().exponent(2).domain([0, 255]).range([10, 200]);

function draw() {
	let spectrum = fft.analyze();

	let data = [];
	for (let i = 0; i < spectrum.length; i += 6) {
		data.push({x: x(i), h: spectrum[i], e: fft.getEnergy(spectrum[i])});
	}
	d3.select("svg").remove();
	spinner =
		d3.select('#music-spinner').append('svg').attr('width', width).attr('height', height)
			.append("g")
			.attr("transform", "translate(450, 450)")
			.selectAll("rect").data(data).enter().append("rect")
			.attr("fill", d => colors(d.x))
			.attr("y", d => energy(d.e))
			.attr("height", d => h(d.h))
			.attr("width", 3)
			.attr("transform", d => `rotate(${deg(d.x)})`);
}