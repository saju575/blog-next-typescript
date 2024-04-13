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
          Welcome to Modern Blog, your destination for contemporary insights and
          inspiration. Dive into a world where modernity meets creativity, where
          fresh perspectives and innovative ideas flourish. Join our vibrant
          community of thinkers and writers as we explore the latest trends,
          share thought-provoking discussions, and uncover the essence of modern
          living. Stay updated with curated articles, embrace the modern
          lifestyle, and embark on a journey towards a more informed and
          inspired mindset. Experience the power of modern ideas with Modern
          Blog – your gateway to a world of limitless possibilities.
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
          {/* <Link href={"/"}>Blog</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link> */}
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">Tags</span>
          <Link href={"/blog?cat=Style"}>Style</Link>
          <Link href={"/blog?cat=Fashion"}>Fashion</Link>
          <Link href={"/blog?cat=LifeStyle"}>LifeStyle</Link>
          <Link href={"/blog?cat=Food"}>Food</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-bold">Socials</span>
          <Link href={"/"}>Facebook</Link>
          <Link href={"/"}>Instragram</Link>
          <Link href={"/"}>Youtube</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
