require("dotenv").config();
const sql = require("sql-template-strings");
const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("❌ DATABASE_URL is missing! Check your .env file.");
}

const SQL = sql`CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "type" VARCHAR(50),
    avgLifespan NUMERIC(4,1)
);

INSERT INTO animals ("type", avgLifespan) 
VALUES 
    ('dog', 12.0),
    ('cat', 15.0),
    ('parakeet', 10.0),
    ('goldfish', 5.0),
    ('hamster', 2.5);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    street VARCHAR(200),
    city VARCHAR(100),
    state CHAR(2),
    zip CHAR(5)
);

INSERT INTO users (name, phone, street, city, state, zip)
VALUES
    ('Alice', '555-1234', '123 Main St', 'Los Angeles', 'CA', '90001'),
    ('Bob', '555-5678', '456 Elm St', 'New York', 'NY', '10001'),
    ('Charlie Joe', '555-9012', '789 Oak St', 'Houston', 'TX', '77001');

CREATE TABLE IF NOT EXISTS userAnimals (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    animalId INTEGER REFERENCES animals(id),
    petName VARCHAR(100),
    price NUMERIC(10,2)
);

INSERT INTO userAnimals (userId, animalId, petName, price)
VALUES
    (1, 1, 'Buddy', 250.00),
    (2, 2, 'Whiskers', 150.00),
    (3, 3, 'Polly', 50.00),
    (1, 4, 'Goldie', 20.00),
    (1, 5, 'Hammy', 15.00);
`;

async function populateDatabase() {
    console.log("seeding...");
    const client = new Client({ connectionString: connectionString });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

populateDatabase();
