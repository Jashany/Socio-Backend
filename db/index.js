import mongoose from "mongoose";

const ConnectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`)
        console.log(`MongoDB connected : ${connection.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}

export default ConnectDB;