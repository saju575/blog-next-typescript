import moment from "moment";
import Link from "next/link";

const LeatestCard = ({ post }: { post: Post }) => {
  return (
    <Link href={`/posts/${post?._id}`} className="flex items-center gap-5">
      <div className={` flex flex-col gap-1`}>
        <span
          className="capitalize w-max py-[2px] px-2 rounded-[10px] text-xs text-light"
          style={{ background: "#ff7857" }}
        >
          {post?.cat_slug?.toUpperCase()}
        </span>
        <h3
          title={post?.title}
          className="font-medium text-softdark dark:text-softlight"
        >
          {post?.title?.split(" ").slice(0, 10).join(" ") + "..."}
        </h3>
        <div className="text-sm">
          <span className="text-dark dark:text-light">{post.user_name}</span>
          <span className="text-gray">
            {" "}
            - {moment.utc(post?.createdAt).format("DD.MM.YYYY")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default LeatestCard;
