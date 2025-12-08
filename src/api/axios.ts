import axios from "axios";

const DEFAULT_TIMEOUT = 30000;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2OTJmZDQ2NTNhY2FjNzM5MjBmMWFkMDAiLCJ1c2VySWQiOiI2OGU0ZWZlYWQyMjQ0MmU3YTQ5NjNhNzciLCJsb2dpblRpbWUiOjE3NjQ3NDIyNDUwMDAsInRva2VuVHlwZSI6MSwiYXJuIjoiIiwiaWF0IjoxNzY0NzQyMjQ1fQ.tVwxhz7805JAetyUHEzAnMr--koT0wq1XyANX4yqn9g";
  const auth ="YnVpbGRNYXBwZXIxMjM0NS1jbGllbnQ6cGFzczEyMzQ1LWNsaWVudA=="
  
  if (token) {
      config.headers["access-token"] = `bearer ${token}`;
    config.headers.Authorization = `Basic ${auth}`;
  }
  
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    console.error(" API Error:", error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      console.error(" Token expired - login again needed");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;