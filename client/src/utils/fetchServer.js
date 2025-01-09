import { useNavigate } from "react-router-dom";

const fetchServer = async (url, options) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing credentials");
  }
  const response = await fetch(process.env.REACT_APP_API_URL + url, {
    method: options.method,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    body: options.body,
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
  }
  return response.json();
};

export default fetchServer;
