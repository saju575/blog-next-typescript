import Image from "next/image";
import Link from "next/link";
import { BASE_BACKEND_URL } from "../../../global-const";

const getData = async (): Promise<CategoryI[] | null> => {
  const res = await fetch(`${BASE_BACKEND_URL}/category`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

const CategoryList = async () => {
  const data = await getData();
  if (!data) {
    // this should never happen, but just in case

    return (
      <div className="mt-10">
        <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
          Popular categories
        </h2>
        <p className="text-red-500">Failed to fetch category list</p>
      </div>
    );
  }

  if (data.length === 0) {
    // this should never happen, but just in case

    return (
      <div className="mt-10">
        <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
          Popular categories
        </h2>
        <p className="text-red-500">Category list is empty</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
        Popular categories
      </h2>

      <div className="mb-10 flex flex-wrap gap-5 justify-evenly">
        {data.map((item) => {
          if (!item) {
            // this should never happen, but just in case
            console.error("category item is null");
            return null;
          }

          return (
            <Link
              key={item.id}
              href={`/blog?cat=${item.slug}`}
              className="flex items-center capitalize gap-3 justify-center w-36 h-16 rounded bg-slate-600 text-dark dark:text-light"
              style={{
                backgroundColor: `${item.bgColor ? item.bgColor : "#7fb88133"}`,
              }}
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-[50%] object-cover"
                />
              )}
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
