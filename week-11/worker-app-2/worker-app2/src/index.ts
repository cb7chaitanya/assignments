import { Hono } from 'hono'
import {cors} from "hono/cors"
import {userRouter} from "./routes/users"
import { postRouter } from './routes/posts'
import { tagRouter } from './routes/tags'
const app = new Hono()

app.use(cors())

app.route('/api/v1/users', userRouter)
app.route('/api/v1/posts', postRouter)
app.route('/api/v1/tags', tagRouter)

export default app
