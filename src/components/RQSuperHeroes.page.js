import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
//import useQuery hook from react-query

//common pattern - fetcher function extrated outside of the usequery hook

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  //create callbacks to do something after api data is fetched.
  const onSuccess = () => {
    //log our message and the data to the console
    console.log("Perform side effect after SUCCESS data fetching", data);
  };
  //log our message and the error to the console
  const onError = () => {
    console.log("Perform Side effect after ERROR data fetching", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    //specify on success and on error configurations.
    {
      // if we had different keys, we would handle this way:
      // onSuccess: onSuccess,
      // onError: onError,
      onSuccess,
      onError,
    }
  );

  console.log({ isLoading, isFetching });

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
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
// handle the results returned by useQuery hook
