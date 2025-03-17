import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 5050;

//basic home route

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

import ingredientRoutes from "./routes/ingredient-routes.js";

app.use("/ingredients", ingredientRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
