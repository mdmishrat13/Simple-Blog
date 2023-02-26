const express = require("express")
const { createLikes, getLikes,removeLikes, checkLiked } = require("../controllers/reacts")
const checkAuth = require("../middlewares/checkAuth")

const router = new express.Router()

router.post('/like',checkAuth, createLikes)
router.get('/like/:id',checkAuth,getLikes)
router.get('/liked/:id',checkAuth,checkLiked)
router.delete('/like/:id',checkAuth,removeLikes)


module.exports= router