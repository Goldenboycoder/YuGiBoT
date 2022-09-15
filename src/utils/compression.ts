//import imagemin from 'imagemin';
//import imageminJpegtran from 'imagemin-jpegtran';
import fs, { readdirSync, readFileSync } from 'fs'
import sharp from 'sharp'
//import imageminPngquant from 'imagemin-pngquant';

/* async function compressImages(origins:string[],destination:string){
    return imagemin(origins, 
        {
            destination: destination,
            plugins: [
                imageminJpegtran(),
                /* imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        }
    )
} */

async function compressImagesM(filePath:string,destination:string,quality:number){
    var file = readFileSync(filePath)
    const options:sharp.JpegOptions ={
        quality:quality,
        trellisQuantisation:true
    }
    return sharp(file).jpeg(options).toFile(destination)
    /*fs.readFile(filePath,async (err,data)=>{
        const options:sharp.JpegOptions ={
            quality:quality,
            trellisQuantisation:true
        }
        await sharp(data).jpeg(options).toFile(destination)
    })*/
}



(async ()=>{
    var alreadyDownloaded = readdirSync("D:/MyFiles/Projects/YuGiOh_BotDiscord/Cards")
    for(let i=0;i<alreadyDownloaded.length;i++){
        console.log(`Compressing ${alreadyDownloaded[i]}`)
        await compressImagesM(
            `D:/MyFiles/Projects/YuGiOh_BotDiscord/Cards/${alreadyDownloaded[i]}`,
            `D:/MyFiles/Projects/YuGiOh_BotDiscord/CompressedCards/${alreadyDownloaded[i]}`,
            20
        )
    }
    
    console.log("done")
} )();


//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]