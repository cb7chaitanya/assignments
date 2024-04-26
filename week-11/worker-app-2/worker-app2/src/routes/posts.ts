import { Hono } from "hono";
import {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
} from "../controllers/posts"
import { authmiddleware } from "../middleware/authMiddleware";
export const postRouter = new Hono();

postRouter.get('/', authmiddleware, getAllPosts)
postRouter.post('/', authmiddleware, createPost)
postRouter.get('/:id', authmiddleware, getPost)
postRouter.put('/:id', authmiddleware, updatePost)
postRouter.delete('/:id', authmiddleware, deletePost)