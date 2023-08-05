const Follow = require('./../models/followers')

const createFollow = async (req, res) => {
  try {
    const user = req.user.user;
    const {followed} = req.body;
    const newFollow = new Follow({user,followed});
    const savedFollow = await newFollow.save();
    res.status(201).json(savedFollow)
  } catch (error) {
    res.status(500).json(error.message)
    console.log(error.message)
  }
};

const getFollowing = async(req,res)=>{
    try {
        const user = req.params.id
        const follows = await Follow.find({user})
        res.status(200).json(follows)
    } catch (error) {
        res.status(200).json(error.message)
    }
}
const getFollowers = async(req,res)=>{
    try {
        const user = req.user.user
        const follows = await Follow.find({user})
        res.status(200).json(follows)
    } catch (error) {
        res.status(200).json(error.message)
    }
}

const unFollow= async(req,res)=>{
  try {
      const user = req.user.user;
      const id = req.params.id
      const exists = await Follow.find({user:user,followed:id})
      if(!exists){
          return res.status(404).json({errorMessage:'Comment not found!'})
      }
      const unFollowed=await Follow.findOneAndDelete({user:user,followed:id})
      res.status(200).json(unFollowed)
  } catch (error) {
      res.status(500).json(error.message)
  }
}

module.exports={
    createFollow,
    getFollowing,
    getFollowers,
    unFollow
}
