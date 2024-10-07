
import { Link } from "react-router-dom";

import { PostElement } from "@/types";
import { useUserContext } from "@/context/useUserContext";
import { multiFormatDateString } from "@/lib/utils";
import {PostComment, PostStats} from "./";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useState } from "react";

type PostCardProps = {
  post: PostElement;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const [totalLikes, setTotalLikes] = useState(post.totalLikes || 0);

  return (
   <div className="post-card">
     <Card className="w-full text-white bg-black border-none">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
      <div className="flex items-center gap-3">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={
                 post.user?.profilePictureUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
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
             src={post.imageUrl || "https://via.placeholder.com/150"}
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
