import { PrismaClient } from "@prisma/client";
const jwt = require('jsonwebtoken');
const zod = require("zod");
import {Context} from "hono"
import { useRequestContext } from "hono/jsx-renderer";
require('dotenv').config()

const userSignupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(7),
});

const userSigninSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(7)
})

export async function createUser(c: Context) {
    const prisma = new PrismaClient();
    const body = await c.req.json();

    const newUser = userSignupSchema.safeParse(body);
    if (!newUser.success) {
        return c.body('Invalid user input', 400);           
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })
    
    if(userExists){
        return c.body('User already exists', 400);
    }

    const user = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: body.password
        }
    })
    const userId = user.id

    const token = await jwt.sign(userId, c.env.JWT_SECRET);
    return c.json({
        msg: "User Created",
        token
    })
}

export async function signin (c: Context) {
    const prisma = new PrismaClient();
    const body = await c.req.json();

    const potentialUser = userSigninSchema.safeParse(body);

    if(!potentialUser.success){
        return c.body('Invalid user input', 400);
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if(!userExists){
        return c.body('User does not exist', 400);
    }

    const userId = userExists.id;

    const token = await jwt.sign(userId, c.env.JWT_SECRET);
    return c.json({
        msg: "User Signed In",
        token
    })
}