import axios from "axios";

export async function getRecommendations(userInput, movies) {
  const availableMovies = movies
    .map(
      (m, i) =>
        `${i + 1}. Title: ${m.title}, Genre: ${m.genre_ids.join(
          ","
        )}, Description: ${m.overview}`
    )
    .join("\n");

  const prompt = `You are a movie recommendation assistant. The user will describe the kind of movies they like. Based on the provided movie dataset, suggest the most relevant matches.\n\nUser Input: "${userInput}"\n\nAvailable Movies:\n${availableMovies}\n\nReturn a JSON array of the most relevant movie titles.`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const text = response.data.choices[0].message.content;
  const match = text.match(/\[.*\]/s);
  return match ? JSON.parse(match[0]) : [];
}
