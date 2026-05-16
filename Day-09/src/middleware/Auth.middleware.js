const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {
    const {TOKEN} = req.cookies;
        let decoded;
        try{
            decoded = jwt.verify(TOKEN,process.env.JWT_TOKEN)
        }catch(err){
            return res.status(401).json({
                message:"Unauthorised Access!",
                err:err.message
            })
        }
        req.user = decoded;
        next();
}

module.exports = { identifyUser
}