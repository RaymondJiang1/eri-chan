/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const ms = require('ms'),
	{ MessageEmbed } = require('discord.js');

module.exports = {
	aliases: [],
	category: 'Information',
	cooldown: 5,
	description: "Get's the uptime of the bot, Eri Chan",
	name: 'uptime',
	usage: 'eri!uptime',
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setTitle('Uptime!')
			.addField('Uptime: ', `\`${ms(client.uptime, { long: true })}\``)
			.setColor('RANDOM')
			.setFooter(`Command was requested by ${message.author.tag}.`)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp(new Date());

		message.channel.send(embed);
	},
};
