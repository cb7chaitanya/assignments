import { Hono } from "hono"
import { getPostsByTag, getTags } from '../controllers/tags'
import { authmiddleware } from "../middleware/authMiddleware"
export const tagRouter = new Hono()

tagRouter.get('/getPost/:tag', authmiddleware, getPostsByTag)
tagRouter.get('/tags', authmiddleware, getTags)