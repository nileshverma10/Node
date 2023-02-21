const express = require('express')
const app = express()
const router = require('./routes/main')
const port =5000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.use(router)

// mongoose config
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connected to mongodb')
})
.catch((err)=> {
    console.log(err)
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
