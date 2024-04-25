import { Hono } from "hono";
import {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
} from "../controllers/posts"
export const postRouter = new Hono();

postRouter.get('/posts', getAllPosts)
postRouter.post('/posts', createPost)
postRouter.get('/posts/:id', getPost)
postRouter.put('/posts/:id', updatePost)
postRouter.delete('/posts/:id', deletePost)