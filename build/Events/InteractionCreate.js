"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = require("eris");
const main_1 = require("../main");
const config = require('../../config.json');
main_1.Metis.client.on('interactionCreate', async (interaction, args) => {
    if (interaction instanceof eris_1.CommandInteraction) {
        switch (interaction.data.name) {
            // ping command
            case "ping":
                let now = Date.now();
                let ping = {
                    embeds: [{
                            color: main_1.Metis.colors.blue,
                            description: `${main_1.Metis.emotes.info} Ping?`
                        }]
                };
                await interaction.createMessage(ping).then(() => {
                    return interaction.editOriginalMessage({
                        embeds: [{
                                color: main_1.Metis.colors.blue,
                                description: `${main_1.Metis.emotes.info} Ping! \`${Date.now() - now}ms\``
                            }]
                    });
                });
            // new commands
            case "bot-info":
                let uptime = main_1.Metis.util.formatTime(main_1.Metis.client.uptime);
                let build = 'Prod';
                if (main_1.Metis.client.user.id === config.metisDevClient) {
                    build = 'Dev';
                }
                interaction.channel.createMessage({
                    embed: {
                        author: { name: main_1.Metis.client.user.username, icon_url: main_1.Metis.client.user.avatarURL },
                        footer: { text: `${main_1.Metis.client.user.username} | ${build} | PPID: ${process.ppid} | Shard: ${interaction.channel.guild.shard.id} | Uptime: ${uptime}` },
                        color: main_1.Metis.colors.default,
                        fields: [
                            { name: 'Version', value: main_1.Metis.version, inline: true },
                            { name: 'Library', value: 'Eris', inline: true },
                            { name: 'Creator', value: 'boss#0001', inline: true },
                            { name: 'Servers', value: `${main_1.Metis.client.guilds.size}`, inline: true },
                            { name: 'Shards', value: `${main_1.Metis.client.shards.size}`, inline: true },
                            { name: 'Users', value: `${main_1.Metis.client.users.size}`, inline: true },
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
                                    url: `https://discord.com/api/oauth2/authorize?client_id=${main_1.Metis.client.user.id}&permissions=8&scope=applications.commands%20bot`
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
});
