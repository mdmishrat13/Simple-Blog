const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followed:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});


module.exports = mongoose.model("Follow",followSchema);