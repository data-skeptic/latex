const converter = require('../converter')

describe('converter', () => {

  it('converts latex expressions to svgs.', async () => {
  	const latex_string = "e^{ \pm i\theta } = \cos \theta \pm i\sin \theta";
	const result = await converter.convert_and_save(latex_string);
	const svg = result['svg']
	const n = svg.length;
    expect(svg.substring(0,4)).toBe("<svg");
    expect(svg.substring(n-6,n)).toBe("</svg>");
    expect(n).toBe(8767);
  });

});
