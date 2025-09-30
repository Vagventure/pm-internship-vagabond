import mongoose from "mongoose"
const MONGODB_URI = process.env.MONGODB_URL

if (!MONGODB_URI) {
    throw new Error("please define mongo environment variable")
}
export async function dbConnect() {
    try {
        if (mongoose.connection.readyState == 1) {
            console.log("MongoDb already connected")
            return mongoose;
        }
        const opts = {
            bufferCommands: false
        }

        await mongoose.connect(MONGODB_URI!, opts)
        return mongoose
    } catch (err) {
        console.log("Error connecting to MongoDb : ", err)
    }
}

// export default dbConnect;