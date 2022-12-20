//

//default react methodology for fetching data is to useState and useEffect to load and store data
import { useState, useEffect } from "react";
import axios from "axios";

export const SuperHeroesPage = () => {
  // an isLoading variable indicates if data has loaded into state

  const [isLoading, setIsLoading] = useState(true);
  // data variable holds the data fetched from the API
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  //react useEffect hook
  useEffect(() => {
    //make a get request to our API endpoint, which returns a promise we can respond to with .then
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        // setData to store the contents of the responde data res.data in the "data" variable declared above
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // use the state of the isLoading variable in order to return jsx indicating to the user the client is still loading data
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page - React UseEffect isLoading Hooks</h2>
      {/* // if "data" has loaded (above) then we'll map over it and return hero.name into the map  */}
      {data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
