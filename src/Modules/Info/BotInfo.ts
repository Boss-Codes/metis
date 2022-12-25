import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
const config = require('../../../config.json'); 

class BotInfo extends Command { 
    constructor(){
        super({
            name: 'bot-info', 
            module: 'info', 
            description: 'Gives statistics and information on the bot.', 
            requiredGuilds: [], 
            permLevel: CommandPermissions['user'], 
            requiredUsers: [], 
            showOnHelp: true, 
            deleteOnUsage: false, 
            enabled: true, 
            aliases: ['botinfo', 'stats', 'bot-information', 'info']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {

        ctx.channel.createMessage({ 
            embed: { 
                author: { name: metis.client.user.username, icon_url: metis.client.user.avatarURL }, 
                footer: { text: `${metis.client.user.username} | ${config.build} | PPID: ${process.ppid} | Shard: ${ctx.guild.shard.id} | Uptime: ${metis.util.formatTime(metis.client.uptime)}`}, 
                color: metis.colors.default, 
                fields: [
                    { name: 'Version', value: metis.version, inline: true }, 
                    { name: 'Library', value: 'Eris', inline: true }, 
                    { name: 'Creator', value: 'boss#0001', inline: true }, 
                    { name: 'Servers', value: `${metis.client.guilds.size}`, inline: true }, 
                    { name: 'Shards', value: `${metis.client.shards.size}`, inline: true },
                    { name: 'Users', value: `${metis.client.users.size}`, inline: true},
                    { name: 'Modules', value: `${config.modules}`, inline: true }, 
                ]
            },
            flags: 64,
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: "Bot Invite",
                    url: `https://discord.com/api/oauth2/authorize?client_id=${metis.client.user.id}&permissions=8&scope=applications.commands%20bot` 
                }, 
                {
                    type: 2, 
                    style: 5, 
                    label: 'Support Server', 
                    url: 'https://discord.gg/mePghx6dQy'
                }, 
                { 
                    type: 2, 
                    style: 5, 
                    label: 'Github Repository', 
                    url: 'https://github.com/boss207/metis'
                }
            ],
            }]
        })
    }
}
module.exports.cmd = BotInfo;