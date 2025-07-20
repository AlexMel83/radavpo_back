import * as dotenv from 'dotenv';

dotenv.config({
  path: './../.env',
});

const {
  IS_DOCKER,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

console.log(
  'Loading environment variables...',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
);
if (
  !POSTGRES_USER ||
  !POSTGRES_PASSWORD ||
  !POSTGRES_DB ||
  !POSTGRES_PORT ||
  !POSTGRES_HOST
) {
  console.error(
    'Missing required environment variables for database connection.',
  );
  throw new Error('Please check your .env file for missing variables.');
}
const DB_HOST = IS_DOCKER ? 'postgres' : POSTGRES_HOST;

/**
 * @type {Object.<string, import('knex').Knex.Config>}
 */
console.log('Loaded environment variables:');
console.log(`POSTGRES_HOST: ${DB_HOST}`);
console.log(`POSTGRES_PORT: ${POSTGRES_PORT}`);
console.log(`POSTGRES_USER: ${POSTGRES_USER}`);
console.log(`POSTGRES_PASSWORD: ${POSTGRES_PASSWORD ? '****' : 'undefined'}`);
console.log(`POSTGRES_DB: ${POSTGRES_DB}`);
export default {
  development: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      port: POSTGRES_PORT,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      debug: true,
    },
    pool: { min: 0, max: 7 },
    seeds: {
      directory: './seeds',
    },
  },
};
