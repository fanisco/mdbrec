import { getCache, setCache } from "../utils/cache.js";
import { fetchMovies } from "../services/tmdbService.js";
import { getRecommendations } from "../services/openaiService.js";

const CACHE_TTL = 10 * 60 * 1000;

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export async function recommendMovies(req, res) {
  const userInput = req.body.query;
  if (!userInput)
    return res.status(400).json({ type: "bot", error: "Missing user input" });
  const cacheKey = `movies_popular`;
  let movies = getCache(cacheKey);
  if (!movies) {
    try {
      movies = await fetchMovies("popular");
      setCache(cacheKey, movies, CACHE_TTL);
    } catch (err) {
      return res
        .status(500)
        .json({ type: "bot", error: "Failed to fetch movies from TMDB" });
    }
  }
  try {
    const recommendations = await getRecommendations(
      userInput,
      movies.slice(0, 20)
    );
    // recommendations is an array of movie titles
    // Find the full movie objects for each recommended title
    const recommendedMovies = recommendations.map((title) => {
      const movie = movies.find(
        (m) => m.title.toLowerCase() === title.toLowerCase()
      );
      if (!movie) return { title };
      return {
        title: movie.title,
        year: movie.release_date ? movie.release_date.slice(0, 4) : "",
        genre:
          movie.genre_ids && movie.genre_ids.length > 0
            ? movie.genre_ids
                .map((id) => GENRE_MAP[id])
                .filter(Boolean)
                .join(", ")
            : "",
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
          : "",
      };
    });
    return res.json({
      type: "bot",
      text: "",
      recommendations: recommendedMovies,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ type: "bot", error: "OpenAI API error: " + err.message });
  }
}
