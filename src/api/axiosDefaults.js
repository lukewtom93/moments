import axios from "axios";

axios.defaults.baseURL = "https://drf-api-123-44d3c801caea.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosRes.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const { data } = await axios.post("/dj-rest-auth/token/refresh/");
        localStorage.setItem("accessToken", data.access_token);
        err.config.headers.Authorization = `Token ${data.access_token}`;
        return axios(err.config);
      } catch (err) {
        console.error("Token refresh error:", err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);