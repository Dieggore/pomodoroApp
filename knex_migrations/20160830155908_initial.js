
exports.up = function(knex, Promise) {
    return knex.schema.withSchema('public')
        .createTable('users', function(table){
            table.increments('user_id').primary();
            table.string('first_name');
            table.string('last_name');
            table.string('email').notNullable().unique();
        })
        .createTable('tasks', function(table){
            table.increments('task_id').primary();
            table.string('description');
            table.integer('estimated_pomodoros');
            table.integer('user_id').references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            table.timestamp('created_at').defaultTo( knex.fn.now() );
            table.timestamp('updated_at').defaultTo( knex.fn.now() );
        })
};

exports.down = function( knex, Promise ) {
    return knex.schema.withSchema('public')
        .dropTable("tasks")
        .then(function() {
            return knex.schema.withSchema('public')
                .dropTable("users");
        });
};
