const Likes = require("../models/likes");
const DisLikes = require ('./../models/disLikes')

const createLikes = async (req, res) => {
  try {
    const user = req.user.user;
    const {post} = req.body;
    const exists = await Likes.findOne({user,post})
    if(exists){
        return res.status(500).json({errorMessage:'Already Liked!'})
    }
    const disliked = await DisLikes.findOne({post,user})
    if(disliked){
      await DisLikes.findByIdAndDelete(disliked._id)
    }

    const newLike = new Likes({ user,post });
    const savedLike = await newLike.save();
    res.status(201).json(savedLike)
  } catch (error) {
    res.status(500).json(error.message)
  }
};
const removeLikes = async (req, res) => {
  try {
    const user = req.user.user;
    const post = req.params.id;

    const exists = await Likes.find({user,post})
    if(!exists){
        return res.status(500).json({errorMessage:'Not Liked Yed!'})
    }

    const removed = await Likes.findOneAndRemove({user,post})
    res.status(201).json(removed)
  } catch (error) {
    res.status(500).json(error.message)
  }
};

const getLikes = async(req,res)=>{
    try {
        const post = req.params.id
        const reacts = await Likes.find({post})
        res.status(200).json(reacts)
    } catch (error) {
        res.status(200).json(error.message)
    }
}
const checkLiked = async(req,res)=>{
    try {
      const user = req.user.user;
        const post = req.params.id
        const data = await Likes.findOne({post,user})
        if(!data){
          return res.status(200).json(false)
        }
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const createDisLikes = async (req, res) => {
    try {
      const user = req.user.user;
      const {post} = req.body;
      const exists = await DisLikes.findOne({user,post})
    if(exists){
        return res.status(500).json({errorMessage:'Already Disliked!'})
    }
    const liked = await Likes.findOne({user,post})
    if(liked){
      await Likes.findByIdAndDelete(liked._id)
    }
  
      const newLike = new DisLikes({ user,post });
      const savedLike = await newLike.save();
      res.status(201).json(savedLike)
    } catch (error) {
      res.status(500).json(error.message)
    }
  };

  const getDislikes = async(req,res)=>{
    try {
        const post = req.params.id
        const reacts = await DisLikes.find({post})
        res.status(200).json(reacts)
    } catch (error) {
        res.status(200).json(error.message)
    }

}

const removeDisLikes = async (req, res) => {
  try {
    const user = req.user.user;
    const post = req.params.id;

    const exists = await DisLikes.find({user,post})
    if(!exists){
        return res.status(500).json({errorMessage:'Not Liked Yed!'})
    }

    const removed = await DisLikes.findOneAndRemove({user,post})
    res.status(201).json(removed)
  } catch (error) {
    res.status(500).json(error.message)
  }
};

const checkDisLiked = async(req,res)=>{
  try {
    const user = req.user.user;
      const post = req.params.id
      const data = await DisLikes.findOne({post,user})
      if(!data){
        return res.status(200).json(false)
      }
      res.status(200).json(true)
  } catch (error) {
      res.status(500).json(error.message)
  }
}

module.exports={
    createLikes,
    getLikes,
    removeLikes,
    checkLiked,
    createDisLikes,
    getDislikes,
    removeDisLikes,
    checkDisLiked
}
