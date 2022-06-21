import express from "express";
import { getPosts,createpost,updatePost,deletePost,likePost,getPostsBySearch,getPost } from "../controllers/posts.js";
import auth from'../middleware/auth.js'



const router =express.Router()

router.get("/",getPosts)

router.get('/search',getPostsBySearch)
router.post("/",auth,createpost)
router.patch("/:id",auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
router.get("/:id",getPost)
export default router;