const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})
// productSchema.pre("save",async function(next){
// //   const passwordhash= await bcrypt.hash(password,10)
//   console.log(`the current password is ${this.password}`);
//   this.password= await bcrypt.hash(this.password,10)
//   next()
// })
const productModel = new mongoose.model("product", productSchema)
module.exports = productModel
