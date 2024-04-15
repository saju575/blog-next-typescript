import { BASE_BACKEND_URL } from "../../../global-const";
import LeatestCard from "./leatest-card";

const getData = async (limit: number): Promise<PostI | null> => {
  // const res = await axios.get(`/posts?_sort=desc& _limit=${limit}`);

  // if ((await res).statusText !== "OK") {
  //   return null;
  // }
  // return (await res).data;

  const res = await fetch(
    `${BASE_BACKEND_URL}/posts?_sort=desc& _limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }
  return await res.json();
};

const Leatest = async () => {
  const posts = await getData(7);

  if (!posts) {
    <div className="flex-[2] hidden lg:block">
      <>
        <h3 className="text-gray text-sm">{"What's hot"}</h3>
        <h3 className="capitalize text-2xl text-dark dark:text-light font-bold">
          {"Most Leatest"}
        </h3>

        <p className="text-red">Something went wrong!</p>
      </>
    </div>;
  }

  if (posts?.payload.posts.length === 0) {
    <div className="flex-[2] hidden lg:block">
      <>
        <h3 className="text-gray text-sm">{"What's hot"}</h3>
        <h3 className="capitalize text-2xl text-dark dark:text-light font-bold">
          {"Most Leatest"}
        </h3>

        <p className="text-red">No posts found!</p>
      </>
    </div>;
  }

  return (
    <div className="flex-[2] hidden lg:block">
      <>
        <h3 className="text-gray text-sm">{"What's hot"}</h3>
        <h3 className="capitalize text-2xl text-dark dark:text-light font-bold">
          {"Most Leatest"}
        </h3>

        <div className="mt-4 mb-10 flex flex-col gap-8">
          {posts?.payload.posts.map((post, index) => (
            <LeatestCard key={index} post={post} />
          ))}
        </div>
      </>
    </div>
  );
};

export default Leatest;
