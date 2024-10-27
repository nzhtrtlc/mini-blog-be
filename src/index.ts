import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { postRoutes } from './routes/post.routes'
import { authRoutes } from './routes/auth.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
