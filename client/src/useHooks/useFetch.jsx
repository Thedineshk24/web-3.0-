import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

export const useFetch = (keyword) => {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGif = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = await response.json();

      setGif(data[0]?.images?.downsized_medium.url);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchGif();
    }
  }, [keyword]);

  // TODO : return {gif, loading, error};  gives no result dont know why
  // return {gif, loading, error};
  return [gif, loading, error];
};
