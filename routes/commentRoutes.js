const express = require("express")
const { createComment,updateComment,deleteComment, getComments } = require("../controllers/comments")
const checkAuth = require("../middlewares/checkAuth")

const router = new express.Router()

router.post('/comment',checkAuth, createComment)
router.get('/comments/:id',checkAuth,getComments)
router.patch('/comment/:id',checkAuth,updateComment)
router.delete('/comment/:id',checkAuth,deleteComment)


module.exports= router