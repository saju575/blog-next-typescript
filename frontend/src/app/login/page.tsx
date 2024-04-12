import LoginForm from "@/components/login-form/login-form";
import Link from "next/link";

const Login = () => {
  return (
    <div className="mt-8 relative mx-auto w-full max-w-md bg-[#222836] px-6 pt-10 pb-8 shadow sm:rounded sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-swanWhite">Sign in</h1>
          <p className="mt-2 text-softlight">
            Sign in below to access your account
          </p>
        </div>
        <div className="mt-5">
          <LoginForm />
          <p className="text-center text-sm text-slight">
            Don&#x27;t have an account yet?
            <Link
              href="/register"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
