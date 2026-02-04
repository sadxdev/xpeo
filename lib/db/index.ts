import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

// Allow connection string to be overridden
const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.warn('POSTGRES_URL environment variable is not set. Database features will not work.');
}

export const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}
