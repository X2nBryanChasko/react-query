// goal - take from here and add two additional colors on click
// 1. make changes to our usequery hook by usinguseInfiniteQuery
// useInfiniteQuery injects values into our fetcher function
// for this example we will only use one- pageParams
// 2. focus on fetcher function
// we want page params to return the first page, so we'll set to a value of 1

import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  //limit to 2 per page to make pagination more demonstrable.
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["colors"],
    fetchColors,
    // to pass parameters in to pageParam for fetching page data, we'll create an option to
    // send in to useInfiniteQuery by adding a 3rd argument, an object/function which receives two parameters
    // we don't need last page so adding an underscore. increase page param value
    // we have 8 data points, and 2 per page, so we'll have 4 pages to work with.
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {/* //useInfiniteQuery hook gives access to a pages object rather than data 
        it gives us access to "group" and index "i"
         */}
        {data?.pages.map((group, i) => (
          //return a react fragment with our infiniteQuery index as key
          <Fragment key={i}>
            {/* // now that our pages are indexed, we can work with the data object again  */}
            {group.data.map((color) => (
              <h2 key={color.id}>
                {color.id} {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        {/* // if there is a next page, this button will be enabled to click it  */}
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching . . ." : null} </div>
    </>
  );
};
