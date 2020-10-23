/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */
const { MessageEmbed } = require('discord.js');

module.exports = {
	aliases: ['pong'],
	category: 'Information',
	cooldown: 5,
	description: "Get's the latency from the bot to the discord API",
	name: 'ping',
	usage: 'eri!ping',
	run: async (client, message, args) => {
		const msg = await message.channel.send('Pinging...'),
			latency = msg.createdTimestamp - message.createdTimestamp,
			choices = [
				'Is this really my ping?',
				'Is this okay? I can not look!',
				'I hope it is not bad!',
			],
			response = choices[Math.floor(Math.random() * choices.length)],
			embed = new MessageEmbed()
				.setTitle('Pong!')
				.addField('Message:', response)
				.addField('⌛ Bot Latency: ', `\`${latency}ms\``)
				.addField('⏱️ API Latency: ', `\`${Math.round(client.ws.ping)}ms\``)
				.setColor('RANDOM')
				.setFooter(`Command was requested by ${message.author.tag}`)
				.setTimestamp(new Date());

		msg.edit(embed);
	},
};
