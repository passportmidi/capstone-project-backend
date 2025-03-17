import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
import * as ingredientController from "../controllers/ingredient-controller.js";

const router = express.Router();

router
  .route("/")
  .get(ingredientController.index)
  .post(ingredientController.add);

router.route("/:id").patch(ingredientController.update);

export default router;
