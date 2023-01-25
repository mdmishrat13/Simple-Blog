const jwt = require('jsonwebtoken')
const checkAuth = async(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({errorMessage:"Authentication failed!"})
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({errorMessage:"Authentication failed!"})
    }

}

module.exports = checkAuth;