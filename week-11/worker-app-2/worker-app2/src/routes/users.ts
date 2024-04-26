import { Hono } from "hono";
import {createUser, signin} from '../controllers/users'
export const userRouter = new Hono();

userRouter.post('/signup', createUser)
userRouter.post('/signin', signin)