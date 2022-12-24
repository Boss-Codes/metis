"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class ChannelInfo extends Command_1.Command {
    constructor() {
        super({
            name: 'channel-info',
            module: 'info',
            description: 'Shows various information on a given channel.\nSupports `text` or `voice` channels.',
            usage: '<name | id | mention>',
            example: '#bot_commands',
            requiredGuilds: [],
            permLevel: types_1.CommandPermissions['user'],
            requiredUsers: [],
            showOnHelp: true,
            deleteOnUsage: false,
            enabled: true,
            aliases: ['channel', 'channel-information', 'channelinfo']
        });
    }
    async execute(metis, ctx) {
        let channel = ctx.guild.channels.get(ctx.args[0]) || ctx.guild.channels.find(c => c.name === ctx.args[0]);
        if (!channel && ctx.msg.channelMentions && ctx.msg.channelMentions[0]) {
            channel = ctx.guild.channels.get(ctx.msg.channelMentions[0]);
        }
        if (!channel) {
            channel = ctx.guild.channels.get(ctx.channel.id);
        }
        let perms = channel.permissionOverwrites.filter(c => c.id != ctx.guild.id).map(c => c.id);
        let r1 = [];
        perms.forEach(r => r1.push(ctx.guild.roles.get(r)));
        const sortedRoles = r1.sort((a, b) => b.position - a.position);
        const roleList = sortedRoles.map(r => r.mention).join(', ');
        if (channel.type === types_1.ChannelTypes['guildText']) {
            ctx.channel.createMessage({
                embed: {
                    color: metis.colors.blue,
                    author: { name: 'Channel Information' },
                    fields: [
                        { name: 'ID', value: channel.id, inline: true },
                        { name: 'Name', value: channel.name, inline: true },
                        { name: 'Mention', value: `\`${channel.mention}\``, inline: true },
                        { name: 'Category', value: `${ctx.guild.channels.get(channel.parentID).name}`, inline: true },
                        { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true },
                        { name: 'Channel Topic', value: channel.topic || 'None' },
                        { name: `Roles (${perms.length})`, value: roleList ?? `${metis.emotes.error} An unexpected error has occured.` }
                    ],
                    footer: { text: `Created: ${metis.util.formatDate(channel.createdAt)} at ${new Date(channel.createdAt).toLocaleTimeString('en-us', { timeZone: 'America/New_York' })}` }
                }
            });
        }
        if (channel.type === types_1.ChannelTypes['guildVoice']) {
            ctx.channel.createMessage({
                embed: {
                    color: metis.colors.blue,
                    author: { name: 'Channel Information' },
                    fields: [
                        { name: 'ID', value: channel.id, inline: true },
                        { name: 'Name', value: channel.name, inline: true },
                        { name: 'Mention', value: `\`${channel.mention}\``, inline: true },
                        { name: 'Category', value: `${ctx.guild.channels.get(channel.parentID).name}`, inline: true },
                        { name: 'NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true },
                        { name: 'Connected Members', value: `${channel.voiceMembers.size}`, inline: true },
                        { name: 'User Limit', value: `${channel.userLimit}` },
                        { name: `Roles (${perms.length})`, value: roleList }
                    ],
                    footer: { text: `Created: ${metis.util.formatDate(channel.createdAt)} at ${new Date(channel.createdAt).toLocaleTimeString('en-us', { timeZone: 'America/New_York' })}` }
                }
            });
        }
    }
}
module.exports.cmd = ChannelInfo;
