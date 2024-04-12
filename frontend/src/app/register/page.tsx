import RegisterForm from "@/components/register-form/register-form";
import Link from "next/link";

const Register = () => {
  return (
    <div className="mt-8 relative mx-auto w-full max-w-md bg-[#222836] px-6 pt-10 pb-8 shadow sm:rounded sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-swanWhite">Sign Up</h1>
          <p className="mt-2 text-softlight">Register a new account</p>
        </div>
        <div className="mt-5">
          <RegisterForm />
          <p className="text-center text-sm text-slight">
            Already have an account?
            <Link
              href="/login"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
