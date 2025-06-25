Task 2: Backend Development – Movie API Integration & Recommendation System

Objective

Build a backend service that integrates with The Movie Database (TMDB) API to fetch and serve movie data, and implement a movie recommendation system using OpenAI API.

⸻

Requirements

1. TMDB API Integration
   • Set up a backend service (Node.js, Python, etc.) with secure access to the TMDB API.
   • Implement an internal service or scheduled job to fetch and cache a list of movies (e.g. trending, popular, top-rated).
   • Store the fetched movies temporarily in memory or a database (for this phase, simple in-memory storage is acceptable).
   • Ensure proper handling of API keys and rate limits.

2. API Endpoint
   • Create an HTTP GET endpoint:

GET /movies

    •	This endpoint should return a list of movies fetched from the TMDB API.
    •	Optionally support query parameters like category=popular or limit=10.

3. Recommendation System
   • Implement an endpoint to provide personalized movie recommendations:

POST /recommend

    •	The endpoint should accept a user preference input (initially a text-based search query, e.g., "I like science fiction with strong female leads").
    •	Use the OpenAI API (e.g., GPT-4.5 or later) to process the user input and return a list of relevant movie IDs or titles from the existing TMDB movie dataset (fetched earlier).

4. OpenAI Prompt Design
   • Prepare and document the prompt used for querying the LLM.
   • The prompt should support natural language understanding and allow future extensibility (e.g., ratings, mood, actors, etc.).

Sample Prompt Template:

You are a movie recommendation assistant. Given a user's movie preference input and a list of available movies (with titles, genres, descriptions, etc.), suggest the most relevant matches.

User Input: "I like science fiction with strong female leads"

Available Movies:

1. Title: Interstellar, Genre: Sci-Fi, Description: ...
2. Title: Arrival, Genre: Sci-Fi, Description: ...
   ...

Based on the user's input, return a list of the most relevant movie titles. Format the output as a JSON array of recommended titles.

⸻

Deliverables
• Source code of the backend service.
• .env example file with required API keys.
• README with setup instructions and example requests/responses.
• A clearly defined and modular prompt for the recommendation engine, allowing easy tuning or extension later.

Prompt Template Used in Backend:

You are a movie recommendation assistant. Given a user's movie preference input and a list of available movies (with titles, genres, descriptions, etc.), suggest the most relevant matches.

User Input: "<user input>"

Available Movies:

1. Title: <title>, Genre: <genre_ids>, Description: <overview>
   ...

Based on the user's input, return a JSON array of the most relevant movie titles.
