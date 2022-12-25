"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class BigEmote extends Command_1.Command {
    constructor() {
        super({
            name: 'big-emote',
            module: 'info',
            description: 'Displays a big image of a specified emoji.',
            usage: 'big-emote <emote name | ID>',
            example: 'big-emote metisSuccess\nbig-emote 337019209949118464',
            requiredGuilds: [],
            requiredUsers: [],
            permLevel: types_1.CommandPermissions['user'],
            showOnHelp: true,
            deleteOnUsage: false,
            enabled: true,
            aliases: ['big', 'hugeify', 'huge-emote', 'emote', 'large-emoji', 'emoji', 'big-emoji', 'huge-emoji']
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args[0]) {
            return this.error(ctx.channel, 'Provide an emote!');
        }
        const emote = ctx.guild.emojis.find(e => e.name === ctx.args[0]) || ctx.guild.emojis.find(e => e.name.toLowerCase().startsWith(ctx.args[0].toLowerCase()));
        if (!emote) {
            return this.error(ctx.channel, 'Invalid emote!');
        }
        let link = `https://cdn.discordapp.com/emojis/${emote.id}.webp?size=128&quality=lossless`;
        if (emote.animated) {
            link = `https://cdn.discordapp.com/emojis/${emote.id}.gif?size=128&quality=lossless`;
        }
        ctx.channel.createMessage({
            embed: {
                image: { url: link },
                title: `Emote: ${emote.name}`,
                color: metis.colors.default
            }
        });
    }
}
module.exports.cmd = BigEmote;
