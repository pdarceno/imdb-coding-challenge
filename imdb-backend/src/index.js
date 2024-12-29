"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const omdbBaseUrl = process.env.OMDB_BASE_URL;
const apiKey = process.env.OMDB_API_KEY;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/movies", (0, movieRoutes_1.default)(omdbBaseUrl, apiKey));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
