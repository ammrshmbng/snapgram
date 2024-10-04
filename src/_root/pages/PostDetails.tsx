import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";
import { GridPostList, PostStats } from "@/components/shared";

import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/useUserContext";
import { useGetPostById, useGetUserPosts } from "@/lib/react-query/queries";
import { PostElement } from "@/types";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data, isLoading } = useGetPostById(id);
 const post: PostElement = data?.data.data ;

 const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
  post?.user?.id
);


  const relatedPosts = userPosts?.data.data.posts.filter((userPost : PostElement)=>{
    return userPost.id !== post.id
  });


  const handleDeletePost = () => {
   
  };

  return (
    <div className="post_details-container">
      <div className="hidden w-full max-w-5xl md:flex">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post.imageUrl || "/assets/icons/post-placeholder.svg"}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="w-full flex-between">
              <Link
                to={`/profile/${post.user?.id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.user?.profilePictureUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full lg:w-12 lg:h-12"
                />
                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.user?.username}
                  </p>
                  <div className="gap-2 flex-center text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.createdAt.toString())}
                    </p>
                    {/* •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.caption}
                    </p> */}
                  </div>
                </div>
              </Link>

              <div className="gap-4 flex-center">
                <Link
                  to={`/update-post/${post?.id}`}
                  className={`${user.id !== post?.user?.id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.user?.id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="w-full border border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              {/* <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul> */}
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="w-full border border-dark-4/80" />

        <h3 className="w-full my-10 body-bold md:h3-bold">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} /> 
        )}
      </div>
    </div>
    
  );
};

export default PostDetails;
