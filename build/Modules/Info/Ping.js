"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Ping extends Command_1.Command {
    constructor() {
        super({
            name: 'ping',
            module: 'Info',
            description: 'Displays current bot latency.',
            usage: '',
            example: '',
            permLevel: types_1.CommandPermissions['user'],
            requiredUsers: [],
            requiredGuilds: [],
            deleteOnUsage: false,
            showOnHelp: true,
            enabled: true,
            aliases: ['pong']
        });
    }
    async execute(metis, ctx) {
        metis.client.createGuildCommand('1043755488157913189', {
            name: 'Ping',
            description: 'Pings the bot',
            type: 1,
            defaultPermission: true
        });
        metis.client.createCommand({
            type: 1,
            name: 'ping',
            description: 'Pings the bot'
        });
        const originalTime = Date.now();
        return ctx.channel.createMessage({
            embed: {
                description: `${metis.emotes.info} Ping?`,
                color: metis.colors.blue
            }
        }).then(message => {
            return message.edit({
                embed: {
                    description: `${metis.emotes.info} Pong! \`${Date.now() - originalTime}ms\``,
                    color: metis.colors.blue
                }
            });
        }).catch(() => undefined);
    }
}
module.exports.cmd = Ping;
