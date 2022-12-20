import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
//import useQuery hook from react-query

//common pattern - fetcher function extrated outside of the usequery hook

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  // useQuery contains isLoading and data hooks natively.
  // set a unique key super-heroes for the query, create a promise instance object
  // isFetching will help us better track network activity.
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    // with refetchOnMount true, useQuery will refresh on update.
    // query will refresh on browse if data is stale, which is the default behavior

    {
      refetchOnMount: true,
      // refetch on window focus will refresh data any time you click in the window
      // if you want to get new data regardless of whether data is fresh or stale, set to string 'always'
      refetchOnWindowFocus: true,
    }
  );

  if ((isLoading, isFetching)) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    //<> will enclose the return as a react element, allowing us to script in JSX
    <>
      <h2>Super Heroes Page - React Query</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
// handle the results returned by useQuery hook
