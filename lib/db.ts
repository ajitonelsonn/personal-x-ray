// lib/db.ts
import mysql from "mysql2/promise";

// Type for query parameters
type QueryParameter =
  | string
  | number
  | boolean
  | Date
  | Buffer
  | null
  | undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "4000"),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params: QueryParameter[] = []) {
  try {
    let connection;
    try {
      connection = await pool.getConnection();
      const [results] = await connection.execute(sql, params);
      return results;
    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database connection failed");
  }
}

// Test connection on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}

testConnection();

export default pool;
