const pool = require("./pool");

async function inventoryAllGet() {
    const { rows } = await pool.query("SELECT * FROM userAnimals;");
    return rows;
}

module.exports = { inventoryAllGet };
