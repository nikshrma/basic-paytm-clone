const dotenv = require("dotenv");
dotenv.config();
const  JWT_SECRET  = process.env.JWT_SECRET
const { verify } = require("jsonwebtoken");
function authMiddleware(req,res,next){
    try {
    const fullToken = (req.headers.authorization).split(" ")[1];
    const decodedPayload = verify(fullToken , JWT_SECRET);
    req.userId = decodedPayload.userId;
    next();
    } catch (error) {
        return res.status(403).json({
            message:"Authentication failed"
        })
    }
}
module.exports={
    authMiddleware
}