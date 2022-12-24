"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Help extends Command_1.Command {
    constructor() {
        super({
            name: 'help',
            module: 'info',
            description: 'Lists the bot\'s commands or gives information on a specific command.',
            usage: '[command name]',
            example: 'serverinfo',
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            showOnHelp: true,
            permLevel: types_1.CommandPermissions['user'],
            enabled: true,
            aliases: ['command-info']
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args) {
            return ctx.channel.createMessage('**Commands List**\n <https://github.com/Boss-Codes/metis-ts/wiki/Commands>\n\n**Bot Support Server**\nhttps://discord.gg/mePghx6dQy');
        }
        const cmd = metis.commands.get(ctx.args[0]) || metis.commands.find(cmd => cmd.aliases && cmd.aliases.includes(ctx.args[0]));
        const moduleArray = ['info', 'dev'];
        if (!moduleArray.includes(ctx.args[0].toLowerCase())) {
            return ctx.channel.createMessage({
                embeds: [{
                        color: metis.colors.red,
                        description: `${metis.emotes.error} I could not find that command or module.`,
                    }],
                flags: 64,
                components: [{
                        type: 1,
                        components: [{
                                type: 2,
                                style: 5,
                                label: "Command List",
                                url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands'
                            },
                            {
                                type: 2,
                                style: 5,
                                label: 'Support Server',
                                url: 'https://discord.gg/mePghx6dQy'
                            }],
                    }],
            });
        }
        const mCmds = metis.commands.filter(c => c.module === ctx.args[0].toLowerCase());
        if (!cmd) {
            return ctx.channel.createMessage({
                embeds: [{
                        color: metis.colors.red,
                        description: `${metis.emotes.error} I could not find that command or module.`,
                    }],
                flags: 64,
                components: [{
                        type: 1,
                        components: [{
                                type: 2,
                                style: 5,
                                label: "Command List",
                                url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands'
                            },
                            {
                                type: 2,
                                style: 5,
                                label: 'Support Server',
                                url: 'https://discord.gg/mePghx6dQy'
                            }],
                    }],
            });
        }
        if (ctx.args[0] === 'Dev' && !metis.developer.includes(ctx.user.id) || ctx.args[0] === 'dev' && !metis.developer.includes(ctx.user.id)) {
            return ctx.channel.createMessage({
                embeds: [{
                        color: metis.colors.red,
                        description: `${metis.emotes.error} I could not find that command or module.`,
                    }],
                flags: 64,
                components: [{
                        type: 1,
                        components: [{
                                type: 2,
                                style: 5,
                                label: "Command List",
                                url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands'
                            },
                            {
                                type: 2,
                                style: 5,
                                label: 'Support Server',
                                url: 'https://discord.gg/mePghx6dQy'
                            }],
                    }]
            });
        }
        if (cmd.module === 'Dev' && !metis.developer.includes(ctx.user.id)) {
            return ctx.channel.createMessage({
                embeds: [{
                        color: metis.colors.red,
                        description: `${metis.emotes.error} I could not find that command or module.`,
                    }],
                flags: 64,
                components: [{
                        type: 1,
                        components: [{
                                type: 2,
                                style: 5,
                                label: "Command List",
                                url: 'https://github.com/Boss-Codes/metis-ts/wiki/Commands'
                            },
                            {
                                type: 2,
                                style: 5,
                                label: 'Support Server',
                                url: 'https://discord.gg/mePghx6dQy'
                            }],
                    }],
            });
        }
        const module = {
            embed: {
                color: metis.colors.blue,
                description: mCmds.map(c => `\`${cmd}\``).join('\n')
            }
        };
        const data = {
            embed: {
                color: metis.colors.blue,
                title: `${cmd.module.toLowerCase()}:${cmd.name}`,
                description: cmd.description,
                fields: []
            }
        };
        if (cmd.usage) {
            data.embed.fields.push({
                name: 'Usage:',
                value: `\`${cmd.name} ${cmd.usage}\``
            });
        }
        else {
            data.embed.fields.push({
                name: 'Usage:',
                value: `\`${cmd.name}\``
            });
        }
        if (cmd.example) {
            data.embed.fields.push({
                name: 'Example:',
                value: `\`${cmd.name} ${cmd.example}\``
            });
        }
        if (cmd.aliases) {
            data.embed.fields.push({
                name: 'Aliases:',
                value: cmd.aliases.map(a => `\`${a}\``).join(", ")
            });
        }
        if (cmd.permLevel === 0) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: 'User'
            });
        }
        if (cmd.permLevel === 1) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: 'Server Moderator'
            });
        }
        if (cmd.permLevel === 2) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: 'Server Manager'
            });
        }
        if (cmd.permLevel === 3) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: 'Support Staff'
            });
        }
        if (cmd.permLevel === 4) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: 'Developer'
            });
        }
        if (moduleArray.includes(ctx.args[0].toLowerCase())) {
            ctx.channel.createMessage(module);
        }
        if (cmd) {
            ctx.channel.createMessage(data);
        }
    }
}
module.exports.cmd = Help;
