import UserModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
import blackListModel from "../models/blacklistToken.model.js";
 
export const registerUser = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    const{fullName,email,password} = req.body;

    const hashedPassword = await UserModel.hashPassword(password)

    const user = await createUser({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashedPassword
    })

    const token = await user.generateAuthToken()

    res.status(201).json({token,user})
}

export const loginUser = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    const{email,password} = req.body;

    const user = await UserModel.findOne({email}).select('+password');
    if(!user) return res.status(401).json({message:"Invalid E-mail or Password"});
    const checkPass = await user.comparePassword(password);
    if(!checkPass) return res.status(401).json({message:"Invalid E-mail or Password"});

    const token = await user.generateAuthToken()
    res.cookie('token',token)

    res.status(200).json({token,user})

}

export const getUserProfile = async (req,res,next) =>{
    res.status(201).json(req.user)
}

export const logoutUser = async (req,res,next) =>{

    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    await blackListModel.create({token})

    res.status(200).json({message:"Logged Out"})

}