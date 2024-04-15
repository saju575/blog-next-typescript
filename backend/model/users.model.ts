import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

interface UserI extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  name: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: [true, "Admin password is required"],
      minlength: [6, "Admin password length must be greater than 6 characters"],
      set: (v: string) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
      select: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<UserI>("User", userSchema);

export default User;
