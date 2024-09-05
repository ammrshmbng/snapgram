import { Loader } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queries";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="w-full text-left h3-bold md:h2-bold">Home Feed</h2>
          {isPostLoading && !posts ?(
            <Loader />
          ):(
            <ul>
              Test
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
