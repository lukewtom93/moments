import axios from "axios";

axios.defaults.baseURL = "https://drf-api-123-44d3c801caea.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;