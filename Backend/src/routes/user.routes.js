import express from 'express'
import { registerUser } from '../controllers/user.controller.js'
import {body} from 'express-validator'

const router = express.Router()

router.post("/register",[
    body('email').isEmail().withMessage("Invalid E-mail"),
    body('fullName.firstName').isLength({min:3}).withMessage("First Name must be atleast 3 characters long"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long")
],registerUser)

export default router