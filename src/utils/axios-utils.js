//adding an axios interceptor to have a base URL with a token int he header, custom error handling, etc, when working with react-query

import axios from "axios";

//specify an object and set a baseURL
const client = axios.create({ baseURL: "http://localhost:4000" });

//wrap all axios requets

export const request = ({ ...options }) => {
  //set an auth bearor token. in production you will likely retrieve this from local storage
  client.defaults.headers.common.Authorization = "Bearer token";
  //get our success response
  const onSuccess = (response) => response;
  //get the response of our error, which will dependent on implimentations
  const onError = (error) => {
    //optionally catch errors and add additional logging here
    return error;
  };

  //return the axios client, passing in axios options and leveraging axios callbacks
  // with onSuccess and onError, we have an axios interceptor ready.
  return client(options).then(onSuccess).catch(onError);
};
