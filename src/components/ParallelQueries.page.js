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
  // data fetched and returned
  useQuery("super-heroes", fetchSuperHeroes);
  useQuery("fSociety", fetchFSociety);
  return <div> ParallelQueriesPage</div>;
};
