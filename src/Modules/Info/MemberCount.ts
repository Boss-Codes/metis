import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class MemberCount extends Command { 
    constructor(){
        super({
            name: 'member-count', 
            module: 'info', 
            description: 'Shows the number of members in the server.\nUse the `full` option to show the status breakdown of all members.', 
            usage: '[full]', 
            example: 'full', 
            requiredGuilds: [], 
            requiredUsers: [], 
            permLevel: CommandPermissions['user'], 
            showOnHelp: true, 
            deleteOnUsage: false, 
            aliases: ['membercount', 'members']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        const data = { 
            embed: { 
                author: { name: `${ctx.guild.name}`, icon_url: ctx.guild.iconURL }, 
                footer: { text: `Server ID: ${ctx.guild.id}`}, 
                timestamp: new Date(), 
                color: metis.colors.default, 
                fields: [ 
                    { name: 'Members', value: `${ctx.guild.members.size}`, inline: true }, 
                    { name: 'Users', value: `${ctx.guild.members.filter(m => !m.bot).length}`, inline: true } , 
                    { name: 'Bots', value: `${ctx.guild.members.filter(m => m.bot).length}`, inline: true }
                ]
            }
        }
        
        if (!ctx.args[0]) {return ctx.channel.createMessage(data)}
        if (ctx.args[0] != 'full'){return ctx.channel.createMessage(data)}

        if (ctx.args[0] === 'full') { 
            ctx.channel.createMessage({
                embed: { 
                    author: { name: `${ctx.guild.name}`, icon_url: `${ctx.guild.iconURL}` },
                    footer: { text: `Server ID: ${ctx.guild.id}` }, 
                    timestamp: new Date, 
                    color: metis.colors.default, 
                    fields: [
                        { name: 'Online', value: `${metis.emotes.online} ${ctx.guild.members.filter(r => r.status === 'online').length}`, inline: true },
                        { name: 'Idle', value: `${metis.emotes.idle} ${ctx.guild.members.filter(r => r.status === 'idle').length}`, inline: true  },
                        { name: 'DnD', value: `${metis.emotes.dnd} ${ctx.guild.members.filter(r => r.status === 'dnd').length}`, inline: true },
                        { name: 'Members', value: `${ctx.guild.members.size}`, inline: true }, 
                        { name: 'Users', value: `${ctx.guild.members.filter(m => !m.bot).length}`, inline: true }, 
                        { name: 'Bots', value: `${ctx.guild.members.filter(m => m.bot).length}`, inline: true },
                        { name: 'Max Members', value: `${ctx.guild.maxMembers}`, inline: true }, 
                        { name: 'Max Presences', value: `${ctx.guild.maxPresences ?? "N/A"}`, inline: true }
                    ]
                }
            })
        }
    }
}

module.exports.cmd = MemberCount; 