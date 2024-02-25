import Express  from "express";
import { getfeedPosts,getuserPosts,addpost } from "../controllers/posts.js";
import { VerifyToken } from "../middleware/auth.js";

const postroute = Express.Router();

postroute.get("/", VerifyToken, getfeedPosts);
postroute.get("/:userId/posts", VerifyToken, getuserPosts);

export default postroute;