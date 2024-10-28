import { Router } from "express";
import {
  getComments,
  createNewComment,
} from "../controllers/comment.controller";

const router = Router({ mergeParams: true }); // to get postId from parent route

// Public routes
router.get("/", (req, res) => getComments(req, res));
router.post("/", (req, res) => createNewComment(req, res));

export const commentRoutes = router;
