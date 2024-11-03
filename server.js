import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/product-routes.js";
import cors from "cors"

dotenv.config();
const port = process.env.PORT
const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/products",router)

app.listen(port, ()=>{
    connectDb();
    console.log("server started at http://localhost:"+ port)
});