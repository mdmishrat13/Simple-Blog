const { default: mongoose } = require("mongoose");


const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Name is required!'],
    },
    
    lastName:{
        type:String,
        required:[true,'Name is required!'],
    },
    email:{
        type:String,
        required:[true,'Email is required!']
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model('User',userSchema);