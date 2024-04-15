import { BASE_BACKEND_URL } from "../../../global-const";
import Card from "../card/card";
import Pagination from "../pagination/pagination";

const getData = async (
  page: number | string,
  cat: string,
  limit: number
): Promise<PostI | null> => {
  let url: string;
  if (cat) {
    url = `${BASE_BACKEND_URL}/posts?cat_slug=${cat}&_page=${page}&_limit=${limit}`;
  } else {
    url = `${BASE_BACKEND_URL}/posts?_page=${page}&_limit=${limit}`;
  }
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return null;
  }
  return await res.json();
};

// const getDataLength = async (): Promise<number> => {
//   const res = await axios.get("/posts");
//   if ((await res).statusText !== "OK") {
//     return 0;
//   }
//   return (await res).data.length > 0 ? (await res).data.length : 0;
// };

const CardList = async ({ page, cat }: { page?: number; cat?: string }) => {
  const POST_PER_PAGE = 5;
  const posts: PostI | null = await getData(page!, cat!, POST_PER_PAGE);
  // const getPostLength: number = await getDataLength();

  const hasPrev = POST_PER_PAGE * (page! - 1) > 0;

  const hasNext =
    POST_PER_PAGE * (page! - 1) + POST_PER_PAGE < posts?.totalData!;

  if (!posts) {
    return (
      <div className={`flex-[5]`}>
        <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
          All Posts
        </h2>

        <p className="text-red">Something went wrong!</p>
      </div>
    );
  }

  if (posts.payload.posts.length === 0) {
    return (
      <div className={`flex-[5]`}>
        <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
          All Posts
        </h2>

        <p className="text-red">No posts found!</p>
      </div>
    );
  }

  return (
    <div className={`flex-[5]`}>
      <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
        All Posts
      </h2>

      {/* 
        all  posts
      */}
      <div>
        {posts?.payload.posts.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>

      <Pagination page={page!} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
