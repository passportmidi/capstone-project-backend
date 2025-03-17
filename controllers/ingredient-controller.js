import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const data = await knex("ingredients");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving ingredients: ${err}`);
  }
};

const add = async (req, res) => {
  const { name, volume, grams } = req.body;

  if (!name || !volume || !grams) {
    return res.status(400).json({
      message: "Please provide name, volume and grams for the ingredient",
    });
  }
  const ingredient = { ...req.body, custom: 1 };
  console.log(ingredient);

  try {
    const result = await knex("ingredients").insert(ingredient);

    const newIngredientId = result[0];
    const createdIngredient = await knex("ingredients").where({
      id: newIngredientId,
    });

    res.status(201).json(createdIngredient);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new ingredient: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("ingredients")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Ingredient with ID ${req.params.id} not found`,
      });
    }

    const updatedIngredient = await knex("ingredients").where({
      id: req.params.id,
    });

    res.json(updatedIngredient[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update ingredient with ID ${req.params.id}: ${error}`,
    });
  }
};

export { index, add, update };
