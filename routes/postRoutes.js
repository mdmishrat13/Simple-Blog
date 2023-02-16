const express = require('express')
const { createPost, getPosts,getMyPosts ,deletePost,updatePost,getPost} = require('../controllers/posts')
const checkAuth = require('../middlewares/checkAuth')

const router = new express.Router()

router.post('/post',checkAuth, createPost)
router.post('/my-posts',checkAuth, getMyPosts)
router.get('/post/:id',getPost)
router.delete('/delete/:id',checkAuth, deletePost)
router.patch('/update/:id',checkAuth, updatePost)
router.get('/posts',getPosts)

module.exports = router