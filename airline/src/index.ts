import express from "express";
import { config } from "./config/config";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
export const app = express();
import { isLoggedIn } from "./middlewares/loggedin";
import { createairline } from "./controllers/create-airline";
import { editairline } from "./controllers/edit-airline";
import { getairline } from "./controllers/get-airline";
import { getAllAirline } from "./controllers/get-all";
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const checkEnv = () => {
    const env = [
        "PORT",
        "NODE_ENV",
        "COOKIE_NAME",
        "JWT_SECRET",
        "JWT_EXPIRATION",
        "MONGO_URI",
    ];
    env.forEach((data) => {
        if (!process.env[data]) {
            console.log(`${data} env not found`);
            process.exit(1);
        }
    });
};
const initServer = async () => {
    // checkEnv();
    await mongoose.connect(config.MONGO_URI).catch(() => {
        console.log("Db error");
    });
    console.log("DB connected");
    app.listen(config.PORT || 5000, () => {
        console.log("Server listening");
    });
};

initServer();
app.get("/api/airline/index", (req, res) => {
    res.send("Airline Index page");
});
app.get("/api/airline", getAllAirline);
app.post("/api/airline/create", isLoggedIn, createairline);
app.post("/api/airline/edit", isLoggedIn, editairline);
app.get("/api/airline/:id", isLoggedIn, getairline);
