import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Category from "../../model/category.model";
import { successResponse } from "../response/response.controller";

export const getAllCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategoy = await Category.find({});

    return successResponse(res, {
      message: "Category fetched successfully",
      payload: allCategoy,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug, title, img }: { slug: string; title: string; img: string } =
      req.body;

    if (!slug || !title || !img) {
      throw createHttpError(400, "All fields are required");
    }

    const category = await Category.create({
      slug,
      title,
      img,
    });

    return successResponse(res, {
      message: "Category created successfully",
      payload: category,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};
