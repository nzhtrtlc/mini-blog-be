// src/controllers/post.controller.ts
import { Request, Response } from "express";
import { postService } from "../services/post.service";

class PostController {
  getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await postService.getPublishedPosts();
      res.json(posts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  getPostBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;
      const post = await postService.getPostBySlug(slug);

      if (!post) {
        res.status(404).json({ error: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };
}

export const postController = new PostController();
