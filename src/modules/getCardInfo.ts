import { CardInfo } from "../thirdparty/CardModel";
import CardDbModel, { CardInt } from "../database/models/CardDbModel";
import { Types } from "mongoose";




export const getCardInfo = async (cardName:string):Promise<(CardInt & {_id: Types.ObjectId;
}) | null> =>  {
    // get from api
    /*var card:CardInfo =  {
        id:12345,
        name:"test",
        atk:222,
        def:555,
        desc:"testing",
        type:"spell",
        race:"Continuous",
        level:8,
        card_images:[
            {
                image_url:"",
                image_url_small:"https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/500x659/products/197859/280161/apisrdcyf__03516.1557936840.jpg?c=2"
            }
        ]
    }*/

    var card = await CardDbModel.findOne({
        name:{
            $regex:".*"+cardName+".*",
            $options:"i"
        }
    })
    return card
}