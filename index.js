const express = require('express');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydatabase',
});

async function connectDb() {
  let retries = 5;
  while (retries > 0) {
    try {
      console.log('Connecting to PostgreSQL...');
      await client.connect();
      console.log('Connected successfully!');
      return true;
    } catch (err) {
      console.log(`Connection failed, retrying in 3s... (${retries} attempts left)`);
      console.error(err.message);
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  return false;
}

app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users ORDER BY id');
    
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Simple Postgres Starter</title>
          <style>
            body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f9fa; font-weight: 600; }
            tr:hover { background-color: #f5f5f5; }
            .status { padding: 10px; background: #e6fffa; color: #006064; border-radius: 4px; display: inline-block; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="status">✅ Connected to PostgreSQL</div>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${result.rows.map(user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${new Date(user.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="margin-top: 30px; color: #666; font-size: 0.9em;">
            Running on <strong>${process.env.DB_HOST || 'localhost'}</strong>
          </p>
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send(`<h1>Error fetching data</h1><pre>${err.message}</pre>`);
  }
});

async function start() {
  const connected = await connectDb();
  if (!connected) {
    console.error('Could not connect to database. Exiting.');
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`
🚀 Server running at http://localhost:${port}`);
    console.log(`Visit http://localhost:${port} in your browser to see the data.`);
  });
}

start();