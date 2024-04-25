import {Context, Next} from "hono"
const jwt = require('jsonwebtoken');

export async function authmiddleware(c:any, next:Next){
    const JWT_TOKEN = "mytoken";
    try{
        const token: string = c.req.header("Authorization").split(" ")[1];
        if(!token){
            const verified = jwt.verify(token, JWT_TOKEN);
            if(verified){
                c.set("userId", verified);
                await next();
            }else{
                return c.body("You are not authorized to access the resource", 401);
            }
        }else{
            return c.body("You are unauthorized to access the resource", 401);
        }
    }catch(error){
        return c.body("Restricted Access", 401);
    }
}