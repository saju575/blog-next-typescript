import CardList from "@/components/card-list/card-list";
import CategoryList from "@/components/category-list/category-list";
import Featured from "@/components/featured/featured";
import Leatest from "@/components/leatest/leatest";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;
export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main>
      <Featured />
      <CategoryList />
      <div className="flex gap-12">
        <CardList page={page} />
        <Leatest />
      </div>
    </main>
  );
}
