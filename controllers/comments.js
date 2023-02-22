const Comments = require("./../models/comments");
const Post = require('./../models/Posts')

const createComment = async (req, res) => {
  try {
    const user = req.user.user;
    const {comment,post} = req.body;

    console.log(user,comment)

    const newComment = new Comments({ user, comment,post });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment)
  } catch (error) {
    res.status(500).json(error.message)
  }
};

const getComments = async(req,res)=>{
    try {
        const post = req.params.id
        const comments = await Comments.find({post})
        res.status(200).json(comments)
    } catch (error) {
        res.status(200).json(error.message)
    }
}

module.exports={
    createComment,
    getComments
}
