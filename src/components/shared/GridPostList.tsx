import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/useUserContext";
import { PostElement } from "@/types";
import ReactImageFallback from "react-image-fallback";

type GridPostListProps = {
  posts: PostElement[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts?.map((post) => (
        <li key={post.id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.id}`} className="grid-post_link">
            <img
              src={post.imageUrl || "https://via.placeholder.com/150"}
              alt="post"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150";
              }}
            />

            
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start flex-1 gap-2">
                <img
                  src={
                    post.user?.profilePictureUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full "
                  onError={(e) => {
                    e.currentTarget.src = "/assets/icons/profile-placeholder.svg";
                  }}
                />
                <p className="line-clamp-1">{post.user?.username}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
