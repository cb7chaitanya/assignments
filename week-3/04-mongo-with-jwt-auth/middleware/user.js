function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const userResponse = token.split(" ")
    const jwtToken = userResponse[1];
    try{
        const verification =  jwt.veirfy(jwtToken, JWT_SECRET);
        if(verification.username){
            req.username = verification.username;
            next();
        }else{
            res.status(403).json({
                msg: "You are not a User"
            })
        }
    }
    catch(err){
        res.status(400).json({
            msg: "Bad Request"
        })
    }
}

module.exports = userMiddleware;