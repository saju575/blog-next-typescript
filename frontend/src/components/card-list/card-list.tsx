import axios from "../../../axios-request/axios-request";
import { BASE_BACKEND_URL } from "../../../global-const";
import Card from "../card/card";
import Pagination from "../pagination/pagination";

const getData = async (
  page: number | string,
  cat: string | "",
  limit: number
): Promise<Post[]> => {
  // const res = axios.get(
  //   `/posts?_page=${page}&_cat_slug=${cat}&_limit=${limit}`
  // );

  // if ((await res).statusText !== "OK") {
  //   throw new Error("Failed to fetch categories");
  // }
  // return (await res).data;
  const res = await fetch(
    `${BASE_BACKEND_URL}/posts?_page=${page}&_cat_slug=${cat}&_limit=${limit}`,
    { cache: "no-store" }
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch categories");
  }
  return await res.json();
};

const getDataLength = async (): Promise<number> => {
  const res = axios.get("/posts");
  if ((await res).statusText !== "OK") {
    throw new Error("Failed to fetch categories");
  }
  return (await res).data.length > 0 ? (await res).data.length : 0;
};

const CardList = async ({ page, cat }: { page?: number; cat?: string }) => {
  const POST_PER_PAGE = 5;
  const posts: Array<Post> = await getData(page!, cat!, POST_PER_PAGE);
  const getPostLength: number = await getDataLength();

  const hasPrev = POST_PER_PAGE * (page! - 1) > 0;

  const hasNext = POST_PER_PAGE * (page! - 1) + POST_PER_PAGE < getPostLength;

  return (
    <div className={`flex-[5]`}>
      <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
        All Posts
      </h2>

      {/* 
        all  posts
      */}
      <div>
        {posts?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      <Pagination page={page!} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
