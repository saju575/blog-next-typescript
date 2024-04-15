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
