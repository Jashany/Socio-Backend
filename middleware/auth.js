import jwt from 'jsonwebtoken';

export const VerifyToken = (req, res, next) => {
    try {
        let token = req.headers["Authorization"];

        if (!token) {
            return res.status(401).json("You are not authenticated!");
        }

        if(token.startsWith("Bearer ")){
            token = token.slize(7,token.length).trimLeft();
        } 

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
}