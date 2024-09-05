import { Input } from "@/components/ui";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

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
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
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
    </div>
  );
};

export default Explore;
