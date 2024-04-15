import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { createJWTToken } from "../../helper/jwt.helper";
import User from "../../model/users.model";
import { JWT_ACTIVATION_KEY } from "../../secret";
import { successResponse } from "../response/response.controller";

interface RegisterBody {
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
}

interface LoginBody {
  email: string;
  password: string;
}

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // email, password, name
    const { email, password, name, role }: RegisterBody = req.body;

    if (!email || !password || !name || !role) {
      throw createHttpError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw createHttpError(400, "User already exists");
    }

    // create user
    const newUser = await User.create({
      email,
      password,
      name,
      role,
    });

    // create jwt token
    const jwtToken = createJWTToken(
      { _id: newUser._id, role, email },
      JWT_ACTIVATION_KEY,
      "5 days"
    );
    const modifiedUser = {
      ...newUser.toObject(),
      password: undefined,
    };
    // return succes response
    return successResponse(res, {
      message: "User created successfully",
      payload: {
        accessToken: jwtToken,
        user: modifiedUser,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/* 
login controller
*/

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: LoginBody = req.body;

    if (!email || !password) {
      throw createHttpError(400, "All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    // compare password

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      throw createHttpError(401, "Email/password mismatch");
    }

    // create jwt token

    const jwtToken = createJWTToken(
      { _id: user._id, role: user.role, email: user.email },
      JWT_ACTIVATION_KEY,
      "5 days"
    );

    // return success response
    return successResponse(res, {
      message: "User login successfully",
      payload: { accessToken: jwtToken, user },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

/* get a user profile controller */

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")
      ? req.header("Authorization")?.split(" ")[1]
      : "";

    if (!token) {
      throw createHttpError(401, "User not authorized");
    }
    const user: any = jwt.verify(token, JWT_ACTIVATION_KEY);

    // find user

    const userExists = await User.findById(user._id);

    if (!userExists) {
      throw createHttpError(404, "User not found");
    }

    return successResponse(res, {
      message: "User profile fetched successfully",
      payload: { user: userExists },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
