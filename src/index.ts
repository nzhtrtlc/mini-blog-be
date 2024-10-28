import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { postRoutes } from "./routes/post.routes";
import { authRoutes } from "./routes/auth.routes";
import { commentRoutes } from "./routes/comment.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
