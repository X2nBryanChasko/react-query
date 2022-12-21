import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFSociety = () => {
  return axios.get("http://localhost:4000/fSociety");
};

export const ParallelQueriesPage = () => {
  // for our parallel queries to be run without conflicts, we'll need to create alias for
  // data fetched and returned. this will allow us to render data from superHeroes or fScoiety in JSX
  // without making this dynamic, it does not know how many parallel queries to execute
  // manually querying useQuery multiple times like this
  // violates the rules of react hooks which require dynamic data
  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: fSociety } = useQuery("fSociety", fetchFSociety);
  return <div> ParallelQueriesPage</div>;
};
