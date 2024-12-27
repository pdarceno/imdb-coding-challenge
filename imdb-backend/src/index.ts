import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { RequestHandler } from "express";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;
const omdbBaseUrl = process.env.OMDB_BASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
}

// Search movies endpoint
const searchMovies: RequestHandler = async (req, res) => {
  try {
    const { query } = req.query as { query: string };
    if (!query) {
      res.status(400).json({ error: "Search query is required" });
      return;
    }

    const response = await axios.get<SearchResponse>(
      `${omdbBaseUrl}/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
    );
    res.json(response.data);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
    return;
  }
};

// Get movie details endpoint
const getMovieDetails: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${omdbBaseUrl}/?apikey=${process.env.OMDB_API_KEY}&i=${id}`
    );
    res.json(response.data);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details" });
    return;
  }
};

app.get("/api/movies/search", searchMovies);
app.get("/api/movies/:id", getMovieDetails);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
