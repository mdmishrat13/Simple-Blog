const express = require('express')
const { createPost, getPosts } = require('../controllers/posts')
const checkAuth = require('../middlewares/checkAuth')

const router = new express.Router()

router.post('/post',checkAuth, createPost)
router.get('/posts',getPosts)

module.exports = router