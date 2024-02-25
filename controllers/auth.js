import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req , res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation,
        } = req.body;
         
        const salt = await bcrypt.genSalt();
        console.log(salt)
        const passwordhash = await bcrypt.hash(password, salt);

        const newuser = new User({
            firstName,
            lastName,
            email,
            password: passwordhash,
            picturePath,
            location,
            occupation,
        }); 
        await newuser.save();
        res.status(200).json(newuser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
}

export const login = async (req, res) => {
    try {
        const {email , password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            res.status(404).json("user not found");
        }
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            res.status(400).json("wrong credentials");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ user, token});
    } catch (err) {
        res.status(500).json( {error : err.message})
    }
}
