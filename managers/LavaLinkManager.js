const { nodes } = require('../config.json'),
	fetch = require('node-fetch');

class LavaLinkManager {
	static async search(track) {
		const { host, port, password } = nodes[0];
		return await (
			await fetch(`https://${host}:${port}/loadtracks?identifier=${track}`, {
				headers: {
					authorization: password,
				},
			})
		).json();
	}
}

module.exports = LavaLinkManager;
