import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log("Server Started on PORT No : ",PORT);
    
})

