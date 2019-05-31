const AWS = require('aws-sdk');
require('iconv-lite').encodingExists('UTF-8');
const mjAPI = require("mathjax-node");

mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();


module.exports = {

	async convert_and_save(latex_string) {
		const svg = await this.convert(latex_string)
		const filename = encodeURIComponent(latex_string) + '.svg'
		var s3 = new AWS.S3();
		const resp = await s3.upload({
			Bucket: 'latex-svgs',
			Key: filename,
			Body: svg,
			ACL: 'public-read'
		}).promise();
		console.log({b:resp.Location})
		result = {svg}
		result['url'] = `https://latex.dataskeptic.com/${filename}`
		//console.log({result})
		return result
	},

	async convert(latex_string) {
		const resp = await mjAPI.typeset({
			math: latex_string,
			format: "TeX", // or "inline-TeX", "MathML"
			svg:true,      // or mml:true, or html:true
		})
		if (!resp.errors) {
		  	return resp.svg
		}
		throw new Exception(resp.errors)
	}

}