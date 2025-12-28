# Simple PostgreSQL Starter Project

A minimal, ready-to-use template for a PostgreSQL project with a Node.js connection script. Designed for GitHub and instantly runnable on CodeSandbox.

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Features

- 🐳 **Dockerized PostgreSQL**: Pre-configured `docker-compose.yml` with a health check.
- 💾 **Auto-Initialization**: `init.sql` automatically creates a table and seeds data on first run.
- 🚀 **Ready to Run**: Includes a simple Node.js script (`index.js`) to connect and query the database.
- ☁️ **Cloud Ready**: Configured for CodeSandbox Devboxes.

## Quick Start (Local)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Database**:
    ```bash
    npm run db:up
    ```

3.  **Run Application**:
    ```bash
    npm start
    ```
    You should see a table of users printed to the console.

4.  **Stop Database**:
    ```bash
    npm run db:down
    ```

## Run on CodeSandbox

This project is configured to run automatically in a CodeSandbox Devbox (VM).

[![Open in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/YOUR_USERNAME/simple-postgres-starter)

*Replace `YOUR_USERNAME` in the URL above with your GitHub username after forking.*

## Project Structure

- `docker-compose.yml`: Defines the PostgreSQL service.
- `init.sql`: SQL script ran on container startup (creates `users` table).
- `index.js`: Node.js script connecting to the DB and fetching data.
- `.codesandbox/`: Configuration for cloud development environment.
