import { Member } from "eris";
import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class Whois extends Command { 
    constructor(){
        super({
            name: 'whois', 
            module: 'info', 
            description: 'Displays information on the specified user.\n**Note:** If no user is specified, it will show information on the user who runs the command.', 
            usage: 'whois <user id | mention | username | nickname>', 
            example: 'whois boss\nwhois @boss\nwhois 344954369285947392', 
            requiredGuilds: [], 
            requiredUsers: [], 
            deleteOnUsage: false, 
            showOnHelp: true,
            enabled: true, 
            permLevel: CommandPermissions['user'], 
            aliases: ['w', 'user', 'user-info', 'userinfo', 'user-information', 'ui']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        let guild = ctx.guild; 

        let member: Member = await metis.resolver.member(ctx.msg, ctx.guild, ctx.args.join(" "))
        if (!ctx.args[0]){member = ctx.member}

        if (!member) {return this.error(ctx.channel, `Could not find user ${ctx.args.join(' ')}`)};

        function checkUserPermissions(guild, member) {
            const arrayOfPerms = [];

            if (member.permissions.has('administrator')) {
                arrayOfPerms.push('Administrator')
            }
            if (member.permissions.has('manageGuild')) {
                arrayOfPerms.push('Manage Server')
            }
            if (member.permissions.has('manageRoles')) {
                arrayOfPerms.push('Manage Roles')
            }
            if (member.permissions.has('manageChannels')) {
                arrayOfPerms.push('Manage Channels')
            }
            if (member.permissions.has('viewAuditLogs')) {
                arrayOfPerms.push('View Audit Logs')
            }
            if (member.permissions.has('kickMembers')) {
                arrayOfPerms.push('Kick Members')
            }
            if (member.permissions.has('banMembers')) {
                arrayOfPerms.push('Ban Members')
            }
            if (member.permissions.has('manageNicknames')) {
                arrayOfPerms.push('Manage Nicknames')
            }
            if (member.permissions.has('manageEmojis')) {
                arrayOfPerms.push('Manage Emojis')
            }
            if (member.permissions.has('manageWebhooks')) {
                arrayOfPerms.push('Manage Webhooks')
            }
            if (member.permissions.has('manageMessages')) {
                arrayOfPerms.push('Manage Messages')
            }
            if (member.permissions.has('mentionEveryone')) {
                arrayOfPerms.push('Mention Everyone')
            }
            return arrayOfPerms;
        }


        let aPerms = void 0;
        if (member.roles.includes(ctx.guildDatabase.modRole)){
            aPerms = 'Server Moderator'
        }
        if (member.permissions.has('manageGuild')) { 
            aPerms = 'Server Manager'
        }
        if (member.permissions.has('administrator')){
            aPerms = 'Server Admin'
        }
        if (member.id === guild.ownerID){
            aPerms = 'Server Owner'
        }

        const roles = []; 
        member.roles.forEach(r => roles.push(guild.roles.get(r))); 
        const mRoles = roles.sort((a, b) => b.position - a.position).map(r => r.mention).join(', ')
        const createdAt = `${metis.util.formatDate(member.createdAt)} ${new Date(member.createdAt).toLocaleTimeString('en-us', {timeZone: 'America/New_York'})}`; 
        const joined = `${metis.util.formatDate(member.joinedAt)} ${new Date(member.joinedAt).toLocaleTimeString('en-us', {timeZone: 'America/New_York'})}`; 
        let joinPos = (ctx.guild.members.filter((m: Member) => !m.bot).sort((a: Member, b: Member) => a.joinedAt - b.joinedAt).map((m: Member) => m.id).indexOf(member.id) + 1).toString();        if (joinPos === undefined || member.bot){joinPos = 'N/A'}
        if (joinPos === undefined || member.bot){joinPos = 'N/A'}

        const data = { 
            embed: { 
                description: member.mention,
                thumbnail: { url: member.avatarURL }, 
                author: { name: `${metis.util.getFullName(member.user)}`, icon_url: member.avatarURL }, 
                timestamp: new Date, 
                color: metis.colors.default, 
                footer: { text: `ID: ${member.id}` }, 
                fields: [
                ]
            }
        }

        if (member.nick) {data.embed.description = `${member.mention}\n**Nickname** - ${member.nick}`}
        if (member.status === 'online'){
           data.embed.fields.push({ name: 'Status', value: `${metis.emotes.online} Online`, inline: true })
        } 
        if (member.status === 'idle'){
            data.embed.fields.push({ name: 'Status', value: `${metis.emotes.idle} Idle`, inline: true })
        }
        if (member.status === 'dnd'){
            data.embed.fields.push({ name: 'Status', value: `${metis.emotes.dnd} DnD`, inline: true })
        } 

        data.embed.fields.push({
            name: 'Join Position', 
            value: joinPos, 
            inline: true
        })

        data.embed.fields.push({ name: 'Joined Server', value: `${joined}`}, 
        { name: 'Account Created', value: `${createdAt}`, inline: true })

        if (member.roles.length != 0){
            data.embed.fields.push({ name: `Roles [${roles.length}]`, value: `${mRoles}`, inline: false })
        } else { 
            data.embed.fields.push({ name: `Roles [0]`, value: `None`, inline: false })
        }

        if (checkUserPermissions(guild, member).length > 0){
            data.embed.fields.push({ name: 'Key Permissions', value: `${checkUserPermissions(ctx.guild, member).join(', ')}`, inline: false })
        }

        if (aPerms){
            data.embed.fields.push({ name: 'Acknowledgements', value: aPerms, inline: false })
        }

        if (member.id === '344954369285947392') { 
            data.embed.fields.push({
                name: 'Metis Team', 
                value: 'Metis Founder, Lead Developer, Community Manager', 
                inline: false
            })
        }
        if (member.id === '564472435336806450') { 
            data.embed.fields.push({
                name: 'Metis Team', 
                value: 'A Real Metis', 
                inline: false
            })
        }
        if (member.id === '1053147299611693056') { 
            data.embed.fields.push({
                name: 'Metis Team', 
                value: 'A Real Metis', 
                inline: false
            })
        }

        ctx.channel.createMessage(data)

    }
}

module.exports.cmd = Whois;