"use client";

import { AuthContext } from "@/providers/auth-provider";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const AuthLinks = () => {
  //temporary
  const { state, dispatch } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const router = useRouter();

  function logOut() {
    localStorage.removeItem("blog_token");
    deleteCookie("blog_login");
    dispatch({ type: "LOGOUT" });
    router.push("/");
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
          <Link href={"/"} className="text-xl" onClick={() => setOpen(false)}>
            Homepage
          </Link>

          {!state.user?.email ? (
            <Link
              href={"/login"}
              className="text-xl"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/write"
                className="text-xl"
                onClick={() => setOpen(false)}
              >
                Write
              </Link>
              <span
                className="cursor-pointer text-xl"
                onClick={() => {
                  setOpen(false);
                  logOut();
                }}
              >
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
