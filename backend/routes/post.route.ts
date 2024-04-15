import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getSinglePostController,
} from "../controllers/post/post.controller";

const postRouter = express.Router();

/* get all posts */
postRouter.get("/posts", getAllPostController);

/* get single post */
postRouter.get("/posts/:id", getSinglePostController);

/* create new post */
postRouter.post("/posts", createPostController);

/* update post */
postRouter.put("/posts/:id", createPostController);

/* delete post */
postRouter.delete("/posts/:id", deletePostController);

export default postRouter;
