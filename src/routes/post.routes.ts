import { Router } from "express";
import {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
} from "../controllers/post.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get('/', (req, res) => getPosts(req, res));
router.get('/:slug', (req, res) => getPost(req, res));

// Protected routes - sadece admin erişebilir
router.post('/', requireAuth, (req, res) => createNewPost(req, res));
router.put('/:slug', requireAuth, (req, res) => updateExistingPost(req, res));
router.delete('/:slug', requireAuth, (req, res) => deleteExistingPost(req, res));

export const postRoutes = router;
