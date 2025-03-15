const db = require("../db/queries");

async function inventoryAllGet(req, res) {
    const categories = await db.getAllCategories();
    const products = await db.getAllInventory();
    const users = await db.getAllUsers();
    res.render("index", {
        title: "Foster Care Database Management for End-Users",
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

async function inventoryAllCategoriesGet(req, res) {
    const categories = await db.getAllCategoriesAllDetails();

    res.render("categories", {
        title: `All Animal Types`,
        categories: categories,
    });
}

async function inventoryOneCategoryGet(req, res) {
    const id = req.params.id;
    const category = await db.getOneCategoryAllDetails(id);

    res.render("categories", {
        title: `${category[0].type} Details`,
        categories: category,
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

async function inventoryAllUsersGet(req, res) {
    const users = await db.getAllUsersAllDetails();

    res.render("users", {
        title: `All Foster Families`,
        users: users,
    });
}

async function inventoryOneUserGet(req, res) {
    const id = req.params.id;
    const user = await db.getOneUserAllDetails(id);

    res.render("users", {
        title: `${user[0].name} Details`,
        users: user,
    });
}

async function inventoryOneProductGet(req, res) {
    const id = req.params.id;
    const product = await db.getOneProductAllDetails(id);

    res.render("productDetailsPage", {
        title: `${product[0].petname} Details`,
        product: product[0],
    });
}

module.exports = {
    inventoryAllGet,
    inventoryCategoryGet,
    inventoryAllCategoriesGet,
    inventoryOneCategoryGet,
    inventoryUserGet,
    inventoryAllUsersGet,
    inventoryOneUserGet,
    inventoryOneProductGet,
};
