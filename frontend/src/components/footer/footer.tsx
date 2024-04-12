//import css
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className="mt-11 pb-8 flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center py-5 text-softdark dark:text-softlight">
      {/* 
        left section
      */}
      <div className="flex-1 flex flex-col gap-3">
        <div className={`${styles.logo} text-lg  md:text-2xl`}>
          Mordern blog
        </div>
        <p className="font-light dark:text-gray">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo,
          blanditiis illo accusamus fuga qui consectetur, ipsum obcaecati
          similique eum culpa nulla molestias! Deleniti placeat unde, vero
          architecto fuga mollitia pariatur!
        </p>
        <div className="mt-3 flex  gap-1">
          <Image
            src={"/img/facebook.png"}
            alt="facebook"
            width={18}
            height={18}
          />
          <Image
            src={"/img/youtube.png"}
            alt="youtube"
            width={18}
            height={18}
          />
          <Image
            src={"/img/instagram.png"}
            alt="instragram"
            width={18}
            height={18}
          />
        </div>
      </div>

      {/* 
        right section
      */}
      <div className="flex-1 w-full text-sm sm:text-base flex justify-between md:justify-end gap-10 lg:gap-24">
        <div className="flex flex-col gap-3">
          <span className="font-bold">Links</span>
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>Blog</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">Tags</span>
          <Link href={"/"}>Style</Link>
          <Link href={"/"}>Fashion</Link>
          <Link href={"/"}>Codding</Link>
          <Link href={"/"}>Food</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">Socials</span>
          <Link href={"/"}>Facebook</Link>
          <Link href={"/"}>instragram</Link>
          <Link href={"/"}>youtube</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
