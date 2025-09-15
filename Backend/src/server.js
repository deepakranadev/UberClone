import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import connect from './config/db.js'
import router from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',router)

connect().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server Started on PORT No : ",PORT)
})
})



    