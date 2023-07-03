import React from "react";
import { PostItem } from ".";
import { HiOutlineXCircle } from "react-icons/hi";
import { Post } from "@/models";

interface PostsProps {
  post: Post;
}

export const PostModal = ({ post }: PostsProps) => {
  return (
    <div>
      <dialog id="my_modal_1" className="modal p-0 rounded-lg">
        <form method="dialog" className="modal-box">
          <button className="absolute right-2 top-2">
            <HiOutlineXCircle className="text-[22px] text-white" />
          </button>
          <PostItem post={post} />
        </form>
      </dialog>
    </div>
  );
};
