import Image from "next/image";
import Link from "next/link";
import axios from "../../../axios-request/axios-request";

const getData = async (): Promise<CategoryI[]> => {
  //   const res = await fetch(`${BASE_BACKEND_URL}/category`, {
  //     cache: "no-store",
  //   });
  const res = axios.get(`/category`);

  if ((await res).status !== 200) {
    throw new Error("Failed to fetch categories");
  }

  return (await res).data;
};

const CategoryList = async () => {
  const data: Array<CategoryI> = await getData();
  return (
    <div className="mt-10">
      <h2 className="mb-10 capitalize text-2xl text-dark dark:text-light font-bold">
        Popular categories
      </h2>

      <div className="mb-10 flex flex-wrap gap-5 justify-evenly">
        {data?.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
