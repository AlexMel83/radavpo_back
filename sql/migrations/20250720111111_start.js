/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS postgis;');
  const trx = await knex.transaction();
  try {
    await trx.schema.createTable('session', (table) => {
      table.string('sid').primary().notNullable();
      table.json('sess').notNullable();
      table.timestamp('expire').notNullable();
    });
    await trx.schema.createTable('users', (table) => {
      table.increments('id').primary().notNullable();
      table.string('email', 100).nullable().unique().index();
      table.string('password', 100).nullable();
      table.string('role', 50).defaultTo('user').notNullable();
      table.string('name', 50).nullable();
      table.string('surname', 50).nullable();
      table.string('phone', 50).nullable();
      table.boolean('social_login').defaultTo(false).nullable();
      table.string('facebook_id').unique().nullable();
      table.string('google_id').unique().nullable();
      table.text('picture').nullable();
      table.string('activationlink', 255).nullable().index();
      table.boolean('isactivated').defaultTo(false).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable('tokens', (table) => {
      table.increments('id').primary().notNullable().unique();
      table.integer('user_id').notNullable().unique().index();
      table.text('refreshtoken').notNullable().index();
      table.timestamp('exp_token').notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });

    await trx.schema.createTable('posts', (table) => {
      table.increments('id').primary().notNullable().index();
      table.string('slug').notNullable().unique().index();
      table.string('title').notNullable();
      table.text('excerpt').nullable();
      table.text('content').nullable();
      table.specificType('images', 'text[]').nullable();
      table.string('tags').nullable();
      table.string('category').nullable();
      table.string('source_type', 100).nullable();
      table.text('source_url').nullable();
      table.string('address').nullable();
      table.specificType('location', 'geography(POINT, 4326)').nullable();
      table.string('formatted_address').nullable();
      table
        .enu('status', ['draft', 'published', 'archived'])
        .defaultTo('published')
        .notNullable()
        .index();
      table.integer('user_id').nullable();
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
        .index();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
    await knex.schema.createTable('favorite_posts', (table) => {
      table.increments('id').primary().notNullable();
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('post_id')
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE');
      table.unique(['user_id', 'post_id']);
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable('comments', (table) => {
      table.increments('id').primary().notNullable();
      table.text('text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
      table.integer('post_id').notNullable();
      table.foreign('post_id').references('posts.id').onDelete('CASCADE');
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    });
    await trx.schema.createTable('partners', (table) => {
      table.increments('id').primary().notNullable().index();
      table.integer('user_id').nullable();
      table.string('title', 255).nullable();
      table.string('slug', 255).notNullable().unique().index();
      table.string('excerpt', 500).nullable();
      table.text('content').nullable();
      table.string('category', 100).nullable();
      table.json('contacts').nullable();
      table.string('url', 255).nullable();
      table.specificType('tags', 'text[]').nullable();
      table.specificType('images', 'text[]').nullable();
      table.string('address', 255).nullable();
      table.specificType('location', 'geography(POINT, 4326)').nullable();
      table.string('formatted_address').nullable();
      table
        .enu('status', ['draft', 'published', 'archived'])
        .defaultTo('published')
        .notNullable()
        .index();
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
        .index();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable('hashtags', (table) => {
      table.increments('id').primary().notNullable();
      table.string('name', 50).notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable('post_hashtags', (table) => {
      table.increments('id').primary().notNullable();
      table
        .integer('post_id')
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE');
      table
        .integer('hashtag_id')
        .notNullable()
        .references('id')
        .inTable('hashtags')
        .onDelete('CASCADE');
      table.unique(['post_id', 'hashtag_id']); // Уникальная пара post_id + hashtag_id
    });

    await trx.commit();
  } catch (error) {
    console.error(error);
    await trx.rollback();
    throw Error('Failed migration');
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  const trx = await knex.transaction();
  try {
    await trx.schema.dropTableIfExists('post_hashtags');
    await trx.schema.dropTableIfExists('hashtags');
    await trx.schema.dropTableIfExists('comments');
    await trx.schema.dropTableIfExists('favorite_posts');
    await trx.schema.dropTableIfExists('posts'); // Удаляем после зависимых таблиц
    await trx.schema.dropTableIfExists('partners');
    await trx.schema.dropTableIfExists('tokens');
    await trx.schema.dropTableIfExists('users');
    await trx.schema.dropTableIfExists('session');
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(`Migration rollback failed: ${error.message}`);
  }
};
