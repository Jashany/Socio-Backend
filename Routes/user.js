import  Express from "express";
import { getUser,getUserfriends ,addremovefriend } from "../controllers/users.js";
import { VerifyToken } from "../middleware/auth.js";

const userroute = Express.Router();

userroute.get("/:id",VerifyToken ,getUser);
userroute.get("/:id/friends",VerifyToken , getUserfriends);
userroute.post("/:id/:friendId",VerifyToken , addremovefriend);

export default userroute;
