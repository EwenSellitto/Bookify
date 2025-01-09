import { useNavigate } from "react-router-dom";

const fetchServer = async (url, body) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing credentials");
  }
  const response = await fetch(process.env.REACT_APP_API_URL + url, {
    method: body.method,
    headers: {
      ...body.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
  }
  return response.json();
}

export default fetchServer;
