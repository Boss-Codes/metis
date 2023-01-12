"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Ping extends Command_1.Command {
    constructor() {
        super({
            name: 'ping',
            module: 'info',
            description: 'Displays current bot latency.',
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
        return ctx.channel.createMessage({
            embed: {
                color: metis.colors.blue,
                fields: [
                    { name: 'Message Round Trip', value: `<a:metisGear:1046881466015039589>` },
                ],
            }
        }).then(message => {
            return message.edit({
                embed: {
                    color: metis.colors.blue,
                    fields: [
                        { name: 'Message Round Trip', value: `\`${message.timestamp - ctx.msg.timestamp}ms\`` },
                    ]
                }
            });
        }).catch(() => undefined);
    }
}
module.exports.cmd = Ping;
