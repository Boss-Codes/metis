"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Help extends Command_1.Command {
    constructor() {
        super({
            name: 'help',
            module: 'Info',
            description: 'Lists the bot\'s commands or gives information on a specific command.',
            usage: '[command name]',
            example: 'serverinfo',
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            showOnHelp: true,
            permLevel: types_1.CommandPermissions['user'],
            enabled: true,
            aliases: []
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args) {
            return ctx.channel.createMessage('**Commands List**\n <https://github.com/Boss-Codes/metis-ts/wiki/Commands>\n\n**Bot Support Server**\nhttps://discord.gg/mePghx6dQy');
        }
        const error = {
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
        };
        const cmd = metis.commands.get(ctx.args.join(' '));
        const foundModule = metis.commands.filter(r => r.module === ctx.args.join(' '));
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
        // perm level better
        let cmdPerm = '';
        if (cmd.permLevel === 0) {
            cmdPerm = 'User';
        }
        if (cmd.permLevel === 1) {
            cmdPerm = 'Moderator';
        }
        if (cmd.permLevel === 2) {
            cmdPerm = 'Server Manager';
        }
        if (cmd.permLevel === 3) {
            cmdPerm = 'Support Staff';
        }
        if (cmd.permLevel === 4) {
            cmdPerm = 'Developer';
        }
        const data = {
            embed: {
                color: metis.colors.blue,
                title: `${cmd.module}:${cmd.module}`,
                description: cmd.description,
                fields: [
                    { name: 'Usage:', value: `\`${cmd.usage}\`` },
                    { name: 'Examples:', value: `\`${cmd.example}\`` }
                ]
            }
        };
        if (cmd.aliases) {
            data.embed.fields.push({
                name: 'Aliases:',
                value: cmd.aliases.map(a => `\`${a}\``).join(", ")
            });
        }
        if (cmd.permLevel) {
            data.embed.fields.push({
                name: 'Permissions:',
                value: cmdPerm
            });
        }
        if (cmd) {
            ctx.channel.createMessage(data);
        }
    }
}
module.exports.cmd = Help;
