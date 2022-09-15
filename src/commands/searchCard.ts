import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";
import { getCardInfo } from "../modules/getCardInfo";
import { APIEmbedField, Client, ClientUser, EmbedBuilder } from "discord.js"
import { CardInfo } from "../thirdparty/CardModel";
import { buildEmbed, EmbedFieldInner } from "../utils/helpers";
import { CardInt } from "../database/models/CardDbModel";



export const searchCard:Command = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search for a card")
        .addStringOption((option) =>
            option
                .setName("cardname")
                .setDescription("Card name you are searching for")
                .setRequired(true)
        ),
    // command logic goes here
    run: async (interaction) =>{
        await interaction.deferReply() // give ack to discord so timeout is extended to 15 min
        const { user } = interaction
        const cardName = interaction.options.get("cardname",true).value

        const cardInfoDb:CardInt|null = await getCardInfo(cardName as string)

        try{
            if(cardInfoDb == null || cardInfoDb.id=== undefined){
                await interaction.deleteReply()
                return
            }
        }
        catch(error:any){
            console.log(error.toString())
            await interaction.deleteReply()
            return
        }
        
        const cardInfo = cardInfoDb as CardInt
        // collect data to embed
        var botName:any = interaction.client.user?.username
        var botPic = interaction.client.user?.avatarURL()

        if(botName== undefined || botName == null){
            botName = "YuGiBoT"
        }
        if(botPic== undefined || botPic == null){
            botPic=undefined
        }

        // embed vars
        var fields1:EmbedFieldInner = {
            names:[
                {displayName:"Type",objectName:"type"},
                {displayName:"Subtype",objectName:"race"}
            ],
            fields:[]
        }

        const cardEmbed = buildEmbed(cardInfo,botName,botPic as string)
        
        // after constructing the embeded
        await interaction.editReply({embeds:cardEmbed.embeds,files:cardEmbed.attachements})
    },
};