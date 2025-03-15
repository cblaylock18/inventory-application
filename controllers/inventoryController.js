const db = require("../db/queries");

async function inventoryAllGet(req, res) {
    const categories = await db.getAllCategories();
    const products = await db.getAllInventory();
    const users = await db.getAllUsers();
    res.render("index", {
        title: "All Foster Animals",
        categories: categories,
        products: products,
        users: users,
    });
}

async function inventoryCategoryGet(req, res) {
    const id = req.params.id;
    const type = await db.getCategoryName(id);
    const products = await db.getAllProductsInCategory(id);

    if (products.length < 1) {
        return res.render("filtered", {
            title: `No ${type} animals yet.`,
        });
    }

    res.render("filtered", {
        title: `All ${type} Foster Animals`,
        products: products,
    });
}

async function inventoryUserGet(req, res) {
    const id = req.params.id;
    const user = await db.getUserName(id);
    const products = await db.getAllProductsInUser(id);

    if (products.length < 1) {
        return res.render("filtered", {
            title: `No ${user} Foster Animals Yet.`,
        });
    }

    res.render("filtered", {
        title: `All ${user} Foster Animals`,
        products: products,
    });
}

module.exports = {
    inventoryAllGet,
    inventoryCategoryGet,
    inventoryUserGet,
};
