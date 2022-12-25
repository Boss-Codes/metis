import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types"; 
import {exec} from "child_process"; 
const config = require('../../../config.json'); 

class Restart extends Command { 
    constructor(){
        super({
            name: 'restart', 
            module: 'dev', 
            description: 'Restarts the bot or a specified shard.', 
            usage: 'restart [shard]', 
            example: 'restart\nrestart 0', 
            permLevel: CommandPermissions['developer'], 
            requiredGuilds: [], 
            requiredUsers: [], 
            showOnHelp: false, 
            deleteOnUsage: false, 
            enabled: true, 
            aliases: ['r']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext) { 
        let logDate = new Date().toLocaleDateString(); 
        let logTime = new Date().toLocaleTimeString('en-US',{timeZone:'America/New_York'})
       
        if (!ctx.args.length) { 
            await this.success(ctx.channel, 'Restarting all shards!')
            metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, { 
                embed: { 
                    color: metis.colors.blue, 
                    description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [RESTART] Shard: \`all\`\nInitiated by: \`${metis.util.getFullName(ctx.user)}\``
                    }
                })
            return exec('pm2 restart Metis')
            }

        const shard = metis.client.shards.get(Number(ctx.args[0]))
        if(!shard){return this.error(ctx.channel, `An unexpected error has occured.`)}

        await this.success(ctx.channel, `Restarting shard \`${shard.id}\``).then(() => { 
            metis.logger.info('Metis', `Restarting shard ${shard.id} | Initiated by: ${metis.util.getFullName(ctx.user)}`, 'RESTART')
            metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, { 
                embed: { 
                    color: metis.colors.blue, 
                    description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [RESTART] Shard: \`${shard.id}\`\nInitiated by: \`${metis.util.getFullName(ctx.user)}\``
                }
            }).then(() => { 
                shard.disconnect()
            }).then(() => { 
                shard.connect()
            })
        })


    }
}

module.exports.cmd = Restart