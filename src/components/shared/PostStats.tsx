import { useLocation } from "react-router-dom";


import Loader from "./Loader";
import { PostElement } from "@/types";
import { useLikePost, useUnlikePost } from "@/lib/react-query/queries";
import { useState } from "react";

type PostCardProps = {
  post: PostElement,
  userId?: string;

};



const PostStats = ({ post }: PostCardProps) => {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(post.isLike);
  const isDeletingSaved = false;
  const isSavingPost = false;
  const isSaved = false



  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnlikePost();
  // const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  // const { mutate: deleteSavePost, isPending: isDeletingSaved } = useDeleteSavedPost();

  // const { data: currentUser } = useGetCurrentUser();

  // const savedPostRecord = currentUser?.save.find(
  //   (record: Models.Document) => record.post.$id === post.$id
  // );

  // useEffect(() => {
  //   setIsSaved(!!savedPostRecord);
  // }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
   if(isLiked){
    unlikePost({ postId: post.id });
   }else{
    likePost({ postId: post.id });
   }

   
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

   
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
          isLiked
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{post.totalLikes}</p>
      </div>

      <div className="flex gap-2">
        {
          isDeletingSaved || isSavingPost ? (<Loader/>) : (
            <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
          )
        }
      </div>
    </div>
  );
};

export default PostStats;
