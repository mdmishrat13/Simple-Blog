const Comments = require("./../models/comments");
const Post = require('./../models/Posts')

const createComment = async (req, res) => {
  try {
    const user = req.user.user;
    const {comment,post} = req.body;
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

const deleteComment= async(req,res)=>{
  try {
      const user = req.user.user;
      const id = req.params.id
      const comment = await Post.find({user:user,_id:id})
      if(!comment){
          return res.status(404).json({errorMessage:'Comment not found!'})
      }
      const deletedComment=await Comments.findOneAndDelete({user:user,_id:id})
      res.status(200).json(deletedComment)
  } catch (error) {
      res.status(500).json(error.message)
  }
}

const updateComment= async(req,res)=>{
  try {
      const user = req.user.user;
      const id = req.params.id
      const comment = await Comments.find({user:user,_id:id})
      if(!comment){
          return res.status(404).json({errorMessage:'Comment not found!'})
      }
      const updatedComment = await Comments.findByIdAndUpdate({_id:id},req.body,{new:true})
      res.status(200).json(updatedComment)
  } catch (error) {
      res.status(500).json(error.message)
      console.log(error.message)
  }
}

module.exports={
    createComment,
    getComments,
    deleteComment,
    updateComment
}
