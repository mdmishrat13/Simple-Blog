const express = require("express")
const { createComment, getComments } = require("../controllers/comments")
const checkAuth = require("../middlewares/checkAuth")

const router = new express.Router()

router.post('/comment',checkAuth, createComment)
router.get('/comments/:id',checkAuth,getComments)


module.exports= router