const express = require("express")
const mongoose = require("mongoose")
const router = require("./route/route")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/Details",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( ()=>{
    console.log("Database connection")
})




app.use(router)
app.listen(5001,()=>{
    console.log("server is running on port no. 5001");
})