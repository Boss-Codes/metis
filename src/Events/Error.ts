import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 

metis.client.on('error', async (err: Error, id: Number) => { 
    let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
    let logDate = new Date().toLocaleDateString();  

    if (err) { 
        metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, { 
            embeds: [{
                color: metis.colors.red,
                description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [ERROR] Shard: \`${id}\`\n${err.name}: ${err.message}`
            }]
        }).catch((error: Error) => {})
    } else { 
        metis.client.executeWebhook(config.readyWebhookID, config.readyWebhook, { 
            embeds: [{
                color: metis.colors.red,
                description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [ERROR] Shard: \`${id}\``
            }]
        }).catch((error: Error) => {})
    }
})

