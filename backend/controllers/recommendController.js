import { getCache, setCache } from "../utils/cache.js";
import { fetchMovies } from "../services/tmdbService.js";
import { getRecommendations } from "../services/openaiService.js";

const CACHE_TTL = 10 * 60 * 1000;

export async function recommendMovies(req, res) {
  const userInput = req.body.query;
  if (!userInput) return res.status(400).json({ error: "Missing user input" });
  const cacheKey = `movies_popular`;
  let movies = getCache(cacheKey);
  if (!movies) {
    try {
      movies = await fetchMovies("popular");
      setCache(cacheKey, movies, CACHE_TTL);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch movies from TMDB" });
    }
  }
  try {
    const recommendations = await getRecommendations(
      userInput,
      movies.slice(0, 20)
    );
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ error: "OpenAI API error", details: err.message });
  }
}
