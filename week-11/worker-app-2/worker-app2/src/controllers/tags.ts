import { PrismaClient } from "@prisma/client/edge";
import { Context } from "hono";
import { string } from "zod";

export const getTags = async (c: Context) => {
    const prisma = new PrismaClient();
    const response = await prisma.tags.findMany();

    return c.json({ tags: response });
};

export const getPostsByTag = async (c: Context) => {
    const prisma = new PrismaClient();
    const response = await prisma.tags.findMany({
        where: {
            tag: String(c.req.param('tag')),
        },
        select : {
            post : {
                select : {
                    User : { select : { username : true }},
                    id : true,
                    userId : true,
                    title : true,
                    body : true,
                    createdAt : true
                }
            }
        }
    })

    return c.json({
        posts: response[0].post.map((post) => ({
            username: post.User.username,
            id: post.id,
            title: post.title,
            userId: post.userId,
            createdAt: post.createdAt
        })),
    })
}
