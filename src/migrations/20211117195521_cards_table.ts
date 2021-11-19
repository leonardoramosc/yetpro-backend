import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cards", function (table) {
    table.increments("card_id");
    table.integer("card_list_id").unsigned().notNullable();
    table.string("name", 50).notNullable();

    table.foreign("card_list_id").references("card_list_id").inTable("card_lists").onDelete("CASCADE");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cards");
}

