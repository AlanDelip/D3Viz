const caniuse = require('caniuse-api');

const features = ["display", "flexbox", "serviceworkers"];

features.forEach(f => {
	try {
		console.log(caniuse.getSupport(f));
	} catch (e) {
		// didn't find the feature
		console.log(e)
	}
});
