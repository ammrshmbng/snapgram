import { Button } from "@/components/ui";
import { useGetPostById } from "@/lib/react-query/queries";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const { data: post, isPending } = useGetPostById(id);

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

      
        
    </div>
  );
};

export default PostDetails;
