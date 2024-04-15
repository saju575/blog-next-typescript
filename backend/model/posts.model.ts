import mongoose, { Document } from "mongoose";

interface PostI extends Document {
  title: string;
  desc: string;
  img: string;
  category_id: string;
  cat_slug: string;
  user_id: string;
  user_email: string;
  user_name: string;
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },

    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cat_slug: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model<PostI>("Post", postSchema);

export default Post;
