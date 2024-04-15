import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Post from "../../model/posts.model";
import { successResponse } from "../response/response.controller";

/* create new post conroller */

interface PostBody {
  title: string;
  desc: string;
  img: string;
  category_id: string;
  cat_slug: string;
  user_id: string;
  user_email: string;
  user_name: string;
}

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      desc,
      img,
      category_id,
      cat_slug,
      user_id,
      user_email,
      user_name,
    }: PostBody = req.body;

    if (!title || !desc || !img || !category_id || !cat_slug || !user_id) {
      throw createHttpError(400, "All fields are required");
    }

    const post = await Post.create({
      title,
      desc,
      img,
      category_id,
      cat_slug,
      user_id,
      user_email,
      user_name,
    });

    return successResponse(res, {
      message: "Post created successfully",
      payload: post,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/* get all posts */

export const getAllPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      cat_slug,
      title,
      _sort = "asc",
    }: {
      _page?: number;
      _limit?: number;
      cat_slug?: string;
      title?: string;
      _sort?: "asc" | "desc";
    } = req.query;

    let query: any = {};

    if (cat_slug) {
      query.cat_slug = cat_slug;
    }

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    let sortOptions: any;

    // Check if sort direction is provided
    if (
      _sort &&
      (_sort.toLowerCase() === "asc" || _sort.toLowerCase() === "desc")
    ) {
      sortOptions.updatedAt = _sort === "asc" ? "1" : "-1"; // 1 for ascending, -1 for descending
    } else {
      // Default sorting direction (descending)
      sortOptions.updatedAt = "-1";
    }

    const postsCount = await Post.countDocuments(query);
    const totalPages = Math.ceil(postsCount / _limit);
    const skip = (_page - 1) * _limit;

    const posts = await Post.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(_limit)
      .exec();

    return successResponse(res, {
      message: "Posts fetched successfully",
      payload: {
        posts,
        totalPages,
        currentPage: _page,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/* 
    delete post controller
*/

export const deletePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw createHttpError(400, "All fields are required");
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    return successResponse(res, {
      message: "Post deleted successfully",
      payload: null,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/* 
update post 
*/

export const updatePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw createHttpError(400, "All fields are required");
    }

    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    return successResponse(res, {
      message: "Post updated successfully",
      payload: post,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/* get single post */

export const getSinglePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw createHttpError(400, "All fields are required");
    }

    const post = await Post.findById(id);

    if (!post) {
      throw createHttpError(404, "Post not found");
    }

    return successResponse(res, {
      message: "Post fetched successfully",
      payload: post,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
