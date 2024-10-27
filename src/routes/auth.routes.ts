import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

const router: Router = Router()

router.get('/me', (req, res) => authController.getCurrentUser(req, res))
router.post('/signUp', (req, res) => authController.signUp(req, res))
router.post('/signIn', (req, res) => authController.signIn(req, res))
router.post('/signOut', (req, res) => authController.signOut(req, res))

export const authRoutes = router
