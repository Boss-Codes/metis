"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Avatar extends Command_1.Command {
    constructor() {
        super({
            name: 'avatar',
            description: 'Sends a user\'s avatar or your own.',
            module: 'info',
            usage: 'avatar [user]',
            example: 'avatar\navatar boss',
            permLevel: types_1.CommandPermissions['user'],
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            showOnHelp: true,
            enabled: true,
            aliases: ['av']
        });
    }
    async execute(metis, ctx) {
        let Member = await metis.resolver.member(ctx.msg, ctx.guild, ctx.args.join(" "));
        if (!Member) {
            Member = ctx.member;
        }
        ctx.channel.createMessage({
            embed: {
                author: { name: `${metis.util.getFullName(await metis.client.getRESTUser(Member.id))}`, icon_url: Member.avatarURL },
                image: { url: Member.avatarURL }
            }
        });
    }
}
module.exports.cmd = Avatar;
