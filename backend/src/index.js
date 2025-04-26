import dotenv from 'dotenv'
import { server } from "./app.js"
import dbconnect from './db/dbconnect.js'
// import path from "path"

dotenv.config({
    path:"../.env"
})



dbconnect()
.then(()=>{
    server.listen(process.env.PORT || 8000,()=>{
        console.log("App Is Running On Port",process.env.PORT)
    })
}).catch((err)=>{
    console.log("Something Went Wrong",err)
})

