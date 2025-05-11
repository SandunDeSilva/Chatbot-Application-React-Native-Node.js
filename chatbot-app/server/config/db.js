const mysql = require("mysql2/promise"); // Use promise version

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatbot",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log("Successfully connected to the database!");
  } finally {
    connection.release();
  }
}

testConnection().catch((err) => {
  console.error("Database connection error:", err);
});

module.exports = pool;
