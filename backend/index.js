import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = 5001;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "API is working!", time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
