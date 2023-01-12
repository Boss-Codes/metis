import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 

metis.client.on('shardResume', async (id: Number)=> { 
    let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
    let logDate = new Date().toLocaleDateString();  
    
    metis.client.executeWebhook('1043789410006740995', config.readyWebhook, { 
        embeds: [{
            color: metis.colors.green,
            description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [SHARD RECONNECTING] Shard: \`${id}\``
        }]
    })

})