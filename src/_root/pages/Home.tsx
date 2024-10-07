import { Loader, PostCard } from "@/components/shared";
import { PostElement } from "@/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetPosts } from "@/lib/react-query/queries";


const Home = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts() as any;
const { ref, inView } = useInView();

useEffect(() => {
  if (inView) {
    fetchNextPage();
  }
}, [inView]);
return (
  <div className="flex flex-1">
    <div className="home-container">
      <div className="home-posts">
        <h2 className="w-full text-left h3-bold md:h2-bold">Home Feed</h2>
        {posts?.pages.map((page: any, index: number) => (
          <ul key={index} className="flex flex-col flex-1 w-full gap-9 ">
            {page?.data.data.posts.map((post: PostElement) => (
              <li key={post.id} className="flex justify-center w-full">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ))}
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Home;