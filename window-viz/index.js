const d3 = require("d3");
const $ = require("jquery");
const SupportPlot = require("./support-plot");

/***********************************INTRO***********************************/
{
	const clipLength = 8;
	const bannerClass = [".img-1", ".img-2", ".img-3", ".img-4"];

	function randomDelay() {
		$(".banner-img").css("transition-delay", (Math.floor(Math.random() * 9) + 4) / 10 + "s");
		for (let i = 1; i <= clipLength; i++) {
			$(".banner-img:nth-child(8n+" + i + ")").css("transition-delay", (Math.floor(Math.random() * 9) + 4) / 10 + "s");
		}
	}

	function transform(imgIndex, yDis) {
		$(bannerClass[imgIndex]).css("transform", `translateY(${yDis}%)`);
	}

	(function autoPlay() {
		let currentBannerIndex = 0;
		let currentDis = -100;
		let forward = true;
		let progress = 0;
		setInterval(() => {
			randomDelay();
			if (currentBannerIndex === bannerClass.length - 1) {
				if (forward) {
					forward = !forward;
					currentDis = 0;
					transform(--currentBannerIndex, currentDis);
				}
			} else if (currentBannerIndex === 0) {
				if (!forward) {
					transform(currentBannerIndex--, currentDis);
					forward = !forward;
					currentDis = -100;
				} else {
					transform(currentBannerIndex, currentDis);
				}
			} else {
				transform(currentBannerIndex, currentDis);
			}

			if (forward) {
				currentBannerIndex++;
			} else {
				currentBannerIndex--;
			}

		}, 10000);
	})();
}

/***********************************TRANSFORMATION***********************************/
{
	let fullG = d3.select('#full')
		.append('g')
		.attr('stroke', '#a58064')
		.attr('stroke-width', 2);

	fullG.append('rect')
		.attr('fill', '#fff141')
		.attr("x", 5)
		.attr("y", 5)
		.attr("width", 28)
		.attr("height", 24);

	fullG.append('rect')
		.attr('fill', '#fff141')
		.attr("x", 5)
		.attr("y", 30)
		.attr("width", 28)
		.attr("height", 24);

	let halfG = d3.select('#half')
		.append('g')
		.attr('stroke', '#a58064')
		.attr('stroke-width', 2);

	halfG.append('rect')
		.attr('fill', 'transparent')
		.attr("x", 5)
		.attr("y", 5)
		.attr("width", 28)
		.attr("height", 24);

	halfG.append('rect')
		.attr('fill', '#fff141')
		.attr("x", 5)
		.attr("y", 30)
		.attr("width", 28)
		.attr("height", 24);

	let noneG = d3.select('#none')
		.append('g')
		.attr('stroke', '#a58064')
		.attr('stroke-width', 2);

	noneG.append('rect')
		.attr('fill', 'transparent')
		.attr("x", 5)
		.attr("y", 5)
		.attr("width", 28)
		.attr("height", 24);

	noneG.append('rect')
		.attr('fill', 'transparent')
		.attr("x", 5)
		.attr("y", 30)
		.attr("width", 28)
		.attr("height", 24);

}

/***********************************CASE***********************************/
{

}
