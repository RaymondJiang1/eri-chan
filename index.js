/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

// importing modules
const { Client, Collection } = require('discord.js'),
	Sentry = require('@sentry/node'),
	config = require('./config.json'),
	Logger = require('./util/Logger'),
	mongoose = require('mongoose'),
	client = new Client({
		disableMentions: 'everyone',
	});

// Collections
client.commands = new Collection();
client.aliases = new Collection();
const cooldowns = new Collection();

// Command Loader
['command'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

// Events
client
	// Ready Event
	.on('ready', () => {
		// Connect to Sentry
		if (config.apikeys.sentrydsn) {
			// Try and catch to connect to Sentry
			try {
				Sentry.init({ dsn: config.apikeys.sentrydsn });
				Logger.info('Connected to Sentry!');
			} catch (e) {
				Logger.error(e);
			}
		}
		mongoose
			.connect(config.discordBotConfig.mongodburl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => Logger.info('Connected to the mongodb database!'));
		// Logs, Eri Chan has logged in when it has logged in
		Logger.info('Eri Chan has logged in!');
	})
	// Message Event
	.on('message', async (message) => {
		const mention = RegExp(`^<@!${client.user.id}>$`);
		// Set the prefix variable
		const prefix = config.discordBotConfig.prefix;

		if (message.content.match(mention)) {
			return message.channel.send(
				`My prefix for ${message.guild.name} is \`${config.discordBotConfig.prefix}\``,
			);
		}
		// If the author is a bot, if the message is not sent in a server, or if the message does not start with the prefix, then it will return nothing
		if (
			message.author.bot ||
			!message.guild ||
			!message.content.startsWith(prefix)
		)
			return;

		// Defining
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();

		if (cmd.length === 0) return;

		let command = client.commands.get(cmd);
		if (!command) command = client.commands.get(client.aliases.get(cmd));

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 1) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(
						1,
					)} more second(s) before reusing the \`${command.name}\` command.`,
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.run(client, message, args);
		} catch (error) {
			Logger.error(error);
			message.reply(
				`There was an error executing the command \`${command.name}\`.`,
			);
		}
	});

// Logins in the discord bot
client.login(config.discordBotConfig.token);
