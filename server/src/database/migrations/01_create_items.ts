import Knex from 'knex';

//Porque K maiusculo, para se referir a tipos do typescript

export async function up(knex: Knex) {
   // Criar a tabela
    return knex.schema.createTable('items', table => {
        table.increments().primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex) {
    // Rollback, no caso deletar
    return knex.schema.dropTable('items')
}