import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
import {Member, Role} from "eris";
class Avatar extends Command { 
    constructor(){
        super({
            name: 'avatar', 
            description: 'Sends a user\'s avatar or your own.', 
            module: 'info', 
            usage: '[user]', 
            example: 'boss', 
            permLevel: CommandPermissions['user'], 
            requiredGuilds: [], 
            requiredUsers: [], 
            deleteOnUsage: false, 
            showOnHelp: true, 
            enabled: true,
            aliases: ['av']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        let Member: Member = await metis.resolver.member(ctx.msg, ctx.guild, ctx.args.join(" "))
        if (!Member){Member = ctx.member}

        ctx.channel.createMessage({ 
            embed: { 
                author: { name: `${metis.util.getFullName(await metis.client.getRESTUser(Member.id))}`, icon_url: Member.avatarURL}, 
                image: { url: Member.avatarURL }
            }
        })
        
    }
}
module.exports.cmd = Avatar;