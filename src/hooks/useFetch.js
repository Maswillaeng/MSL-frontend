import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (method = "GET", url, options) => {
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);

  const initialFetch = async () => {
    const response = await fetch(url, {
      method,
      ...options,
    });
    return response;
  };

  const fetchResult = async () => {
    try {
      const response = await initialFetch();
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFetchData(data);
      } else if (response.status === "401") {
        const tokenResponse = await fetch(process.env.REACT_APP_TOKEN_URL, {
          method: "POST",
          credentials: "include",
        });
        if (tokenResponse.ok) {
          const data = await (await initialFetch()).json();
          setFetchData(data);
        } else {
          navigation("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchEffect = async () => {
      await fetchResult();
    };
    fetchEffect();
  }, [url]);

  return [fetchData, isLoading, error];
};

export default useFetch;
