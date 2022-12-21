/* // purpose: for situations where you need queries to happen sequentially
// first we'll query for the user, then using the responsibilityID
// fire a 2nd query where users.responsiblityId matches responsibilities.id */
import { useQuery } from "react-query";
import axios from "axios";

/* //define fetcher function
//fetch user using the email prop, function will receive email as a parameter
// in funciton body we'll do an axios get, the url with template literal and a request for an object from users array */

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

/* //fetch the list of assignments for user with bryan.chasko@datadel.io
// since we cant fetch the assignments till we fetch the user details
// this is a dependent query, and will use responsibilityId as a fetcher parameter */

const fetchAssignmentsByResponsibilityId = (responsibilityId) => {
  return axios.get(
    `http://localhost:4000/responsibilities/${responsibilityId}`
  );
};

export const DependentQueriesPage = ({ email }) => {
  /* 
    //call usequery with query key string user, and email as second element.

  // we can accept the email prop as email.
  // useQuery will return the array as "data", which we can alias as user */
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  /*     // once we have the user, we can access the responsibilityId property
  // if the user exists, access data.responsibilityId */

  const responsibilityId = user?.data?.responsibilityId;
  useQuery(
    ["assignments", responsibilityId],
    () => fetchAssignmentsByResponsibilityId(responsibilityId),
    {
      /*           //converts the property to a boolean, which is what enabled property expects
      // only after responsibilityId has been fetched will we get the assignment details */
      enabled: !!responsibilityId,
    }
  );
  return <div>Dependent Queries</div>;
};
