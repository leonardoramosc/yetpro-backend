import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("card_lists", function (table) {
    table.increments("card_list_id");
    table.string("name").notNullable();
    table.integer("board_id").unsigned().notNullable();

    table.foreign("board_id").references("board_id").inTable("boards").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("card_lists");
}

