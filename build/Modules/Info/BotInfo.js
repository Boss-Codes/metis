"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const config = require('../../../config.json');
class BotInfo extends Command_1.Command {
    constructor() {
        super({
            name: 'bot-info',
            module: 'info',
            description: 'Gives statistics and information on the bot.',
            requiredGuilds: [],
            requiredUsers: [],
            showOnHelp: true,
            deleteOnUsage: false,
            enabled: true,
            aliases: ['botinfo', 'stats', 'bot-information', 'info']
        });
    }
    async execute(metis, ctx) {
        let uptime = metis.util.formatTime(metis.client.uptime);
        let build = 'Prod';
        if (metis.client.user.id === config.metisDevClient) {
            build = 'Dev';
        }
        ctx.channel.createMessage({
            embed: {
                author: { name: metis.client.user.username, icon_url: metis.client.user.avatarURL },
                footer: { text: `${metis.client.user.username} | ${build} | PPID: ${process.ppid} | Shard: ${ctx.guild.shard.id} | Uptime: ${uptime}` },
                color: metis.colors.default,
                fields: [
                    { name: 'Version', value: metis.version, inline: true },
                    { name: 'Library', value: 'Eris', inline: true },
                    { name: 'Creator', value: 'boss#0001', inline: true },
                    { name: 'Servers', value: `${metis.client.guilds.size}`, inline: true },
                    { name: 'Shards', value: `${metis.client.shards.size}`, inline: true },
                    { name: 'Users', value: `${metis.client.users.size}`, inline: true },
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
                            url: 'https://github.com/Boss-Codes/metis-ts'
                        }
                    ],
                }]
        });
    }
}
module.exports.cmd = BotInfo;
