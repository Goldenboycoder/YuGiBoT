import cardsInfo from "../cardinfo.json"
import { createWriteStream,readFileSync,readdirSync } from "fs";
import client from 'https'
import axios from 'axios'
import { CardInfo } from "../thirdparty/CardModel";


/* function downloadImage(url:string,filePath:string){
    return new Promise((resolve,reject)=>{
        client.get(url,(res)=>{
            if(res.statusCode === 200){
                res.pipe(createWriteStream(filePath))
                .on('error',reject)
                .once('close',()=>resolve(filePath))
            }
            else{
                // free up memory by consuming data
                res.resume();
                reject(new Error(`Request failed with status code ${res.statusCode}`))
            }
            
        })
    })
    
} */

async function downloadImageAx(url:string,filePath:string){
    const response = await axios({
        url,
        method:"GET",
        responseType:"stream"
    });
    return new Promise((resolve,reject)=>{
        response.data.pipe(createWriteStream(filePath))
        .on('error',reject)
        .once('close',()=> resolve(filePath))
    })
}


async function getImages(alreadyDownloaded:string[],JsonPath:string,destinationFolder:string){
    var file = await readFileSync(JsonPath)
    var json = JSON.parse(file.toString())

    for(let i =0 ; i<json.data.length; i++){
        if(!alreadyDownloaded.includes(`${json.data[i].id}.jpeg`)){
            console.log(`Downloading card: ${json.data[i].id}`)
            await downloadImageAx(json.data[i].card_images[0].image_url,destinationFolder+`/${json.data[i].id}.jpeg`)
        }
    }
    /* json.data.forEach(async (card:CardInfo) => {
        console.log(`Downloading card: ${card.id}`)
        await downloadImageAx(card.card_images[0].image_url,destinationFolder+`/${card.id}.jpeg`)
    }); */
    
    console.log(`Finished Downloading ${json.data.length}`)
}

(async ()=>{
    var alreadyDownloaded = readdirSync("D:/MyFiles/Projects/YuGiOh_BotDiscord/Cards")
    await getImages(
        alreadyDownloaded,
        "D:/MyFiles/Projects/YuGiOh_BotDiscord/cardinfo.json",
        "D:/MyFiles/Projects/YuGiOh_BotDiscord/Cards"
    )
    /* await downloadImageAx(
        "https://storage.googleapis.com/ygoprodeck.com/pics/34541863.jpg",
        "D:/MyFiles/Projects/YuGiOh_BotDiscord/Cards/34541863.jpg"
    ) */
    console.log("After")
})();

