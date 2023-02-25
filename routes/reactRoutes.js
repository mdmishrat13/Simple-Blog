const express = require("express")
const { createLikes, getLikes,removeLikes } = require("../controllers/reacts")
const checkAuth = require("../middlewares/checkAuth")

const router = new express.Router()

router.post('/like',checkAuth, createLikes)
router.get('/like/:id',checkAuth,getLikes)
router.delete('/like/:id',checkAuth,removeLikes)


module.exports= router