// Middleware for handling auth
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const headerResponse = token.split(" ");
    const jwtToken = headerResponse[1];

    try{
        const verification  = jwt.verify(jwtToken, JWT_SECRET);
        if(verification.username){
            next();
        }
        else{
            res.status(403).json({
                msg: "Not an Admin"
            })
        }
    }catch(err){
        res.status(400).json({
            msg: "Bad Request"
        })
    }
}

module.exports = adminMiddleware;