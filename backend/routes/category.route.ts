import express from "express";
import {
  createCategoryController,
  getAllCategoryController,
} from "../controllers/category/category.controller";

const categoryRouter = express.Router();

categoryRouter.get("/category", getAllCategoryController);

categoryRouter.post("/category", createCategoryController);

export default categoryRouter;
