import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { postRoutes } from './routes/post.routes'
import { authRoutes } from './routes/auth.routes'
import { commentRoutes } from './routes/comment.routes'

dotenv.config()

const app = express()

// @ts-ignore
app.get('/', (req, res) => res.send('Express on Vercel'))

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}

app.options('*', cors(corsOptions))

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/posts/:postId/comments', commentRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


export default app
