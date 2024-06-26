import Leatest from "@/components/leatest/leatest";
import moment from "moment";
import Image from "next/image";
import { BASE_BACKEND_URL } from "../../../../global-const";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";

export const dynamic = "force-dynamic";
const getData = async (id: string): Promise<SinglePostI | null> => {
  const res = await fetch(`${BASE_BACKEND_URL}/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

const Singlepage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const post: SinglePostI | null = await getData(slug);

  if (!post) {
    return <div className="text-red">There is somthing wrong!</div>;
  }

  return (
    <div className="pt-6">
      <div className="flex items-center gap-11">
        {/* 
        text container
      */}
        <div className="flex-1">
          <h2 className="mb-10 text-3xl font-bold text-dark dark:text-light">
            {post?.payload.title}
          </h2>
          <div className="flex gap-3 items-center">
            {/* 
            user img, name and date
          */}
            {/* <div className="h-12 w-12 relative">
              {post?.img && (
                <Image
                  src={post.img}
                  alt={post.user_name}
                  fill
                  className="object-cover rounded-full"
                />
              )}
            </div> */}

            <div className="flex flex-col text-gray">
              <span className="font-medium">{post?.payload.user_name}</span>
              <span className="text-xs">
                {moment.utc(post?.payload.createdAt).format("YYYY-MM-DD")}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <EditButton
              postId={post?.payload._id!}
              userId={post?.payload.user_id!}
            />
            <DeleteButton
              postId={post?.payload._id!}
              userId={post?.payload.user_id!}
            />
          </div>
        </div>

        {/* 
        image container
      */}
        <div className="hidden lg:block flex-1 relative h-80">
          {post?.payload.img && (
            <Image
              src={post.payload.img}
              alt={post.payload.user_name}
              fill
              className="object-cover rounded"
            />
          )}
        </div>
      </div>

      {/* 
        post content and menu
      */}
      <div className="flex gap-11 mt-14">
        <div className="flex-[5]">
          <div
            className="text-dark dark:text-slight"
            dangerouslySetInnerHTML={{
              __html: post?.payload.desc ? post.payload.desc : "",
            }}
          />

          {/* 
            comment part
          */}
        </div>
        <Leatest />
      </div>
    </div>
  );
};

export default Singlepage;
