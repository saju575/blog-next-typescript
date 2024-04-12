"use client";
import { AuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const EditButton = ({
  postId,
  userId,
}: {
  postId: number | string;
  userId: number | string;
}) => {
  const { state } = useContext(AuthContext);
  const route = useRouter();
  if (state.user?.id != userId) return null;
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => route.push(`/edit/${postId}`)}
        className="text-light bg-blue-400 max-w-max px-3 rounded-xl"
      >
        Edit
      </button>
    </div>
  );
};

export default EditButton;
