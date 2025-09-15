import mongoose from 'mongoose'

const connect = async () =>{
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log("Succesfuly connected to DataBase");
        
    } catch (error) {
        console.log("Can't connect to DataBase",error);   
        process.exit(1)
    }
} 

export default connect

