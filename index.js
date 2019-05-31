var converter = require("converter");
var mjAPI = require("mathjax-node");

mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();

module.exports = {
	async converter(event, context) {
		var latex_string = 'E = mc^2';
		const svg = await converter.convert(latex_string);
		console.log({svg});
		context.succeed(JSON.stringify(svg));
	}
};