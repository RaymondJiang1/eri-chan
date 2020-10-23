/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const LavaLinkManager = require('../../managers/LavaLinkManager');

module.exports = {
	aliases: ['p'],
	category: 'Music',
	cooldown: 5,
	description: 'Plays the song specified',
	name: 'play',
	usage: 'eri!play <song | link>',
	run: async (client, message, args) => {
		if (!args.length) return message.reply('Please provide a song name');

		const { channel } = message.member.voice;
		if (!channel || !channel.joinable)
			return message.reply('Oops, I cannot join that voice channel!');

		const player =
			client.music.players.get(message.guild.id) ||
			(await client.music.create(message.guild.id));

		if (player.playing) return message.reply('A song is already playing.');

		const { tracks } = await LavaLinkManager.search(
			args.join(' ').includes(https)
				? encodeURI(args.join(' '))
				: `scsearch:${encodeURIComponent(args.join(' '))}`,
		);

		if (!tracks.length)
			return message.reply(
				`Nothing was found for your search query \`${args.join(' ')}\``,
			);

		if (!player._connected)
			await player.connect(channel.id, { selfDeaf: true });

		if (!player.playing && !player.paused) await player.play(tracks[0].track);

		message.channel.send(`Now playing: ${tracks[0].info.title}`);

		player.on('end', async () => {
			await client.music.destroy(message.guild.id);

			return message.channel.send('Song has ended!');
		});
	},
};
