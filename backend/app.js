import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import recommendRouter from "./routes/recommend.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recommend", recommendRouter);

export default app;
