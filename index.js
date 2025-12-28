const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase',
});

async function main() {
  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('Connected successfully!');

    console.log('Querying users...');
    const res = await client.query('SELECT * FROM users');
    
    console.table(res.rows);
    
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    console.error('Make sure the Docker container is running (npm run db:up)');
  } finally {
    await client.end();
  }
}

// Simple retry logic for container startup
const wait = (ms) => new Promise(res => setTimeout(res, ms));

(async () => {
    let retries = 5;
    while (retries > 0) {
        try {
            await main();
            break;
        } catch (e) {
            console.log(`Connection failed, retrying in 3s... (${retries} attempts left)`);
            retries--;
            await wait(3000);
        }
    }
})();
