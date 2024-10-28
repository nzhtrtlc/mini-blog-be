import { Request, Response } from "express";
import {
  getCommentsByPostId,
  createComment,
} from "../services/comment.service";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsByPostId(postId);

    res.json(comments);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const createNewComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { author_name, content } = req.body;

    const comment = await createComment({
      post_id: postId,
      author_name,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};
