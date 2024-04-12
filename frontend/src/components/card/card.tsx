/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item }: { item: Post }) => {
  return (
    <div className="flex items-center gap-6 mb-9">
      {item?.img && (
        <div className="hidden xl:block flex-1 h-80 w-full relative">
          {/* <img src={item?.img} alt="" className="h-80 w-full object-cover" /> */}
          <Image src={item?.img} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="flex-1">
        <div className="mb-5">
          <span className="text-gray">
            {moment.utc(item.createdAt).format("YYYY-MM-DD")} -{" "}
          </span>
          <span className="uppercase text-red font-medium">
            {item?.cat_slug}
          </span>
        </div>
        <Link href={`/posts/${item.id}`} className="">
          <h1 className="text-2xl font-semibold text-dark dark:text-light">
            {item.title}
          </h1>
        </Link>

        <div
          className="mt-5 mb-4 text-softdark dark:text-gray text-base font-light"
          dangerouslySetInnerHTML={{
            __html: item?.desc
              ? `${item.desc.split(" ").slice(0, 20).join(" ")}...`
              : "",
          }}
        />

        <Link
          href={`/posts/${item.id}`}
          className="capitalize w-max border-b border-red dark:text-light py-[2px]"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;

// .substring(0, 10)
