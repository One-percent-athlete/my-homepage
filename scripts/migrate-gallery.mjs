import { readFile } from 'node:fs/promises';
import pg from 'pg';

if (!process.env.RAILWAY_DATABASE_URL) throw new Error('RAILWAY_DATABASE_URL is required. Load your environment files before running this script.');
const pool = new pg.Pool({ connectionString: process.env.RAILWAY_DATABASE_URL, connectionTimeoutMillis: 10000 });
let client;
try {
  client = await pool.connect();
  await client.query('BEGIN');
  await client.query("SET LOCAL lock_timeout = '5s'");
  await client.query("SET LOCAL statement_timeout = '15s'");
  await client.query(await readFile(new URL('../drizzle/0003_blog_gallery.sql', import.meta.url), 'utf8'));
  await client.query('COMMIT');
  console.log('Gallery preference column is ready. Existing posts remain blog-only.');
} catch (error) {
  if (client) await client.query('ROLLBACK').catch(() => {});
  // Avoid printing connection strings or credentials in database diagnostics.
  console.error('Gallery migration failed:', error.code ?? error.name);
  process.exitCode = 1;
} finally {
  client?.release();
  await pool.end();
}
