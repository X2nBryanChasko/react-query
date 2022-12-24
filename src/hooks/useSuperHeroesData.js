// creating custom query hooks involves  3 steps
// 1 define fetcher function
// wrap the usequery hook
// arguments if necessary.

//file name convention (personal preference example) - use to indicate this file is a hook
// list of super heroes in our case, and we are using this hook for remote Data work.

//import useQuery and useMutation hook from react-query
// useMutation is used to create update or delete data, useQuery to get data

// for query invalidation, we'll get access to the query client instance

import { useQuery, useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  ///useMutation has a onSuccess callback hook we can access by adding a second argument
  return useMutation(addSuperHero, {
    //take advantage of the data return from mutation, so we can utilize data or its alias as a parameter,
    // data refers to the entire post response
    onSuccess: (data) => {
      //The first argument of setQueryData is the query key. We want to update super-heroes function, so super-heroes is our key.
      // the 2nd argument will be an arrow function that receives our old query data as an argument. we'll call it oldQueryData (foo)
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        // return an object and ... spread out the old query data ...oldQueryData

        // create a return object to store our updated data, in this case we'll append an array to our original data object
        // the second return contains the results of our mutation response.
        return {
          ...oldQueryData,

          data: [...oldQueryData.data, data.data],
        };
      });

      //we can do the same thing as below without doing the additional network call, as there is a return from our post.
      // see above for updated version with less calls
      // when the mutation succeeds, we want to invalidate the super heroes method
      // pass in the key we specified in our fetcher function.
      /* queryClient.invalidateQueries("super-heroes"); */
    },
  });
};
