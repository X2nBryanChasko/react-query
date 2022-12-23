/* // we're going to call an api that calls hero nbame and their alter ego and saves it into our db json server
// via a post request
// React query uses mutations to useMutaiton hook | 
// react-query mutations are used to create update or delete data 
// we'll add the code to our data hook in useSuperHeroesData.js
*/

import React from "react";
//using react-router, link our components to the ID route we created in app.js
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
//import useState to track changes to hero names and their alter ego
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  // set up our variable and our setter functions that will track state changes.
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  //create callbacks to do something after api data is fetched.
  const onSuccess = (data) => {
    //log our message and the data to the console
    console.log("Perform side effect after SUCCESS data fetching", data);
  };
  //log our message and the error to the console
  const onError = (error) => {
    console.log("Perform Side effect after ERROR data fetching", error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  // useMutation will return values which we can destructure, you have to call mutate to make the poste request
  // we'll add an alias for mutate
  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    //<> will enclose the return as a react element, allowing us to script in JSX
    // on input, update the state variables
    <>
      <h2>Super Heroes Page - React Query</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

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
