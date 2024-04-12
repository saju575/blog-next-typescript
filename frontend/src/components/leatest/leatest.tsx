import axios from "../../../axios-request/axios-request";
import LeatestCard from "./leatest-card";

const getData = async (limit: number): Promise<Post[]> => {
  const res = axios.get(`/posts?_sort=createdAt&_order=desc& _limit=${limit}`);

  if ((await res).statusText !== "OK") {
    throw new Error("Failed to fetch categories");
  }
  return (await res).data;
};

const Leatest = async () => {
  const posts: Post[] = await getData(7);

  return (
    <div className="flex-[2] hidden lg:block">
      <>
        <h3 className="text-gray text-sm">{"What's hot"}</h3>
        <h3 className="capitalize text-2xl text-dark dark:text-light font-bold">
          {"Most Leatest"}
        </h3>

        <div className="mt-4 mb-10 flex flex-col gap-8">
          {posts.map((post, index) => (
            <LeatestCard key={index} post={post} />
          ))}
        </div>
      </>
    </div>
  );
};

export default Leatest;