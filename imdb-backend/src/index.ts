import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createMovieRoutes from "./routes/movieRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT!;
const omdbBaseUrl = process.env.OMDB_BASE_URL!;
const apiKey = process.env.OMDB_API_KEY!;

app.use(cors());
app.use(express.json());

app.use("/api/movies", createMovieRoutes(omdbBaseUrl, apiKey));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
