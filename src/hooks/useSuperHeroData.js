import { useQuery } from "react-query";
import axios from "axios";

//fetcher function we will call in our usequery below to hook to heroId

const fetchSuperHero = (heroId) => {
  // this is the endpoint we will get all our information from on hero id
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

//usequery hook
//superhero data is equal to a function dependent on hero id, so we pass it in as a paramter
export const useSuperHeroData = (heroId) => {
  //return usequery with a key to identify the query, super-hero. also dependent on the heroId,
  // we can specify an array to ensure that each superhero in an array of objects indexed by their Id rather than
  // querying only the initial return object as 1 object. returning an array of super-hero
  // indexed on heroId allows a dynamic return & reactQuery will now maintain separate queries for
  // every hero that has an id
  // we specify our fetcher function in a second argument as an arrow function
  //  this functional also needs the heroId so it is fetching the appropriate details
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};
