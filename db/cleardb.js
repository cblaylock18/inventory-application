require("dotenv").config();
const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("❌ DATABASE_URL is missing! Check your .env file.");
}

const SQL = `DROP TABLE userAnimals;
DROP TABLE animals;
DROP TABLE users;
`;

async function populateDatabase() {
    console.log("clearing...");
    const client = new Client({ connectionString: connectionString });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

populateDatabase();
