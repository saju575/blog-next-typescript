import mongoose, { Document } from "mongoose";

interface CategoryI extends Document {
  slug: string;
  title: string;
  img: string;
}

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<CategoryI>("Category", categorySchema);

export default Category;
