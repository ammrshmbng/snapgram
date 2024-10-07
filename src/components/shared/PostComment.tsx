import { useEffect, useState } from "react";
import { Button, Input } from "../ui";
import { useCreateComment, useDeleteComment, useGetPostById } from "@/lib/react-query/queries";
import { X } from "lucide-react";
import { useUserContext } from "@/context/useUserContext";

const PostComment = ({postId}:any) => {
    const [comments, setComments] = useState<any>([]);
    const [commentInput, setCommentInput] = useState<any>([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const {user} = useUserContext()

    // queries
    const { mutate: createComment } = useCreateComment();
    const {data} = useGetPostById(postId);
    const { mutate: deleteComment } = useDeleteComment();
    const commentsParsed = data?.data?.data?.comments.map((comment:any)=>{
       return  {
        comment: comment.comment,
        commentId: comment.id,
        username: comment.user.username,
        userId: comment.user.id,
    }
    });



    const visibleComments = showAllComments ? comments : comments?.slice(0, 2)
    

    useEffect(()=>{
        setComments(commentsParsed);
    },[data]);

    const toggleComments = () => {
        setShowAllComments(!showAllComments)
      }


  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (commentInput.trim() !== '') {
      createComment({ postId, comment: commentInput });
      setCommentInput('');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
    console.log(commentsParsed)
  };

 

  return (
    <div className="w-full">
        {visibleComments?.map((comment:any, index:any) => (
          <div className="flex items-center justify-between w-full mb-1 text-sm">
          <p key={index+comment.userId} className="mb-1 text-sm">
            <span className="font-semibold">{comment.username}</span> {comment.comment}
          </p>
              
          <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteComment(comment.commentId)}
              className="w-4 h-4 p-0 hover:bg-transparent focus:bg-transparent"
            >
              <X className={`w-3 h-3 text-gray-400 transition-colors hover:text-white
                ${!(user.id == comment.userId)&& "hidden"}`}
               />
            </Button>

          </div>
          
        ))}
       {comments?.length > 2 && (
          <Button
            variant="link"
            className="h-auto p-0 text-sm text-gray-400"
            onClick={toggleComments}
          >
            {showAllComments ? "Hide comments" : `View all ${comments.length} comments`}
          </Button>
        )}
        <form onSubmit={(e:any)=>{handleCommentSubmit(e)}} className="flex w-full gap-3 mt-4">
          <Input
            className="shad-input"
            placeholder="Add a comment..."
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button type="submit" variant="ghost" className="self-center shad-button_primary">
            Post
          </Button>
        </form>
    </div>
  )
}

export default PostComment