import {Metis as metis} from "../main"; 
import {Guild} from "eris";
const config = require('../../config.json');

metis.client.on('guildDelete', async (guild: Guild) => { 
    let model = metis.models.guild.findOne({guildId: guild.id}) 
    await model.deleteOne()

    if (metis.client.user.id === '564472435336806450') { 
        metis.client.executeWebhook(config.guildWebID, config.guildWebhook, { 
            embeds: [{
                author: { name: 'Removed', icon_url: metis.client.user.avatarURL }, 
                color: metis.colors.red, 
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${metis.util.getFullName(await metis.client.getRESTUser(guild.ownerID))}\``, 
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${metis.client.guilds.size}`}
            }]
        })
    } else { 
        if (!config.whitelistedGuilds.includes(guild.id)) { 
            return metis.client.leaveGuild(guild.id)
        }
        metis.client.executeWebhook(config.guildWebAlphaID, config.guildWebAlpha, { 
            embeds: [{
                author: { name: 'Removed', icon_url: metis.client.user.avatarURL }, 
                color: metis.colors.red, 
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${metis.util.getFullName(await metis.client.getRESTUser(guild.ownerID))}\``, 
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${metis.client.guilds.size}`}
            }]
        })
    }
})