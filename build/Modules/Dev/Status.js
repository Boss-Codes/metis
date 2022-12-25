"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Status extends Command_1.Command {
    constructor() {
        super({
            name: 'status',
            module: 'dev',
            description: 'Displays Metis connectivity status.',
            permLevel: types_1.CommandPermissions['supportStaff'],
            requiredGuilds: [],
            requiredUsers: [],
            enabled: true,
            showOnHelp: false,
            deleteOnUsage: false,
        });
    }
    async execute(metis, ctx) {
        const gateway = await metis.client.getBotGateway();
        const onlineShards = metis.client.shards.filter((shard) => shard.status === 'ready').length;
        const data = {
            embed: {
                title: 'Metis Connection Status',
                description: `**Connected Shards:** \`${onlineShards}/${metis.client.shards.size}\`\n**Session Count:** \`${gateway.session_start_limit.remaining}/${gateway.session_start_limit.total}\``,
                color: metis.colors.default,
                fields: []
            }
        };
        for (let i = 0; i < metis.client.shards.size; i++) {
            let shard = metis.client.shards.get(i);
            data.embed.fields.push({ name: `Shard: ${shard.id}`, value: `Status: \`${shard.status}\`\nLatency: \`${shard.latency}ms\`` });
        }
        ctx.channel.createMessage(data).catch((error) => { });
    }
}
module.exports.cmd = Status;
