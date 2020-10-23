/*
 * Eri Chan bot for discord
 * Copyright (C) 2020 Raymond Jiang
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */
const { readdirSync } = require('fs'),
	ascii = require('ascii-table');

let table = new ascii('Commands').setHeading('Command', 'Load status');

module.exports = (client) => {
	readdirSync('./commands/').forEach((dir) => {
		const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
			file.endsWith('.js'),
		);

		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`);

			try {
				if (!pull.name)
					throw new TypeError(`Please provide a name for the command ${pull}`);
				if (!pull.category)
					throw new TypeError(
						`Please provide a category for the command ${pull}`,
					);
				if (!pull.description)
					throw new TypeError(
						`Please provide a description for the command ${pull}`,
					);
				if (!pull.cooldown)
					throw new TypeError(
						`Please provide a cooldown for the command ${pull}`,
					);
				if (!pull.usage)
					throw new TypeError(`Please provide a usage for the command ${pull}`);
				if (typeof pull.name !== 'string')
					throw new TypeError(`${pull.name} is not a string`);
				if (typeof pull.category !== 'string')
					throw new TypeError(`${pull.category} is not a string!`);
				if (typeof pull.description !== 'string')
					throw new TypeError(`${pull.description} is not a string!`);
				if (typeof pull.cooldown !== 'number')
					throw new TypeError(`${pull.cooldown} is not a number!`);
				if (typeof pull.usage !== 'string')
					throw new TypeError(`${pull.usage} is not a string!`);
				if (pull.name) {
					client.commands.set(pull.name, pull);
					table.addRow(file, '✅');
				}
			} catch (error) {
				table.addRow(file, `❌ => ${error}`);
				continue;
			}

			if (pull.aliases && Array.isArray(pull.aliases))
				pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
		}
	});
	console.log(table.toString());
};
