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
        res.status(201).json({status:"Posted Successfully!",data:savedPost})
    } catch (error) {
        res.status(500).json(error)
    }
}

const getMyPosts = async(req,res)=>{
    try {
        const user = req.user.user;
        console.log(user)
        const myPosts = await Post.find({user:user})
        res.status(200).json(myPosts)
    } catch (error) {
        res.status(404).json({errorMessage:"Posts not found!"})
    }
}

const deletePost= async(req,res)=>{
    try {
        const user = req.user.user;
        console.log(user)
        const id = req.params.id
        console.log(id)
        const post = await Post.find({user:user,_id:id})
        if(!post){
            return res.status(404).json({errorMessage:'post not found!'})
        }
        console.log(post)
        const deletedPost = await Post.findOneAndDelete({user:user,_id:id})
        res.status(200).json({status:"Post Deleted Successfully!"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updatePost= async(req,res)=>{
    try {
        const user = req.user.user;
        console.log(req.body)
        console.log(user)
        const id = req.params.id
        console.log(id)
        const post = await Post.find({user:user,_id:id})
        if(!post){
            return res.status(404).json({errorMessage:'post not found!'})
        }
        console.log(post)
        const updatedPost = await Post.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).json({status:"Post Updated Successfully!",data:updatedPost})
    } catch (error) {
        res.status(500).json(error.message)
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
const getPost = async(req,res)=>{
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        console.log(post)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({errorMessage:"Posts not found!"})
    }
}

module.exports ={
    createPost,
    getPosts,
    getMyPosts,
    deletePost,
    updatePost,
    getPost
}