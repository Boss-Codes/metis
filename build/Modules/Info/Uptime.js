"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const config = require('../../../config.json');
class Uptime extends Command_1.Command {
    constructor() {
        super({
            name: 'uptime',
            module: 'info',
            description: 'Displays the bot\'s uptime.',
            requiredGuilds: [],
            requiredUsers: [],
            showOnHelp: true,
            enabled: true,
            deleteOnUsage: false,
            aliases: ['up']
        });
    }
    async execute(metis, ctx) {
        let build = 'Prod';
        if (metis.client.user.id === config.metisDevClient) {
            build = 'Dev';
        }
        ctx.channel.createMessage({
            embed: {
                color: metis.colors.default,
                title: 'Uptime',
                description: `${metis.util.formatTime(metis.client.uptime)}`,
                footer: { text: `${metis.client.user.username} | ${build} | PPID: ${process.ppid} | Shard: ${ctx.guild.shard.id}` }
            }
        });
    }
}
module.exports.cmd = Uptime;
