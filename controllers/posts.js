const Post = require("../models/Posts");

const createPost = async(req,res)=>{
    try {
        const {title,content} = req.body;

        if(!title){
            return res.status(500).json({errorMessage:'Title is required!'})
        }
        if(!content){
            return res.status(500).json({errorMessage:'Content is required!'})
        }
        const user = req.user.user;
        const newPost = new Post({title,content,user})
        const savedPost =await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
}


const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({errorMessage:"Posts not found!"})
    }
}

module.exports ={
    createPost,
    getPosts
}