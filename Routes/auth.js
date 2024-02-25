import Express from "express";
import { login } from "../controllers/auth.js";

const authroute = Express.Router();

authroute.post("/login", login);

export default authroute;