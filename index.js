import 'dotenv/config';
import { app } from "./app.js";
import connectedDB from "./db.js";

const port = process.env.PORT || 4000

connectedDB().then(() =>
    app.listen(port, () => {
        console.log(`Connecting the Server...http://localhost:${port}`);
    })
).catch((err)=>{
    console.log("DataBase Connection Failed...", err);
})