import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

// call useSuperHEroData, which accepts hero id as a paramter to extract our data
// we  destructure useparams from heroID so we can dynamically pass heroId as a parameter
// this heroId corresponds to the :heroID in app.js
export const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  // pass our heroID into the custom hook from our parameters
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      Super Hero Details by ID:<br></br> {"Name "}
      {data?.data.name} {"| AKA "}
      {data?.data.alterEgo} {"| Hero ID: "} {data?.data.id}
    </div>
  );
};
