import { useLocation } from "react-router-dom";


import Loader from "./Loader";
import { PostElement } from "@/types";
import { useLikePost, useUnlikePost } from "@/lib/react-query/queries";
import { useState } from "react";
import { Button } from "../ui";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";



type PostCardProps = {
  post: PostElement,
  userId?: string;

};



const PostStats = ({ post, totalLikes, setTotalLikes }: any) => {
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
    e: React.MouseEvent<HTMLButtonElement,MouseEvent>
  ) => {
    e.stopPropagation();
    setIsLiked(!isLiked);

   if(isLiked){

    unlikePost({ postId: post.id });
    if(!(totalLikes == undefined)) setTotalLikes(totalLikes - 1);

   }else{

    likePost({ postId: post.id });
    if(!(totalLikes == undefined)) setTotalLikes(totalLikes + 1);
    
   }

   
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

   
  };



    // hidden icon comment and send stats  for explore page
    const postDetailsPage = location.pathname.split("/")[1] === "posts"
    const profilePage = location.pathname.split("/")[1] === "profile"

  const hiddentIconStats = location.pathname.startsWith("/explore") || postDetailsPage || profilePage ? "hidden" : "";
  
  
  // disable full width for explore page
 const fullWidthExplore = location.pathname.startsWith("/explore") || postDetailsPage ? "" : "w-full";


  return (
    <div className={`flex  ${fullWidthExplore} ${hiddentIconStats ==='hidden' ? "justify-end " : "justify-between"}`}>
      
          <div className="flex gap-4 ">
          <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => handleLikePost(e)}
          className="hover:bg-transparent focus:bg-transparent group"
        >
          <Heart className={`h-6 w-6 ${isLiked ? 'fill-red text-red' : ''}  transition-opacity
          text-primary-500 group-hover:opacity-70
          `} 
          />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`group ${hiddentIconStats} hover:bg-transparent focus:bg-transparent`}
        >
          <MessageCircle className="w-6 h-6 transition-opacity text-primary-500 group-hover:opacity-70" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`group ${hiddentIconStats} hover:bg-transparent focus:bg-transparent`}
        >
          <Send className="w-6 h-6 transition-opacity text-primary-500 group-hover:opacity-70" />
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        className="group hover:bg-transparent focus:bg-transparent"
      >
        <Bookmark className="w-6 h-6 transition-opacity text-primary-500 group-hover:opacity-70" />
      </Button>
        </div>
  );
};

export default PostStats;
