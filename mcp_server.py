from fastmcp import FastMCP
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import List, Optional

# Initialize the MCP server
mcp = FastMCP("simple-postgres-mcp")

# Database connection parameters (matching index.js/docker-compose.yml)
DB_CONFIG = {
    "host": "localhost",
    "port": 5433,
    "user": "user",
    "password": "password",
    "dbname": "mydatabase"
}

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        raise RuntimeError(f"Failed to connect to database: {e}")

@mcp.resource("postgres://users/schema")
def get_schema() -> str:
    """Returns the schema of the 'users' table."""
    return """
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """

@mcp.tool()
def list_users() -> List[dict]:
    """Lists all users in the database."""
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM users ORDER BY id")
            return cur.fetchall()
    finally:
        conn.close()

@mcp.tool()
def find_user(search_term: str) -> List[dict]:
    """Finds users by name or email (partial match)."""
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            query = "SELECT * FROM users WHERE name ILIKE %s OR email ILIKE %s"
            param = f"%{search_term}%"
            cur.execute(query, (param, param))
            return cur.fetchall()
    finally:
        conn.close()

@mcp.tool()
def add_user(name: str, email: str) -> str:
    """Adds a new user to the database."""
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO users (name, email) VALUES (%s, %s) RETURNING id",
                (name, email)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            return f"User created with ID: {user_id}"
    except psycopg2.IntegrityError:
        conn.rollback()
        return "Error: User with this email already exists."
    except Exception as e:
        conn.rollback()
        return f"Error adding user: {e}"
    finally:
        conn.close()

@mcp.tool()
def run_sql(query: str) -> str:
    """
    Executes a raw SQL query (Use with caution).
    Only allows SELECT statements for safety in this demo, 
    but can be expanded.
    """
    # Basic safety check for this starter example
    if not query.strip().upper().startswith("SELECT"):
         return "Error: Only SELECT queries are allowed via run_sql for safety. Use specific tools for modifications."

    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query)
            results = cur.fetchall()
            return str(results)
    except Exception as e:
        return f"SQL Error: {e}"
    finally:
        conn.close()

if __name__ == "__main__":
    mcp.run()
