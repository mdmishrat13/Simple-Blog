const Likes = require("../models/likes");

const createLikes = async (req, res) => {
  try {
    const user = req.user.user;
    const {post} = req.body;

    console.log(user)
    const exists = await Likes.findOne({user,post})
    if(exists){
        return res.status(500).json({errorMessage:'Already Liked!'})
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

    console.log(user)
    const exists = await Likes.find({user,post})
    if(!exists){
        return res.status(500).json({errorMessage:'Not Liked Yed!'})
    }

    const removedLiked = await Likes.findOneAndRemove({user,post})
    res.status(201).json(removedLiked)
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


const createDislikes = async (req, res) => {
    try {
      const user = req.user.user;
      const {post} = req.body;
  
      console.log(user)
  
      const newLike = new Reacts({ user,post });
      const savedLike = await newLike.save();
      res.status(201).json(savedLike)
    } catch (error) {
      res.status(500).json(error.message)
    }
  };

  const getDislikes = async(req,res)=>{
    try {
        const post = req.params.id
        const reacts = await Reacts.find({post})
        res.status(200).json(reacts)
    } catch (error) {
        res.status(200).json(error.message)
    }
}

module.exports={
    createLikes,
    getLikes,
    removeLikes
}
