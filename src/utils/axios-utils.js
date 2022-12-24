//adding an axios interceptor to have a base URL with a token int he header, custom error handling, etc, when working with react-query

import axios from "axios";

const clinet = axios.create({ baseURL });
