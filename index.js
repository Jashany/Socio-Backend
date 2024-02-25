import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { signup } from "./controllers/auth.js";
import authroute from './Routes/auth.js';
import { VerifyToken } from "./middleware/auth.js";
import userroute from "./Routes/user.js";
import postroute from "./Routes/post.js";
import ConnectDB from "./db/index.js";
import { addpost } from "./controllers/posts.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/signup",upload.single("picturePath"), signup);
app.post("/post",VerifyToken, upload.single("picturePath"), addpost);

 
app.use("/auth", authroute);
app.use("/user", userroute);
app.use("/post", postroute);  


ConnectDB().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT} `);
  })
}).catch((error)=>{
  console.log("MONGODB connection FAILED ", error);
  process.exit(1);
})

