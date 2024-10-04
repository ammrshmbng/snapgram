


import { GridPostList, Loader } from "@/components/shared";
import { useGetPosts } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";






const Explore = () => {
  const { ref, inView } = useInView();


  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  // console.log(posts?.pages )

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);


  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="w-full h3-bold md:h2-bold">Search Posts</h2>
        <div className="flex w-full gap-1 px-4 rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          {/* <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={() =>{}}
          /> */}
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16 flex-between mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="gap-3 px-4 py-2 cursor-pointer flex-center bg-dark-3 rounded-xl">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full max-w-5xl gap-9">
        {/* {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )} */}

        {
          posts?.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.data?.data?.posts} />
          ))
        }

        { !hasNextPage && (
          <p className="w-full mt-10 text-center text-light-4">End of posts</p>
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
