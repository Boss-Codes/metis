import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types"; 
const config = require('../../../config.json'); 

class Uptime extends Command { 
    constructor(){
        super({
            name: 'uptime', 
            module: 'info', 
            description: 'Displays the bot\'s uptime.', 
            requiredGuilds: [], 
            requiredUsers: [], 
            permLevel: CommandPermissions['user'], 
            showOnHelp: true, 
            enabled: true, 
            deleteOnUsage: false, 
            aliases: ['up']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        ctx.channel.createMessage({
            embed: { 
                color: metis.colors.default, 
                title: 'Uptime', 
                description: `${metis.util.formatTime(metis.client.uptime)}`,
                footer: { text: `${metis.client.user.username} | ${config.build} | PPID: ${process.ppid} | Shard: ${ctx.guild.shard.id}` }
            }
        })
    }
}
module.exports.cmd = Uptime; 