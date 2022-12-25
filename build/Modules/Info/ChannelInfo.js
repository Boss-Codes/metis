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
            usage: 'channel-info <name | id | mention>',
            example: 'channel-info bot_commands\nchannel-info 1043756344223735908\nchannel-info #main_chat',
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
                    ],
                    footer: { text: `Created: ${metis.util.formatDate(channel.createdAt)} at ${new Date(channel.createdAt).toLocaleTimeString('en-us', { timeZone: 'America/New_York' })}` }
                }
            });
        }
    }
}
module.exports.cmd = ChannelInfo;
