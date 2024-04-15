interface Category {
  _id: string;
  slug: string;
  title: string;
  img: string?;
  bgColor: string?;
  createdAt: string?;
  updatedAt: string?;
}

interface ResponseData {
  success: true;
  status: 200;
  message: string;
}

interface CategoryI extends ResponseData {
  payload: Category[];
}
interface PostI extends ResponseData {
  payload: {
    posts: Post[];
    totalPages: number;
    currentPage?: number;
    totalData: number;
  };
}
interface SinglePostI extends ResponseData {
  payload: Post;
}
interface Post {
  _id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  category_id: string;
  cat_slug: string;
  img: string?;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt: number;
  updatedAt: string;
}

interface UserI extends ResponseData {
  payload: {
    user: User;
  };
}

interface LoginData {
  accessToken: string;
  user: User;
}

interface LoginDataI extends ResponseData {
  payload: {
    accessToken: string;
    user: User;
  };
}

interface PostCreateData {
  user_id: string;
  user_email: string;
  user_name: string;
  category_id: string;
  cat_slug: string;
  img: string?;
  title: string;
  desc: string;
}
