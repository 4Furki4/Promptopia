import mongoose from "mongoose";

let isConnected: boolean = false; // track the connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("Mongo DB is already connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "share_prompt",
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("Mongo DB is connected");
    } catch (err) {
        console.log(err);
    }
}