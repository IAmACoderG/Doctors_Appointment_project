import express from "express";
import router from "./routers/doctor.routes.js";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.json());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Routes Declaration...>>>
app.use("/api/doctors", router);