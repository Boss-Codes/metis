"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Discriminator extends Command_1.Command {
    constructor() {
        super({
            name: 'discriminator',
            module: 'info',
            description: 'Gets a list of users with a discriminator.',
            usage: '[discriminator]',
            example: '#1353',
            permLevel: types_1.CommandPermissions['user'],
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            showOnHelp: true,
            enabled: true,
            aliases: ['discrim']
        });
    }
    async execute(metis, ctx) {
        const discrim = ctx.args.length ? ctx.args[0] : ctx.user.discriminator;
        let users = metis.client.users.filter(r => r.discriminator === discrim).map(u => metis.util.getFullName(u));
        if (!users || !users.length) {
            return this.error(ctx.channel, `I couldn't find any results for ${discrim}`);
        }
        users = users.slice(0, 10);
        return ctx.channel.createMessage({
            embed: {
                color: metis.colors.blue,
                description: users.join('\n')
            }
        });
    }
}
module.exports.cmd = Discriminator;
