import { fetchMovies } from "../services/tmdbService.js";
import { getCache, setCache } from "../utils/cache.js";

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function getMovies(req, res) {
  const category = req.query.category || "popular";
  const limit = parseInt(req.query.limit) || 20;
  const cacheKey = `movies_${category}`;
  let movies = getCache(cacheKey);
  if (!movies) {
    try {
      movies = await fetchMovies(category);
      setCache(cacheKey, movies, CACHE_TTL);
    } catch (err) {
      return res.status(500).json({ error: JSON.stringify(err) });
    }
  }
  res.json(movies.slice(0, limit));
}
