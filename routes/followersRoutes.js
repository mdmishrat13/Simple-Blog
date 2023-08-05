const express = require('express')
const {createFollow,
    getFollowing,
    getFollowers,
    unFollow} = require('../controllers/followers')
const checkAuth = require('../middlewares/checkAuth')

const router = new express.Router()

router.post('/follow',checkAuth, createFollow)
router.get('/following',checkAuth, getFollowing)
router.get('/followers',checkAuth,getFollowers)
router.delete('/following/:id',checkAuth, unFollow)

module.exports = router