import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions, ChannelTypes} from "../../types";
import {Channel} from "eris";
class ChannelInfo extends Command { 
    constructor(){
        super({
            name: 'channel-info', 
            module: 'info', 
            description: 'Shows various information on a given channel.\nSupports `text` or `voice` channels.', 
            usage: '<channel name | id | mention>', 
            example: '#bot_commands', 
            requiredGuilds: [], 
            permLevel: CommandPermissions['user'], 
            requiredUsers: [], 
            showOnHelp: true, 
            deleteOnUsage: false, 
            enabled: true, 
            aliases: ['channel', 'channel-information']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        let channel = ctx.guild.channels.get(ctx.args[0]) || ctx.guild.channels.find(c => c.name === ctx.args[0]) 
        if (!channel && ctx.msg.channelMentions && ctx.msg.channelMentions[0]) { 
            channel = ctx.guild.channels.get(ctx.msg.channelMentions[0])
        }
        if (!channel) {channel = ctx.guild.channels.get(ctx.channel.id)} 

        let perms = channel.permissionOverwrites.filter(c => c.id != ctx.guild.id).map(c => c.id)
        let r1 = []
        perms.forEach(r => r1.push(ctx.guild.roles.get(r)))
        const sortedRoles = r1.sort((a, b) => b.position - a.position)
        const roleList = sortedRoles.map(r => r.mention).join(', ')

        if (channel.type === ChannelTypes['guildText']) { 
            ctx.channel.createMessage({ 
                embed: { 
                    color: metis.colors.blue, 
                    author: { name: 'Channel Information' }, 
                    fields: [
                        { name: 'ID', value: channel.id, inline: true }, 
                        { name: 'Name', value: channel.name, inline: true }, 
                        { name: 'Mention', value: `\`${channel.mention}\``, inline: true }, 
                        { name: 'Category', value: `${ctx.guild.channels.get(channel.parentID).name}`, inline: true }, 
                        { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true}, 
                        { name: 'Channel Topic', value: channel.topic || 'None'}, 
                        { name: `Roles (${perms.length})`, value: roleList}
                    ],
                    footer: { text: `Created: ${metis.util.formatDate(channel.createdAt)} at ${new Date(channel.createdAt).toLocaleTimeString('en-us', {timeZone: 'America/New_York'})}`}
                }
            })
        }

        if (channel.type === ChannelTypes['guildVoice']) { 
            ctx.channel.createMessage({ 
                embed: { 
                    color: metis.colors.blue, 
                    author: { name: 'Channel Information' }, 
                    fields: [
                        { name: 'ID', value: channel.id, inline: true }, 
                        { name: 'Name', value: channel.name, inline: true }, 
                        { name: 'Mention', value: `\`${channel.mention}\``, inline: true }, 
                        { name: 'Category', value: `${ctx.guild.channels.get(channel.parentID).name}`, inline: true }, 
                        { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true}, 
                        { name: 'Connected Members', value: `${channel.voiceMembers.size}`, inline: true}, 
                        { name: 'User Limit', value: `${channel.userLimit}`},
                        { name: `Roles (${perms.length})`, value: roleList}
                    ],
                    footer: { text: `Created: ${metis.util.formatDate(channel.createdAt)} at ${new Date(channel.createdAt).toLocaleTimeString('en-us', {timeZone: 'America/New_York'})}`}
                }
            })
        }
    }
}
module.exports.cmd = ChannelInfo;