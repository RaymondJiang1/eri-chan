/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */
const { MessageEmbed } = require('discord.js'),
	moment = require('moment');
(flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
}),
	(stats = {
		dnd: '🔴 Do not disturb',
		online: '🟢 Online',
		offline: '😴 Offline or Invisible',
		streaming: '🟣 Streaming :)',
		idle: '🌙 Idle',
	});

module.exports = {
	aliases: ['ui'],
	category: 'Information',
	cooldown: 5,
	description: "Get's the information of a user in the server",
	name: 'userinfo',
	usage: 'eri!userinfo [member]',
	run: async (client, message, args) => {
		const target = args.slice(' '),
			member =
				message.mentions.members.last() ||
				message.guild.members.cache.get(target) ||
				message.member,
			roles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map((role) => role.toString())
				.slice(0, -1),
			userFlags = member.user.flags.toArray(),
			embed = new MessageEmbed();

		// Modifying the embed
		embed
			.setTitle(`User information for **${message.author.tag}**!`)
			.setThumbnail(member.user.displayAvatarURL)
			.addField('User', [
				`**Username:** ${member.user.username}`,
				`**ID:** ${member.id}`,
				`**Badges:** ${
					userFlags.length
						? userFlags.map((flag) => flags[flag]).join(', ')
						: 'User does not have any badges 😭 '
				}`,
				`**Avatar:** [Link](${member.user.displayAvatarURL({
					dynamic: true,
				})})`,
				`**Time Created:** ${moment(member.user.createdTimestamp).format(
					'LT',
				)} ${moment(member.user.createdTimestamp).format('LL')} ${moment(
					member.user.createdTimestamp,
				).fromNow()}`,
				`**Status:** ${stats[member.user.presence.status]}`,
			])
			.setColor('RANDOM')
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.setFooter(`Command requested by ${message.author.tag}`)
			.setTimestamp(new Date());

		message.channel.send(embed);
	},
};
