const mongoose = require('mongoose'),
	config = require('../config.json');
schema = new mongoose.Schema({
	guildID: String,
	prefix: {
		type: String,
		default: config.discordBotConfig.prefix,
	},
	welcomeChannel: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('Guild', schema);
