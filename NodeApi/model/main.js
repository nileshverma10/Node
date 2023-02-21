const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },

},{timestamps:true})

const detailsModel = mongoose.model("detail",detailsSchema)
module.exports = detailsModel