
exports.up = function(knex, Promise) {

  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table.string('username', 25).notNullable().unique();
      table.string('password', 100).notNullable();
    }),

    knex.schema.createTable('groups', function(table) {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.integer('admin_user').unsigned().references('users.id');
    }),

    knex.schema.createTable('group_user', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('group_id').unsigned().references('groups.id');

    }),

    knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id');
      table.integer('group_id').unsigned().references('groups.id');
      table.string('name', 100).notNullable();
      table.string('begin', 50).notNullable();
      table.string('end', 50).notNullable();
      table.decimal('lat', 20, 10).notNullable();
      table.decimal('long', 20, 10).notNullable();
      table.string('description');
    })
  ]);
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('events'),
    knex.schema.dropTable('group_user'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('users')
  ]);
};
