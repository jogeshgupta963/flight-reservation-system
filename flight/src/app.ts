import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as flightRouter } from "./routes/flight";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/flight", flightRouter);
