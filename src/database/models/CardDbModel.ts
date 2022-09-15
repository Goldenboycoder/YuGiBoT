import { Document, model, Schema } from "mongoose";
import { CardInfo } from "../../thirdparty/CardModel";

export interface CardInt extends Document {
    name:string
    id:number
    type:string
    desc:string
    race:string

    archetype?:string
    atk?: number
    def?: number
    level?: number
    attribute?: string

    linkval?: number
    linkmarkers?: string[]

    scale?:number

    card_images: {
        image_url:string
        image_url_small:string
    }[]

    card_sets?: {
        set_name: string
        set_code: string
        set_rarity: string
        set_rarity_code:string
        set_price: string
    }[]

    card_prices?: {
        cardmarket_price:string
        tcgplayer_price: string
        ebay_price: string
        amazon_price: string
        coolstuffinc_price:string
    }[]

    image:{
        data:Buffer,
        contentType:string
    }
};

export const Card = new Schema({
    name:String,
    id:Number,
    type:String,
    desc:String,
    race:String,

    archetype:String,
    atk: Number,
    def: Number,
    level: Number,
    attribute: String,

    linkval: Number,
    linkmarkers: [String],

    scale:Number,

    card_images: [{
        image_url:String,
        image_url_small:String
    }],

    card_sets: [{
        set_name: String,
        set_code: String,
        set_rarity: String,
        set_rarity_code:String,
        set_price: String,
    }],

    card_prices: [{
        cardmarket_price:String,
        tcgplayer_price: String,
        ebay_price: String,
        amazon_price: String,
        coolstuffinc_price:String,
    }],

    image:{
        data:Buffer,
        contentType:String
    }
});


export default model<CardInt>("card" , Card,"card");