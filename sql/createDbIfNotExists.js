import pg from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve('./.env'),
});

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  IS_DOCKER,
} = process.env;

const DB_HOST =
  IS_DOCKER === 'true' ? 'postgres' : POSTGRES_HOST || 'localhost';

// Підключаємось до postgres (не до radavpo_db, бо її ще може не бути)
const adminConfig = {
  host: DB_HOST,
  port: POSTGRES_PORT || 5432,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'postgres',
};

const targetDb = POSTGRES_DB;

const createDbIfMissing = async () => {
  const client = new pg.Client(adminConfig);
  try {
    await client.connect();

    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDb],
    );

    if (result.rowCount === 0) {
      console.log(`База даних '${targetDb}' не існує. Створюємо...`);
      await client.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`База даних '${targetDb}' успішно створена.`);
    } else {
      console.log(`База даних '${targetDb}' вже існує. Пропускаємо створення.`);
    }
  } catch (error) {
    console.error('Помилка при перевірці/створенні бази:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

createDbIfMissing();
