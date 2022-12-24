"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../Core/Structures/Command");
const types_1 = require("../../types");
class Color extends Command_1.Command {
    constructor() {
        super({
            name: 'color',
            module: 'info',
            description: 'Displays a color.',
            permLevel: types_1.CommandPermissions['user'],
            requiredUsers: [],
            requiredGuilds: [],
            deleteOnUsage: false,
            showOnHelp: true,
            enabled: true,
        });
    }
    async execute(metis, ctx) {
        if (!ctx.args[0]) {
            return this.error(ctx.channel, 'Provide a color!');
        }
        const hex = ctx.args[0].replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const rgb = [r, g, b];
        if (rgb.includes(NaN))
            return this.error(ctx.channel, 'Invalid color format!');
        const colorurl = `https://dummyimage.com/600x400/${hex}/fff&text=M`;
        return ctx.channel.createMessage({
            embed: {
                color: parseInt(`0x${hex}`),
                fields: [
                    { name: 'Hex', value: `#${hex}` },
                    { name: 'RGB', value: `${rgb.join(', ')}` }
                ],
                thumbnail: { url: colorurl }
            }
        });
    }
}
module.exports.cmd = Color;
