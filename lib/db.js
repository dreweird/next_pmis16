// lib/db.js
import mysql from 'mysql2';

// Create a connection pool (recommended for serverless environments)
const pool = mysql.createPool({
  host: process.env.DB_HOST || '172.16.128.42', // MySQL host
  user: process.env.DB_USER || 'dpcr',      // MySQL username
  password: process.env.DB_PASSWORD || 'onedacaraga',  // MySQL password
  database: process.env.DB_NAME || 'next_pmis',// MySQL database name
  waitForConnections: true,
  connectionLimit: 10, // Max simultaneous connections
  queueLimit: 0
});

// Optional: Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    // console.log("Database connected!");
    connection.release(); // Important: release the connection back to pool
  }
});

// Export pool with async/await support
const db = pool.promise();

export default db;