import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("boards", function (table) {
    table.increments("board_id");
    table.string("board_name", 255).notNullable();
    table.integer("user_id").unsigned().notNullable();

    table.foreign("user_id").references("user_id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("boards");
}
