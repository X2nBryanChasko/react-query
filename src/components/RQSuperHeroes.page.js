import React from "react";
//using react-router, link our components to the ID route we created in app.js
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  //create callbacks to do something after api data is fetched.
  const onSuccess = (data) => {
    //log our message and the data to the console
    console.log("Perform side effect after SUCCESS data fetching", data);
  };
  //log our message and the error to the console
  const onError = (error) => {
    console.log("Perform Side effect after ERROR data fetching", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
        return (
          <div key={hero.id}>
            {/* utilizing react-router we can return the rq-superhero component to get details for an individual hero  */}
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* // add a data.map for each heroName, returning each heroName 
      for the key heroName. this is reaturning the data object from our superHeroNames variable */}
      {/*        { data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      }) }  */}
    </>
  );
};
// handle the results returned by useQuery hook
