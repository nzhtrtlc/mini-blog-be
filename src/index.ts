import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { postRoutes } from './routes/post.routes'
import { authRoutes } from './routes/auth.routes'
import { commentRoutes } from './routes/comment.routes'

dotenv.config()

const app = express()

// @ts-ignore
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

// @ts-ignore
app.get('/', (req, res) => res.send('Express on Vercel'))

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', allowCors(authRoutes))
app.use('/api/posts', allowCors(postRoutes))
app.use('/api/posts/:postId/comments', allowCors(commentRoutes))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


export default app
