const pool = require("./pool");
const sql = require("sql-template-strings");

async function inventoryAllGet() {
    const SQL = sql`SELECT * FROM userAnimals;`;
    const { rows } = await pool.query(SQL);
    return rows;
}

module.exports = { inventoryAllGet };
