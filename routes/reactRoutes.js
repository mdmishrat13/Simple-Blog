const express = require("express");
const {
  createLikes,
  getLikes,
  removeLikes,
  checkLiked,
  createDisLikes,
  getDislikes,
  removeDisLikes,
  checkDisLiked,
} = require("../controllers/reacts");

const checkAuth = require("../middlewares/checkAuth");

const router = new express.Router();

router.post("/like", checkAuth, createLikes);
router.get("/like/:id", checkAuth, getLikes);
router.get("/liked/:id", checkAuth, checkLiked);
router.delete("/like/:id", checkAuth, removeLikes);

router.post("/dislike", checkAuth, createDisLikes);
router.get("/dislike/:id", checkAuth, getDislikes);
router.get("/disliked/:id", checkAuth,checkDisLiked );
router.delete("/dislike/:id", checkAuth, removeDisLikes);

module.exports = router;
