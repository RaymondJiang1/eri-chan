/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */
const { MessageEmbed } = require('discord.js'),
	moment = require('moment'),
	filterLevels = {
		DISABLED: 'Off',
		MEMBERS_WITHOUT_ROLES: 'No Role',
		ALL_MEMBERS: 'Everyone',
	},
	verificationLevels = {
		NONE: 'None',
		LOW: 'Low',
		MEDIUM: 'Medium',
		HIGH: '(╯°□°）╯︵ ┻━┻',
		VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
	},
	regions = {
		'brazil': '🇧🇷 Brazil',
		'europe': '🇪🇺 Europe',
		'hongkong': '🇭🇰 Hong Kong',
		'india': '🇮🇳 India',
		'japan': '🇯🇵 Japan',
		'russia': '🇷🇺 Russia',
		'singapore': '🇸🇬 Singapore',
		'southafrica': '🇿🇦 South Africa',
		'sydney': '🇦🇺 Sydney',
		'us-central': '🇺🇸 US Central',
		'us-east': '🇺🇸 US East',
		'us-west': '🇺🇸 US West',
		'us-south': '🇺🇸 US South',
	};

module.exports = {
	aliases: ['si'],
	category: 'Information',
	cooldown: 5,
	description: "Get's the information about the server",
	name: 'serverinfo',
	usage: 'eri!serverinfo',
	run: async (client, message, args) => {
		(members = message.guild.members.cache), (embed = new MessageEmbed());

		embed
			.setDescription(`**Guild information for *${message.guild.name}***`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`** Name:** ${message.guild.name}`,
				`** ID:** ${message.guild.id}`,
				`** Owner:** ${message.guild.owner.user.tag}`,
				`** Region:** ${regions[message.guild.region]}`,
				`** Boost Tier:** ${
					message.guild.premiumTier
						? `Tier ${message.guild.premiumTier}`
						: 'Not available'
				}`,
				`** Explicit Filter:** ${
					filterLevels[message.guild.explicitContentFilter]
				}`,
				`** Verification Level:** ${
					verificationLevels[message.guild.verificationLevel]
				}`,
				`** Time Created:** ${moment(message.guild.createdTimestamp).format(
					'LT',
				)} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(
					message.guild.createdTimestamp,
				).fromNow()}`,
				`** You joined at:** ${moment(message.guild.joinedAt).format(
					'LT',
				)} ${moment(message.guild.joinedAt).format('LL')} ${moment(
					message.guild.joinedAt,
				).fromNow()}`,
				'\u200b',
			])
			.addField('Presence', [
				`** 🟢 Online:** ${
					members.filter((member) => member.presence.status === 'online').size
				}`,
				`** 🟣 Streaming:** ${
					message.guild.members.cache.filter(
						(m) =>
							m.presence.activities.find((a) => a.type === 'STREAMING') &&
							m.user.bot !== true,
					).size
				}`,
				`** 🟡 Idle:** ${
					members.filter((member) => member.presence.status === 'idle').size
				}`,
				`** 🔴 DND:** ${
					members.filter((member) => member.presence.status === 'dnd').size
				}`,
				`** 😴 Offline:** ${
					members.filter((member) => member.presence.status === 'offline').size
				}`,
				'\u200b',
			])
			.setTimestamp(new Date())
			.setFooter(`Command requested by ${message.author.tag}`);

		message.channel.send(embed);
	},
};
