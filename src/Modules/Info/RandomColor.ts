import { createReadStream } from "fs";
import {Command} from "../../Core/Structures/Command";
import {ICommandContext, MetisInterface, CommandPermissions} from "../../types";

class RandomColor extends Command { 
    constructor(){
        super({
            name: 'random-color', 
            module: 'info', 
            description: 'Displays a random color.', 
            requiredGuilds: [],
            permLevel: CommandPermissions['user'], 
            requiredUsers: [], 
            showOnHelp: true, 
            deleteOnUsage: false, 
            aliases: ['randomcolor']
        })
    }

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
		const int = (Math.random() * (1 << 24) | 0);
		const hex = ('00000' + int.toString(16)).slice(-6);
		const rgb = [(int & 0xff0000) >> 16, (int & 0x00ff00) >> 8, (int & 0x0000ff)];

        const colorurl = `https://dummyimage.com/600x400/${hex}/fff&text=M`

        return ctx.channel.createMessage({ 
            embed: { 
                color: int, 
                fields: [
                    { name: 'Hex', value: `#${hex}` }, 
                    { name: 'RGB', value: `${rgb.join(', ')}` }
                ], 
                thumbnail: { url: colorurl }
            }
        })
    }
}

module.exports.cmd = RandomColor;