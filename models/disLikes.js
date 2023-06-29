const mongoose = require("mongoose");

const disLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});


module.exports = mongoose.model("DisLikes",disLikeSchema);