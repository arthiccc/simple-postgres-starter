# Simple PostgreSQL Starter Project

A minimal, ready-to-use template for a PostgreSQL project with a Bun web server. Designed for GitHub and instantly runnable on CodeSandbox.

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Features

- 🐳 **Dockerized PostgreSQL**: Pre-configured `docker-compose.yml` with a health check.
- 💾 **Auto-Initialization**: `init.sql` automatically creates a table and seeds data on first run.
- 🚀 **Ready to Run**: Includes an **Express.js** web server (`index.js`) running on **Bun** to display data in the browser.
- ☁️ **Cloud Ready**: Configured for CodeSandbox Devboxes.

## Quick Start (Local)

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Start Database**:
    ```bash
    bun run db:up
    ```
    *Note: If you have issues, run `bun run db:reset` to start fresh.*

3.  **Run Application**:
    ```bash
    bun start
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the user data.

4.  **Stop Database**:
    ```bash
    bun run db:down
    ```

## Run on CodeSandbox

This project is configured to run automatically in a CodeSandbox Devbox (VM).

[![Open in CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/arthiccc/simple-postgres-starter)

*Replace `arthiccc` in the URL above with your GitHub username after forking.*

## Project Structure

- `docker-compose.yml`: Defines the PostgreSQL service.
- `init.sql`: SQL script ran on container startup (creates `users` table).
- `index.js`: Bun/Express script connecting to the DB and fetching data.
- `.codesandbox/`: Configuration for cloud development environment.

## MCP Server (Python)

An MCP server is included to allow LLMs to interact with the database.

1.  **Install Python Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the Server**:
    Make sure the database is running (`bun run db:up`), then:
    ```bash
    python mcp_server.py
    ```

This exposes tools to list users, find users, add users, and run safe SQL queries.