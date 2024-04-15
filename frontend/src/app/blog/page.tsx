import CardList from "@/components/card-list/card-list";
import Leatest from "@/components/leatest/leatest";

const blogPage = ({
  searchParams,
}: {
  searchParams: { page?: string; cat?: string };
}) => {
  const { page, cat } = searchParams;

  return (
    <div>
      <h2 className="bg-orange-600 text-light py-1 px-3 text-center my-5 font-bold text-lg capitalize">
        {cat} Blog
      </h2>
      <div className="flex gap-12">
        <CardList page={page ? page : "1"} cat={cat} />
        <Leatest />
      </div>
    </div>
  );
};

export default blogPage;
