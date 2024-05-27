import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  // request interceptor to add authorization header fot every secure call to the api
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      console.log("request stop by interceptors", token);
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.log(err);
      const status = err.response.status;
      console.log("status err:", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
