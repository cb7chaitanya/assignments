import { PrismaClient } from "@prisma/client";
import { Context } from "hono";

export async function getAllPosts(c: Context){
    const prisma = new PrismaClient();
    const posts = await prisma.posts.findMany({
        include: {
            User: true
        }
    })

    return c.json({
        post: posts.map((post) => ({
            id: post.id,
            title: post.title,
            userId: post.userId,
            createdAt: post.createdAt,
            username: post.User.username,
            
        }))
    })
}

export async function createPost(c: Context){  
    const prisma = new PrismaClient();
    const body = await c.req.json();
    const newPost = await prisma.posts.create({
        data: {
            title: body.title,
            body: body.body,
            userId: c.get("userId")
        },
    })

    return c.json({
        message: "Post created successfully",
        post: {
            id: newPost.id,
            title: newPost.title,
            body: newPost.body,
            userId: newPost.userId
        }
    })
}

export async function getPost(c: Context){
    const prisma = new PrismaClient();
    const id = Number(c.req.param("id"));
    const post = await prisma.posts.findFirst({
        where: {
            id: id
        }
    })
    
    if(!post){
        return c.body("Post not found", 404)
    }

    return c.json({
        data: {
            id: post.id,
            title: post.title,
            body: post.body,
            createdAt: post.createdAt
        }
    })
}

export async function updatePost(c: Context){
    const prisma = new PrismaClient();
    const id = Number(c.req.param("id"))
    const body = await c.req.json()
    const post = await prisma.posts.findFirst({
        where: {
            id: id,
            userId: c.get('userId')
        }
    })

    if(!post){
        return c.body("Post not found", 404)
    }

    const res = await prisma.posts.update({
        where: {
            id: id,
            userId: c.get('userId')
        },
        data: {
            title: body.title,
            body: body.body
        }
    })
    
    return c.json({
        data: {
            id: res.id,
            title: res.title,
            body: res.body,
            userId: res.userId,
            createdAt: res.createdAt
        }
    })
}

export async function deletePost(c: Context){
    const prisma = new PrismaClient();
    const id = Number(c.req.param("id"))

    const postExists = await prisma.posts.findFirst({
        where: {
            id: id,
            userId: c.get('userId')
        }
    })

    if(!postExists){
        return c.body('Post not found', 404)
    }

    const res =  await prisma.posts.delete({
        where: {
            id: id,
            userId: c.get('userId')
        }
    })

    return c.json({
        msg: "Post Deleted Successfully"
    })
}