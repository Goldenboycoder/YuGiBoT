import { APIEmbedField ,AttachmentBuilder,EmbedBuilder} from "discord.js"
import { CardInt } from "../database/models/CardDbModel"

export type fieldName = {
    displayName:string
    objectName:string
}

export type EmbedFieldInner = {
    names:fieldName[],
    fields?:APIEmbedField[]

}
export type EmbedConstructed = {
    embeds:EmbedBuilder[]
    attachements:AttachmentBuilder[]
}

export function buildEmbed(Card:CardInt,botname:string,botpic:string):EmbedConstructed{
    
    var embed = new EmbedBuilder()
    var imageName = `${Card.id}.jpeg`
    var cardImage = new AttachmentBuilder(Card.image.data,{name:imageName})
    //commun parts
    embed.setAuthor({
        name:botname,
        iconURL:botpic
    });
    embed.setFooter({
        text:`ID: ${Card.id}`,
        iconURL:botpic
    });
    embed.setTitle(Card.name)
    embed.setImage(`attachment://${imageName}`)

    console.log(`attribute: ${Card.attribute} attk: ${Card.atk}`)

    if(Card.attribute=== undefined || Card.atk===undefined){
        // spell or trap
        embed
        .addFields({ name: 'Type', value: Card.type,inline: true })
        .addFields({ name: 'SubType', value: Card.race ,inline: true})
        .addFields({ name: '\u200B', value: '\u200B' })
        .addFields({ name: 'Effect', value: Card.desc ,inline: false})
    }
    else{
        // monster
        embed
        .addFields({ name: 'Type', value: Card.race ,inline: true})
        .addFields({ name: 'Attribute', value: `${Card.attribute}` ,inline: true})
        if(Card.level!==undefined)
            embed.addFields({ name: 'Star Level', value: `${Card.level}:star:` ,inline: false})
        embed
        .addFields({ name: '\u200B', value: '\u200B' })
        .addFields({ name: 'SubType', value: Card.type,inline: false })
        .addFields({ name: 'Effect', value: Card.desc ,inline: false})
        if(Card.linkval!==undefined){
            embed
            .addFields({ name: 'Link Directions', value: `${Card.linkmarkers?.join(" - ")}` ,inline: false})
            .addFields({ name: 'Link Value', value: `${Card.linkval}` ,inline: true})
        }
        if(Card.scale!==undefined)
            embed .addFields({ name: 'Scale', value: `${Card.scale}` ,inline: true})
        if(Card.atk!==undefined)
            embed.addFields({ name: 'ATK', value: `${Card.atk}` ,inline: true})
        if(Card.def!==undefined)
            embed.addFields({ name: 'DEF', value: `${Card.def}` ,inline: true})

        
    }



    var result:EmbedConstructed = {
        embeds:[embed],
        attachements:[cardImage]
    }
    return result
}