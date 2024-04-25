import { Hono } from "hono";
import {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
} from "../controllers/posts"
import { authmiddleware } from "../middleware/user";
export const postRouter = new Hono();

postRouter.get('/posts', authmiddleware, getAllPosts)
postRouter.post('/posts', authmiddleware, createPost)
postRouter.get('/posts/:id',authmiddleware, getPost)
postRouter.put('/posts/:id', authmiddleware, updatePost)
postRouter.delete('/posts/:id', authmiddleware, deletePost)