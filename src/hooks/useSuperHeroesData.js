// creating custom query hooks involves  3 steps
// 1 define fetcher function
// wrap the usequery hook
// arguments if necessary.

//file name convention (personal preference example) - use to indicate this file is a hook
// list of super heroes in our case, and we are using this hook for remote Data work.

//import useQuery hook from react-query
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

//wrapper for our useQuery hook
// placing onSuccess and onError as parameters rather than defining them allows
// calling error handling at the component level.
// the error handling could be handled at the object level
// rather than passing them through parameters.

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    fetchSuperHeroes,
    //specify on success and on error configurations.
    {
      onSuccess,
      onError,

      // data is our response, so we can use select to extract the superhero name
      /*       select: (data) => {
        //map over the data in hero and return just the name.
        const superHeroNames = data.data.map((hero) => hero.name);
        //return our array of superHeroNames
        return superHeroNames;
      }, */
    }
  );
};
