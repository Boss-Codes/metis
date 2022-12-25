"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class ServerInfo extends Command_1.Command {
    constructor() {
        super({
            name: 'server-info',
            module: 'info',
            description: 'Gives information about the server.',
            requiredGuilds: [],
            requiredUsers: [],
            deleteOnUsage: false,
            enabled: true,
            showOnHelp: true,
            permLevel: types_1.CommandPermissions['user'],
            aliases: ['server', 'serverinfo', 'si']
        });
    }
    async execute(metis, ctx) {
        const guild = ctx.guild;
        let owner = guild.members.get(guild.ownerID);
        if (!owner === null) {
            owner = 'Not cached';
        }
        const members = guild.members.size;
        const bots = guild.members.filter(r => r.bot).length;
        const users = guild.members.filter(r => !r.bot).length;
        const online = guild.members.filter(r => r.status === 'online').length;
        const idle = guild.members.filter(r => r.status === 'idle').length;
        const dnd = guild.members.filter(r => r.status === 'dnd').length;
        const m = (online + idle + dnd);
        const offline = (guild.members.size - m);
        const roles = guild.roles.filter(r => r.id !== guild.id).sort((a, b) => b.position - a.position).map(r => r.mention).join(', ');
        const createdAt = `${metis.util.formatDate(guild.createdAt)}\n(${new Date(guild.createdAt).toLocaleTimeString('en-us', { timeZone: 'America/New_York' })})`;
        // verification level, 2fa, explicit content 
        let vLevel = guild.verificationLevel;
        if (vLevel === 0) {
            vLevel = 'None';
        }
        if (vLevel === 1) {
            vLevel = 'Low';
        }
        if (vLevel === 2) {
            vLevel = 'Medium';
        }
        if (vLevel === 3) {
            vLevel = 'High';
        }
        if (vLevel === 4) {
            vLevel = 'Extreme';
        }
        let mfa = guild.mfaLevel;
        if (mfa === 0) {
            mfa = 'Not Required';
        }
        if (mfa === 1) {
            mfa = 'Required';
        }
        let expl = guild.explicitContentFilter;
        if (expl === 0) {
            expl = 'Off';
        }
        if (expl === 1) {
            expl = 'On for people without roles';
        }
        if (expl === 2) {
            expl = 'On for everyone';
        }
        let large = guild.large;
        if (large) {
            large = 'Yes';
        }
        else {
            large = 'No';
        }
        const data = {
            embed: {
                description: '',
                footer: { text: `ID: ${guild.id}` },
                color: metis.colors.default,
                thumbnail: { url: guild.iconURL },
                author: { name: `${guild.name}`, icon_url: guild.iconURL },
                fields: [
                    { name: 'Server Owner', value: `${metis.util.getFullName(await metis.client.getRESTUser(ctx.guild.ownerID))}\n<@!${guild.ownerID}>`, inline: true },
                    { name: 'Created At', value: createdAt, inline: true },
                    { name: `Members [${members}]`, value: `${metis.emotes.online}Online: ${online}\n${metis.emotes.idle}Idle: ${idle}\n${metis.emotes.dnd}DnD: ${dnd}\n${metis.emotes.offline}Offline: ${offline}`, inline: true },
                    { name: 'Humans', value: users, inline: true },
                    { name: 'Bots', value: bots, inline: true },
                    { name: 'Boosters', value: guild.premiumSubscriptionCount, inline: true },
                    { name: 'Channels', value: guild.channels.size, inline: true },
                    { name: 'Categories', value: guild.channels.filter(r => r.type === 4).length, inline: true },
                    { name: 'Text Channels', value: guild.channels.filter(r => r.type === 0).length, inline: true },
                    { name: 'News Channels', value: guild.channels.filter(r => r.type === 5).length, inline: true },
                    { name: 'Voice Channels', value: guild.channels.filter(r => r.type === 2).length, inline: true },
                    { name: 'Emotes', value: guild.emojis.length, inline: true },
                    { name: 'Verification', value: vLevel, inline: true },
                    { name: '2FA Level', value: mfa, inline: true },
                    { name: 'Content Filter', value: expl, inline: true },
                    { name: 'Large?', value: large, inline: true }
                ],
                image: { url: '' },
                timestamp: new Date
            }
        };
        if (guild.description) {
            data.embed.description = guild.description;
        }
        if (guild.banner) {
            data.embed.image.url = guild.bannerURL;
        }
        if (roles.length > 1020) {
            data.embed.fields.push({ name: `Roles [${guild.roles.size - 1}]`, value: 'This server has too many roles to list.', inline: false });
        }
        else {
            if (guild.roles.size === 0) {
                data.embed.fields.push({ name: `Roles [${guild.roles.size - 1}]`, value: 'This server has no roles.', inline: false });
            }
            else {
                data.embed.fields.push({ name: `Roles [${guild.roles.size - 1}]`, value: roles, inline: false });
            }
        }
        ctx.channel.createMessage(data);
    }
}
module.exports.cmd = ServerInfo;
