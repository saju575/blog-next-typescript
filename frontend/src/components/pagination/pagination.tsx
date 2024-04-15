"use client";

import { useRouter } from "next/navigation";

const Pagination = ({
  page,
  hasPrev,
  hasNext,
}: {
  page: string;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <button
        className="cursor-pointer capitalize border-none w-24 px-4 py-2 bg-red text-light rounded-sm disabled:cursor-not-allowed disabled:bg-rose-400"
        onClick={() =>
          router.push(`?page=${Number(page) - 1}`, { scroll: false })
        }
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className="cursor-pointer capitalize border-none w-24 px-4 py-2 bg-red text-light rounded-sm disabled:cursor-not-allowed disabled:bg-rose-400"
        onClick={() =>
          router.push(`?page=${Number(page) + 1}`, { scroll: false })
        }
        disabled={!hasNext}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
