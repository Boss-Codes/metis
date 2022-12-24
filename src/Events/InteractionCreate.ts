import {CommandInteraction, Interaction} from "eris";
import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 


metis.client.on('interactionCreate', async (interaction: Interaction, args: Array<string>) => { 
    if(interaction instanceof CommandInteraction){
        switch(interaction.data.name) { 
            
            // ping command
            case "ping": 
                let now = Date.now()
                let ping = { 
                    embeds: [{
                        color: metis.colors.blue, 
                        description: `${metis.emotes.info} Ping?`
                    }]
                }
               await interaction.createMessage(ping).then(() => { 
                   return interaction.editOriginalMessage({
                        embeds: [{
                            color: metis.colors.blue, 
                            description: `${metis.emotes.info} Ping! \`${Date.now() - now}ms\``
                        }]
                    })
               })
            // new commands
            case "bot-info": 
                let uptime = metis.util.formatTime(metis.client.uptime)

                let build = 'Prod'
                if (metis.client.user.id === config.metisDevClient) {build = 'Dev'}
        
                interaction.channel.createMessage({ 
                    embed: { 
                        author: { name: metis.client.user.username, icon_url: metis.client.user.avatarURL }, 
                        footer: { text: `${metis.client.user.username} | ${build} | PPID: ${process.ppid} | Shard: ${interaction.channel.guild.shard.id} | Uptime: ${uptime}`}, 
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
                            url: 'https://github.com/Boss-Codes/metis-ts'
                        }
                    ],
                    }]
                })
        }
    }
})