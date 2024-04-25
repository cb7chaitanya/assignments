import {Hono} from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import { postRouter } from './routes/posts'
const app = new Hono()

app.use(cors())

app.route("/api/v1/users", userRouter);
app.route("/api/v1/posts", postRouter);

export default app;