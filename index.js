import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const { CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));

const PORT = process.env.PORT || 5050;

//basic home route

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

import ingredientRoutes from "./routes/ingredient-routes.js";

app.use("/ingredients", ingredientRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
