"use client";
import { AuthContext } from "@/providers/auth-provider";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import axios from "../../../../axios-request/axios-request";
import DeleteConfirmModal from "./delete-confirm-modal";

const DeleteButton = ({
  postId,
  userId,
}: {
  postId: number | string;
  userId: number | string;
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { state } = useContext(AuthContext);
  const route = useRouter();

  const handleDeletePost = (id: string): void => {
    try {
      const res = axios.delete(`/posts/${id}`);
      route.push("/");
    } catch (error) {}
  };
  if (state.user?.id != userId) return null;
  return (
    <>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setIsConfirmModalOpen(() => true)}
          className="text-light bg-blue-400 max-w-max px-3 rounded-xl"
        >
          Delete
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onExecute={() => handleDeletePost(postId.toString())}
      />
    </>
  );
};

export default DeleteButton;
