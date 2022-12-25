import {Command} from "../../Core/Structures/Command"; 
import {CommandPermissions, ICommandContext, MetisInterface} from "../../types";

class Ping extends Command { 
    constructor(){
        super({
            name: 'ping', 
            module: 'info',
            description: 'Displays current bot latency.', 
            permLevel: CommandPermissions['user'], 
            requiredUsers: [], 
            requiredGuilds: [], 
            deleteOnUsage: false, 
            showOnHelp: true, 
            enabled: true, 
            aliases: ['pong']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext) { 
        return ctx.channel.createMessage({
            embed: {  
                color: metis.colors.blue,
                fields: [
                    { name: 'Message Round Trip', value: `<a:metisGear:1046881466015039589>`}, 
                ]
            }
        }).then(message => { 
            return message.edit({
                embed: {  
                    color: metis.colors.blue,
                    fields: [
                        { name: 'Message Round Trip', value: `\`${message.timestamp - ctx.msg.timestamp}ms\``}, 
                    ]
                }
            })
        }).catch(() => undefined)
       
       

    }

    
}

module.exports.cmd = Ping