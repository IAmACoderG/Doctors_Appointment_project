import mongoose from "mongoose";

export default async function connectedDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        // mongoose.connection.on("connection", () => {
        //     console.log("Successfully Connected MongoDB");
        // });
        // mongoose.connection.on(("error", (err) => {
        //     console.log("Not Coonected MongoDB", err);
        //     process.exit();
        // }));
        console.log("connected mongo");
    } catch (error) {
        console.log("Connection Error in MongoDB", error)
    }
}