

export type card_images = {
    image_url:string
    image_url_small:string
}

export type cardSet = {
    set_name: string
    set_code: string
    set_rarity: string
    set_rarity_code:string
    set_price: string
}

export type cardPrices = {
    cardmarket_price:string
    tcgplayer_price: string
    ebay_price: string
    amazon_price: string
    coolstuffinc_price:string
}

export interface CardInfoI extends Record<string, any>{
    id: number
    name: string 
    type: string
    desc: string
    race: string

    archetype?:string
    atk?: number
    def?: number
    level?: number
    attribute?: string

    linkval?: number
    linkmarkers?: string[]

    scale?:number

    card_images: card_images[]

    card_sets?: cardSet[]

    card_prices?: cardPrices[]
}

export type CardInfo  =  {
    id: number
    name: string 
    type: string
    desc: string
    race: string

    archetype?:string
    atk?: number
    def?: number
    level?: number
    attribute?: string

    linkval?: number
    linkmarkers?: string[]

    scale?:number

    card_images: card_images[]

    card_sets?: cardSet[]

    card_prices?: cardPrices[]
        
}