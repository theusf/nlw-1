import Knex from 'knex';

//Porque K maiusculo, para se referir a tipos do typescript

export async function up(knex: Knex) {
   // Criar a tabela
    return knex.schema.createTable('point_items', table => {
        table.increments().primary();


        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });
}

export async function down(knex: Knex) {
    // Rollback, no caso deletar
    return knex.schema.dropTable('items')
}