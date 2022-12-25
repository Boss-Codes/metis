import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";
import {Shard} from "eris";


class Status extends Command { 
    constructor(){
        super({
            name: 'status', 
            module: 'dev', 
            description: 'Displays Metis connectivity status.', 
            permLevel: CommandPermissions['supportStaff'], 
            requiredGuilds: [], 
            requiredUsers: [], 
            enabled: true, 
            showOnHelp: false, 
            deleteOnUsage: false, 
            
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        const gateway = await metis.client.getBotGateway()
        const onlineShards = metis.client.shards.filter((shard: Shard) => shard.status === 'ready').length

        const data = { 
            embed: { 
                title: 'Metis Connection Status', 
                description: `Connected Shards: ${onlineShards}/${metis.client.shards.size}\nSession Count: ${gateway.session_start_limit.remaining}/${gateway.session_start_limit.total}`, 
                color: metis.colors.default, 
                fields: []
            }
        }

        for(let i = 0; i< metis.client.shards.size; i++){ 
            let shard: Shard = metis.client.shards.get(i)
            data.embed.fields.push({ name: `${shard.id}`, value: `Status: ${shard.status}\nLatency: ${shard.latency}ms` }) 
        }

        ctx.channel.createMessage(data).catch((error: Error) => {})
    }
}

module.exports.cmd = Status;