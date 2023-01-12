import {Metis as metis} from "../main"; 
const config = require('../../config.json'); 

metis.client.on('shardPreReady', async (id: Number)=> { 
    let logTime = new Date().toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
    let logDate = new Date().toLocaleDateString();  
    
    metis.logger.info('Metis', `Shard ${id} Connecting....`, 'Discord Connection')
    metis.client.executeWebhook('1043789410006740995', config.readyWebhook, { 
        embeds: [{
            color: metis.colors.green,
            description: `\`${logDate}  ${logTime}\` <@!${metis.client.user.id}> [SHARD CONNECTING] Shard: \`${id}\``
        }]
    })

})