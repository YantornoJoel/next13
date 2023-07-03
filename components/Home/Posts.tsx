import { Post } from "@/models";
import { PostItem, PostModal } from ".";
import { useState } from "react";

interface PostsProps {
  posts: Post[];
}

export const Posts = ({ posts }: PostsProps) => {
  const [post, setPost] = useState<Post>();

  return (
    <div>
      {post && <PostModal post={post} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 px-10">
        {posts.map((post) => (
          <div
            onClick={() => {
              window.my_modal_1?.showModal();
              setPost(post);
            }}
            key={post.date}
          >
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};
