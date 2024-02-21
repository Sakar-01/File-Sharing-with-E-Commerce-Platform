import express from "express";
import appRouter from "./src/routes/index.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();


//middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use("/api/v1", appRouter);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

export default app;