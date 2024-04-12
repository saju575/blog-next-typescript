"use client";

import { AuthContext } from "@/providers/auth-provider";
import Link from "next/link";
import { useContext, useState } from "react";

const AuthLinks = () => {
  //temporary
  const { state, dispatch } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("blog_token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <>
      {!state.user?.email ? (
        <Link href={"/login"} className="hidden md:block">
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className="hidden md:block">
            Write
          </Link>
          <span className="min-w-max bg-blue-400 px-2 rounded-xl font-semibold">
            {state.user.name}
          </span>
          <span
            className="cursor-pointer hidden md:block"
            onClick={() => logOut()}
          >
            Logout
          </span>
        </>
      )}

      {/* 
        hamburger menu
      */}
      <div
        className="text-dark dark:text-light block md:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        &#9776;
      </div>

      {open && (
        <div
          className="z-10 duration-300 absolute left-0 top-10 w-full  bg-white dark:bg-dark flex flex-col items-center justify-center gap-3"
          style={{ height: "calc(100% - 2.5rem)" }}
        >
          <Link href={"/"} className="text-xl">
            Homepage
          </Link>

          {!state.user?.email ? (
            <Link href={"/login"} className="text-xl">
              Login
            </Link>
          ) : (
            <>
              <Link href="/write" className="text-xl">
                Write
              </Link>
              <span className="cursor-pointer text-xl" onClick={() => logOut()}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
