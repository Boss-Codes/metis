"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class RoleInfo extends Command_1.Command {
    constructor() {
        super({
            name: 'role-info',
            module: 'info',
            description: 'Shows information about the specified role.',
            usage: 'role-info <name | id | mention>',
            example: 'role-info Admin\nrole-info @Developer',
            requiredGuilds: [],
            permLevel: types_1.CommandPermissions['user'],
            requiredUsers: [],
            showOnHelp: true,
            deleteOnUsage: false,
            enabled: true,
            aliases: ['roleinfo', 'role', 'ri']
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args[0]) {
            return this.error(ctx.channel, 'Provide a role!');
        }
        let role = ctx.guild.roles.get(ctx.args[0]);
        if (!role && ctx.msg.roleMentions && ctx.msg.roleMentions[0]) {
            role = ctx.guild.roles.get(ctx.msg.roleMentions[0]);
        }
        if (!role) {
            role = ctx.guild.roles.find(r => r.name.toLowerCase().startsWith(ctx.args.join(' ').toLowerCase()));
        }
        if (!role || role.id === ctx.guild.id) {
            return this.error(ctx.channel, 'Invalid role provided!');
        }
        // check role perms 
        function checkRolePermission(guild, role) {
            const arrayOfPerms = [];
            if (role.permissions.has('administrator')) {
                arrayOfPerms.push('Administrator');
            }
            if (role.permissions.has('manageGuild')) {
                arrayOfPerms.push('Manage Server');
            }
            if (role.permissions.has('manageRoles')) {
                arrayOfPerms.push('Manage Roles');
            }
            if (role.permissions.has('manageChannels')) {
                arrayOfPerms.push('Manage Channels');
            }
            if (role.permissions.has('viewAuditLogs')) {
                arrayOfPerms.push('View Audit Logs');
            }
            if (role.permissions.has('kickMembers')) {
                arrayOfPerms.push('Kick Members');
            }
            if (role.permissions.has('banMembers')) {
                arrayOfPerms.push('Ban Members');
            }
            if (role.permissions.has('manageNicknames')) {
                arrayOfPerms.push('Manage Nicknames');
            }
            if (role.permissions.has('manageEmojis')) {
                arrayOfPerms.push('Manage Emojis');
            }
            if (role.permissions.has('manageWebhooks')) {
                arrayOfPerms.push('Manage Webhooks');
            }
            if (role.permissions.has('manageMessages')) {
                arrayOfPerms.push('Manage Messages');
            }
            if (role.permissions.has('mentionEveryone')) {
                arrayOfPerms.push('Mention Everyone');
            }
            return arrayOfPerms;
        }
        const data = {
            embed: {
                title: ``,
                color: role.color,
                description: role.mention,
                footer: { text: `Created: ${metis.util.formatDate(role.createdAt)} at ${new Date(role.createdAt).toLocaleTimeString('en-us', { timeZone: 'America/New_York' })}` },
                timestamp: new Date,
                fields: [
                    { name: 'ID', value: `${role.id}`, inline: true },
                    { name: 'Name', value: `${role.name}`, inline: true },
                    { name: 'Color', value: `#${role.color.toString(16)}`, inline: true },
                    { name: 'Mention', value: role.mention, inline: true },
                    { name: 'Members', value: `${ctx.guild.members.filter(r => r.roles.includes(role.id)).length}`, inline: true },
                    { name: 'Position', value: `${role.position}`, inline: true }
                ]
            }
        };
        if (!role.hoist) {
            data.embed.fields.push({ name: 'Hoisted', value: 'No', inline: true });
        }
        else {
            data.embed.fields.push({ name: 'Hoisted', value: 'Yes', inline: true });
        }
        if (role.managed)
            data.embed.title = `Integrated Bot Role`;
        if (!role.mentionable) {
            data.embed.fields.push({ name: 'Mentionable', value: 'No', inline: true });
        }
        else {
            data.embed.fields.push({ name: 'Mentionable', value: 'Yes', inline: true });
        }
        if (checkRolePermission(ctx.guild, role).length > 0) {
            data.embed.fields.push({ name: 'Key Permissions', value: `${checkRolePermission(ctx.guild, role).join(', ')}`, inline: false });
        }
        ctx.channel.createMessage(data);
    }
}
module.exports.cmd = RoleInfo;
