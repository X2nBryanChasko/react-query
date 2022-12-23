// creating custom query hooks involves  3 steps
// 1 define fetcher function
// wrap the usequery hook
// arguments if necessary.

//file name convention (personal preference example) - use to indicate this file is a hook
// list of super heroes in our case, and we are using this hook for remote Data work.

//import useQuery and useMutation hook from react-query
// useMutation is used to create update or delete data, useQuery to get data
import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

//wrapper for our useQuery hook
// placing onSuccess and onError as parameters rather than defining them allows
// calling error handling at the component level.
// the error handling could be handled at the object level
// rather than passing them through parameters.
// mutation function
const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

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

// custom usemutation hook, which we will ned to call and pass data from the component
// we will import into RQSuperHeroesPage.js
export const useAddSuperHeroData = () => {
  // useMutation doesn't need a key
  // first argument is the function that will return data to the backend addSuperHero
  // second argument is a mutation function, which will be a second arrow function
  return useMutation(addSuperHero);
};
