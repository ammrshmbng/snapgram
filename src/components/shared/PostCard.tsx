import { Link } from "react-router-dom";

import { PostElement } from "@/types";
import { useUserContext } from "@/context/useUserContext";
import { multiFormatDateString, urlValidation } from "@/lib/utils";
import {PostComment, PostStats} from "./";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useEffect, useState } from "react";

type PostCardProps = {
  post: PostElement;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [totalLikes, setTotalLikes] = useState(post.totalLikes || 0);
  const [validImageUrl, setValidImageUrl] = useState<any>("https://via.placeholder.com/150");
  const [validProfilePictureUrl, setValidProfilePictureUrl] = useState<any>("/assets/icons/profile-placeholder.svg");

  useEffect(() => {
    const validateImages = async () => {
      const postImageResult = await urlValidation(post.imageUrl);
      setValidImageUrl(postImageResult ? post.imageUrl : "https://via.placeholder.com/150");

      const profilePictureResult = await urlValidation(post.user?.profilePictureUrl);
      setValidProfilePictureUrl(profilePictureResult ? post.user?.profilePictureUrl : "/assets/icons/profile-placeholder.svg");
    };
    validateImages();
  }, [post.imageUrl, post.user?.profilePictureUrl]);

  return (
   <div className="post-card">
     <Card className="w-full text-white bg-black border-none">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
      <div className="flex items-center gap-3">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={validProfilePictureUrl}
              alt="creator"
              className="w-12 rounded-full lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.user?.username}
            </p>
            <div className="gap-2 flex-center text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.createdAt.toString())}
              </p>
             
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.id}`}
          className={`${user.id !== post.user?.id && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
          <img
             src={validImageUrl}
             alt="post image"
             className="post-card_img "
            />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        {/* post stats */}
        <PostStats post={post} userId={user.id} totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
        <p className="mb-2 font-semibold">{totalLikes} likes</p>
        <p className="mb-2 text-sm">
          <span className="font-semibold">muhammadrafi</span> Pengen ayam
        </p>
        {/* post comment */}
        <PostComment postId={post.id} />
      </CardFooter>
    </Card>
   </div>
  )

}


export default PostCard;
