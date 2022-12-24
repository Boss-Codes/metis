import {Metis as metis} from "../main"; 
import {Guild} from "eris";
import mongoose from "mongoose";
const config = require('../../config.json'); 

metis.client.on('guildCreate', async (guild: Guild) => { 

    if (metis.client.user.id === '564472435336806450') { 
        metis.client.executeWebhook(config.guildWebID, config.guildWebhook, { 
            embeds: [{
                author: { name: 'Added', icon_url: metis.client.user.avatarURL }, 
                color: metis.colors.green, 
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${metis.util.getFullName(await metis.client.getRESTUser(guild.ownerID))}\`\n**Created At**: \`${metis.util.formatDate(guild.createdAt)}\``, 
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${metis.client.guilds.size}`}
            }]
        })
    } else { 
        metis.client.executeWebhook(config.guildWebAlphaID, config.guildWebAlpha, { 
            embeds: [{
                author: { name: 'Added', icon_url: metis.client.user.avatarURL }, 
                color: metis.colors.green, 
                description: `**ID:** \`${guild.id}\`\n**Name:** \`${guild.name}\`\n**Members:** \`${guild.members.size}\`\n**Owner:** \`${metis.util.getFullName(await metis.client.getRESTUser(guild.ownerID))}\`\n**Created At**: \`${metis.util.formatDate(guild.createdAt)}\``, 
                timestamp: new Date, 
                footer: { text: `Total Guilds: ${metis.client.guilds.size}`}
            }]
        })
    }
})