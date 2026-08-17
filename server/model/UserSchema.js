const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
    },
    Age:{
        type:Number,
        required: true,
        min:0
    }
},{timestamps:true})

const UserModel =  mongoose.model("Users",UserSchema)

module.exports= UserModel