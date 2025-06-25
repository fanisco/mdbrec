import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(category) {
  let url = "";
  if (category === "trending") {
    url = `${BASE_URL}/trending/movie/week`;
  } else if (["popular", "top_rated"].includes(category)) {
    url = `${BASE_URL}/movie/${category}`;
  } else {
    throw new Error("Invalid category");
  }
  const resp = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
  return resp.data.results;
}
