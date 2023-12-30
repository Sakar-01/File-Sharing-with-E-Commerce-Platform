import express from "express";
import appRouter from "./src/routes/index.js";
import { config } from "dotenv";
config();
const app = express();

//middlewares
app.use(express.json());

app.use("/api/v1", appRouter);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

export default app;