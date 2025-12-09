import { Client } from "pg";

// Replace with your actual connection string
const connectionString = process.env.SQL_CONNECTION_STRING || 'postgres://postgres:12345678@database-postgres.cpy4cq202gb9.us-east-1.rds.amazonaws.com:5432/database_test';

const client = new Client({
  connectionString,
  // Add these if you're having SSL issues
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTable() {
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✓ Connected successfully!');

    // Create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      )
    `;
    await client.query(createTableQuery);
    console.log('✓ Table created successfully!');

    await client.end();
    console.log('✓ Connection closed');
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

// createTable();

async function createAndQueryTable() {
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✓ Connected successfully!');
    

    // Insert data into the table
    const insertData = `
      INSERT INTO users (name, email)
      VALUES
        ('John Doe', 'john.doe@example.com'),
        ('Jane Smith', 'jane.smith@example.com'),
        ('Bob Johnson', 'bob.johnson@example.com')
    `;
    await client.query(insertData);
    console.log('✓ Data inserted successfully!');

    // Query the table
    const queryData = `
      SELECT * FROM users
    `;
    const result = await client.query(queryData);
    console.log('✓ Data queried successfully:');
    console.log(result.rows);

    await client.end();
    console.log('✓ Connection closed');
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

createAndQueryTable();
