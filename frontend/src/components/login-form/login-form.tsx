"use client";
import { AuthContext } from "@/providers/auth-provider";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "../../../axios-request/axios-request";

const submitLoginData = async (values: {
  email: string;
  password: string;
}): Promise<LoginDataI | null> => {
  const res = await axios.post("/login", values);
  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

const LoginForm = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [isLoginLoading, setLoginLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required*"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required*"),
    }),
    onSubmit: async (values) => {
      // Handle login submission here
      try {
        setLoginLoading(() => true);
        const loginData = await submitLoginData(values);
        if (loginData?.payload) {
          if (loginData.payload.accessToken) {
            localStorage.setItem("blog_token", loginData.payload.accessToken);
          }
          setCookie("blog_login", "login");
          dispatch({ type: "LOGIN_SUCCESS", payload: loginData.payload.user });
          setLoginLoading(() => false);
          router.push("/");
        } else {
          dispatch({ type: "LOGIN_FAILURE", payload: "Login Failed" });
          setLoginLoading(() => false);
        }
        setLoginLoading(() => false);
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: "Login Failed" });
        setLoginLoading(() => false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email Address"
          className="text-slight bg-[#222836] peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          autoComplete="NA"
        />
        <label
          htmlFor="email"
          className=" pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-slight opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slight peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-slight"
        >
          Email Address
        </label>
      </div>
      <div className="h-3 my-1">
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="relative mt-6">
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
          className="text-slight bg-[#222836] peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
        />
        <label
          htmlFor="password"
          className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-slight opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slight peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-slight"
        >
          Password
        </label>
      </div>

      <div className="h-3 my-1">
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="my-6">
        <button
          type="submit"
          className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
        >
          {isLoginLoading ? "Loading.." : "Sign in"}
        </button>
      </div>

      {state.isError && (
        <div className="bg-red p-2 rounded-sm text-white">{state.error}</div>
      )}
    </form>
  );
};

export default LoginForm;
