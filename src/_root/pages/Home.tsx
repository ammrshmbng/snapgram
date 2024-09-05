import { Loader } from "@/components/shared";
import { useGetRecentPosts } from "@/lib/react-query/queries";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  if (isErrorPosts ) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

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
