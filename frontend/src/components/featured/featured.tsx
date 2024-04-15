import Image from "next/image";
import Link from "next/link";
import { BASE_BACKEND_URL } from "../../../global-const";

const fetchFirstPost = async (): Promise<PostI | null> => {
  const res = await fetch(`${BASE_BACKEND_URL}/posts?_limit=1`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }
  // console.log(await res.json());

  return await res.json();
};

const Featured = async () => {
  const post: PostI | null = await fetchFirstPost();

  if (!post || post?.payload?.posts.length === 0) {
    return (
      <section className="mt-7">
        <h1 className="text-3xl md:text-5xl text-dark dark:text-light leading-10">
          <b>Hey, Everybody !</b> Read and Publish you stories and creative
          ideas.
        </h1>

        <p className="text-base font-light text-softdark">
          Sorry, there are no featured posts yet
        </p>
      </section>
    );
  }

  const firstPost = post?.payload?.posts[0];

  return (
    <section className="mt-7">
      <h1 className="text-3xl md:text-5xl text-dark dark:text-light leading-10">
        <b>Hey, Everybody !</b> Read and Publish you stories and creative ideas.
      </h1>

      <div className="flex items-center mt-14 gap-8">
        <div className="hidden md:block flex-1 h-[400px] relative">
          {<Image src={firstPost?.img!} alt="" fill className="object-cover" />}
        </div>
        <div className="flex-1 text-dark dark:text-light flex flex-col space-y-6">
          <h2 className="text-2xl font-semibold">{firstPost.title}</h2>
          <div
            className="text-base font-light text-softdark"
            dangerouslySetInnerHTML={{
              __html: firstPost?.desc?.split(" ").splice(0, 30).join(" ") || "",
            }}
          />

          <Link
            href={`/posts/${firstPost._id}`}
            className="w-max py-2 px-4 border-none rounded-sm bg-softdark text-softlight dark:text-dark dark:bg-white"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;

// "/img/p1.jpeg"
