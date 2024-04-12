interface CategoryI {
  id: string | number;
  slug: string;
  title: string;
  img: string?;
  bgColor: string?;
  createdAt: number?;
}

interface Post {
  id: string | number;
  user_id: string | number;
  user_email: string;
  user_name: string;
  category_id: string | number;
  cat_slug: string;
  img: string?;
  title: string;
  desc: string;
  createdAt: number?;
}

interface User {
  id: string | number;
  email: string;
  name: string;
  role: string;
  createdAt: number?;
}

interface LoginData {
  accessToken: string;
  user: User;
}

interface PostCreateData {
  user_id: string | number;
  user_email: string;
  user_name: string;
  category_id: string | number;
  cat_slug: string;
  img: string?;
  title: string;
  desc: string;
}
