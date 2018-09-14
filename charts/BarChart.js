d3.select('#chart')
	.selectAll('div')
	.data([1, 2, 3])
	.enter()
	.append('div')
	.text(d => d + 'px');
