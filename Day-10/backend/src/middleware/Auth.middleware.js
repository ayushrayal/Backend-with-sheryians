const jwt = require("jsonwebtoken");
const blackListModel = require("../model/BlackList.model");
 async function identifier(req, res, next){
     
        const Token = req.cookies.Token
            if(!Token){
                return res.status(401).json({
                    message:"Unauthorized"
                })  
            }
            const blacklistedToken = await blackListModel.findOne({ token: Token });
                if (blacklistedToken) {
                    return res.status(400).json({ message: "Token already blacklisted" });
                }
            try{
            const decoded = jwt.verify(Token,process.env.JWT_KEY)
            req.user = decoded
            next()}catch(err){
                return res.status(401).json({
                    message:"Token is not valid",
                    error: err.message
                })
}
}

module.exports = {identifier}