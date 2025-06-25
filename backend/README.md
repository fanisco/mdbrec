# Movie Backend Service

## Directory Structure

```
/backend
├── routes/        # API routes (movies.js, recommend.js)
├── services/      # External API integrations (TMDB, OpenAI)
├── controllers/   # Business logic
├── utils/         # Helpers (cache, etc.)
├── app.js         # App setup
├── server.js      # Server entry point
```

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   # Edit .env and add your TMDB and OpenAI API keys
   ```
3. Start the backend:
   ```bash
   npm start
   ```

## Environment Variables

- `TMDB_API_TOKEN`: Your TMDB API Bearer token
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: (optional) Port to run the backend (default: 5001)

## Endpoints

### GET /movies

Fetch a list of movies from TMDB (cached in memory).

- Query params:
  - `category` (optional): `popular` (default), `trending`, or `top_rated`
  - `limit` (optional): number of movies to return (default: 20)

**Example:**

```bash
curl 'http://localhost:5001/movies?category=popular&limit=5'
```

### POST /recommend

Get movie recommendations based on user input using OpenAI.

- Body: `{ "input": "I like science fiction with strong female leads" }`

**Example:**

```bash
curl -X POST 'http://localhost:5001/recommend' \
  -H 'Content-Type: application/json' \
  -d '{"input": "I like science fiction with strong female leads"}'
```

**Response:**

```json
{
  "recommendations": ["Interstellar", "Arrival"]
}
```

## Prompt Template

The prompt for the recommendation engine is modular and can be extended to include ratings, mood, actors, etc. See `services/openaiService.js` for details.
