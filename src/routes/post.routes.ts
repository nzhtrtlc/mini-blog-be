import { Router } from "express";
import { postController } from "../controllers/post.controller";

const router: Router = Router();

router.get("/", (req, res) => postController.getPosts(req, res));
router.get("/:slug", (req, res) => postController.getPostBySlug(req, res));

export const postRoutes = router;
