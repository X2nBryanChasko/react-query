// goal - take from here and add two additional colors on click
// 1. make changes to our usequery hook by usinguseInfiniteQuery
// useInfiniteQuery injects values into our fetcher function
// 2. focus on fetcher function

import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchColors = () => {
  return axios.get(`http://localhost:4000/colors`);
};

export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data } = useInfiniteQuery(
    ["colors"],
    fetchColors
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
        {data?.data.map((color) => (
          <div key={color.id}>
            <h2>
              {color.id} {color.label}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};
