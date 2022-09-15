import{ connect ,set} from "mongoose"


export const connectDatabase = async () => {
    //set('debug',true)
    await connect(process.env.MONGO_URI as string)
    //set('debug',true)
    console.log("Database connected!")
}