import { Request, Response } from "express";

import {
  getPublishedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../services/post.service";
import type { CreatePostRequest, UpdatePostRequest } from "../types/post.dto";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getPublishedPosts();
    res.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await getPostBySlug(slug);
    res.json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const postData: CreatePostRequest = req.body;
    const newPost = await createPost(postData);

    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const updateExistingPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const postData: UpdatePostRequest = req.body;

    const updatedPost = await updatePost(slug, postData);

    res.json(updatedPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const deleteExistingPost = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    await deletePost(slug);

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};
