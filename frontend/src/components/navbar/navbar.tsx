import Link from "next/link";

import AuthLinks from "../auth-links/auth-links";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={`${styles.container} py-2`}>
      <div className={`${styles.logo} text-lg  md:text-2xl text-left `}>
        Mordern blog
      </div>

      <div className={`${styles.links} justify-end dark:text-light`}>
        <Link href={"/"} className="md:block hidden">
          Homepage
        </Link>

        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
