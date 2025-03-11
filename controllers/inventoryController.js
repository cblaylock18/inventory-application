const db = require("../db/queries");

async function inventoryAllGet(req, res) {
    const products = await db.inventoryAllGet();
    console.log(products[0]);
    res.render("index", { title: "All Products", products: products });
}

module.exports = { inventoryAllGet };
