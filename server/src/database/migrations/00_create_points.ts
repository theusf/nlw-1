import Knex from 'knex';

//Porque K maiusculo, para se referir a tipos do typescript

export async function up(knex: Knex) {
   // Criar a tabela
    return knex.schema.createTable('points', table => {
        table.increments().primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable(); 
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    // Rollback, no caso deletar
    return knex.schema.dropTable('points')
}