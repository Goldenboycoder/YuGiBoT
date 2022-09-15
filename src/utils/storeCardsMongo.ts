import CardDbModel from "../database/models/CardDbModel";
import { connectDatabase } from "../database/connectDatabase";
import { readdirSync, readFileSync } from "fs";
import { CardInfo, CardInfoI } from "../thirdparty/CardModel";
import { validateEnv } from "./validateEnv";
require('dotenv').config()

function readCard(cardId:number,compressedCardsFolder:string){
    return readFileSync(`${compressedCardsFolder}/${cardId}.jpeg`)
}


async function saveCard(cardData:CardInfoI,compressedCardsFolder:string){
    
    cardData.image={
        data:readCard(cardData.id,compressedCardsFolder),
        contentType:"image/jpeg"
    }
    
    const dbCard = new CardDbModel(cardData)
    var id = cardData.id
    var exists = await CardDbModel.count({ id })
    if(exists == 0){
        return dbCard.save();
    }
    else{
        return
    }
    
}


async function storeCards(JsonPath:string,alreadyDownloaded:string[],compressedCardsFolder:string){
    var file =  readFileSync(JsonPath)
    var json = JSON.parse(file.toString())
    console.log(`Storing cards`)
    for(let i =0 ; i< json.data.length ; i++){
        console.log(`Processing card ${json.data[i].id}`)
        if(alreadyDownloaded.includes(`${json.data[i].id}.jpeg`)){
            console.log(`Saving card: ${json.data[i].id}`)
            //console.log(JSON.stringify(json.data[i]))
            await saveCard(json.data[i],compressedCardsFolder)
        }
    }
}



(async ()=>{

    if (!validateEnv()) return;

    await connectDatabase()
    console.log(`Connected to DB`)

    var alreadyDownloaded = readdirSync("D:/MyFiles/Projects/YuGiOh_BotDiscord/CompressedCards")

    await storeCards(
        "D:/MyFiles/Projects/YuGiOh_BotDiscord/cardinfo.json",
        alreadyDownloaded,
        "D:/MyFiles/Projects/YuGiOh_BotDiscord/CompressedCards"
    )

    console.log("After")
})();