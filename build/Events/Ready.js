"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const config = require('../../config.json');
main_1.Metis.client.on('ready', async () => {
    let logTime = new Date().toLocaleTimeString('en-us', { timeZone: 'America/New_York' });
    let logDate = new Date().toLocaleDateString();
    main_1.Metis.client.editStatus('online', { name: `!help | ${main_1.Metis.client.guilds.size} guilds | ${main_1.Metis.client.users.size} users`, type: 0 });
    main_1.Metis.client.createCommand({
        name: 'ping',
        description: 'Pings the bot.',
        type: 1,
        defaultPermission: true
    });
    main_1.Metis.logger.success('Metis', `${main_1.Metis.client.shards.size} Shards Connected [ALL]`, 'Shard Manager');
});
