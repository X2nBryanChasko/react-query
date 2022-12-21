import { useQuery } from "react-query";
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

//usequery hook
//superhero data is equal to a function dependent on hero id, so we pass it in as a paramter
export const useSuperHeroData = (heroId) => {
  //react-query automnaticly fetches other parameters, so we dont have to redeclare them in the arrow function.
  return useQuery(["super-hero", heroId], fetchSuperHero);
  //original code:
  /* return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId)); */
};
