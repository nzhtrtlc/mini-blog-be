import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { postRoutes } from './routes/post.routes';
//import { commentRoutes } from './routes/comment.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
//app.use('/api/posts', commentRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
