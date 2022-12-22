import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

//fetcher function we will call in our usequery below to hook to heroId

//destructure our query key
const fetchSuperHero = ({ queryKey }) => {
  // in our uequery hook below, we want our query key to map to the heroID
  // returned from useQuery as our primary ID, and as super-hero and heroID
  //are in array together, we can refer to the psoition of heroID as 1
  // where super-hero object would be 0.
  const heroId = queryKey[1];
  // this is the endpoint we will get all our information from on hero id
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

/* usequery hook
superhero data is equal to a function dependent on hero id, so we pass it in as a paramter
 call useQueryClient to get hold of client instance, queryClient isntance has access to
 query cache, which we can now access to set initial data
react-query automnaticly fetches other parameters, so we dont have to redeclare them in the arrow function.
get hero from hero list by responding to hero paramter
pass query key into queryClient's getQueryData function
 ge tthe data from the list super-heroes query
use optional chaining in case the cache doesn't have the super heroes list in the data object
 find the hero whose hero id is the same as the passed in hero id from the url (parsed int to ensure numeric)
 if we find a hero, we're goign to set a property called data to hero
return undefined if hero is not found   */
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
  //original code:
  /* return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId)); */
};
