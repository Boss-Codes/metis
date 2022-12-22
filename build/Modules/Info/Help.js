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
        // our specific commands 
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
        ctx.channel.createMessage(error);
    }
}
module.exports.cmd = Help;
