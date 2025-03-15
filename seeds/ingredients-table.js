// import seed data file, array of objects
import ingredientsData from "../seed-data/ingredients.js";

export async function seed(knex) {
  await knex("ingredients").del();
  await knex.raw("ALTER TABLE ingredients AUTO_INCREMENT = 1");
  await knex("ingredients").insert(ingredientsData);
}
