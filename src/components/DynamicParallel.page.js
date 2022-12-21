import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

//we will want to return multiple heroes on one page, so we'll
// gather an array of hero ids, as defined in app.js
export const DynamicParallelPage = ({ heroIds }) => {
  //store the array of results returned by useQueries
  const queryResults = useQueries(
    // we're going to map over the ids stored in the array heroIds
    heroIds.map((id) => {
      return {
        //first Prop is an argument we will pass to useQuery
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  // log it so we have a key and value we can view in queryresults
  // we can see from this that queryResults is simply an array
  // containing the results of queryKey and queryFn
  console.log({ queryResults });
  return <div> Dynamic Parallel Queries Page </div>;
};
