const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  comment:{
    type:String,
    required:true
  },
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});


module.exports = mongoose.model("Comments",commentSchema);