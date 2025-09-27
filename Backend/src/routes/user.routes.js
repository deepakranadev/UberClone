import express from 'express'
import { registerUser , loginUser, getUserProfile ,logoutUser} from '../controllers/user.controller.js'
import {body} from 'express-validator'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/register",[
    body('email').isEmail().withMessage("Invalid E-mail"),
    body('fullName.firstName').isLength({min:3}).withMessage("First Name must be atleast 3 characters long"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long")
],registerUser)

router.post("/login",[
    body('email').isEmail().withMessage("Invalid E-mail"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long")
],loginUser)

router.get("/profile",authMiddleware,getUserProfile)
router.get("/logout",authMiddleware,logoutUser)

export default router