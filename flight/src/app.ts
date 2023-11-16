import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { router as flightRouter } from "./routes/flight";
export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.get("/api/flight/index", (req, res) => {
    res.send("Index Route for Flight service");
});
app.use("/api/flight", flightRouter);
