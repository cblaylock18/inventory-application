const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const numErr = "must only contain numbers.";
const lengthErr = (len) => `must be between 1 and ${len} characters.`;

const validateCategory = [
    body("type")
        .trim()
        .isAlpha()
        .withMessage(
            `Animal's common name ${alphaErr} Spell out numbers if needed.`
        )
        .isLength({ min: 1, max: 50 })
        .withMessage(lengthErr(50)),
    body("avglifespan")
        .trim()
        .isNumeric()
        .withMessage(`Animal's average lifespan ${numErr}`)
        .isFloat({ min: 0, max: 120 })
        .withMessage(
            "Animal's average lifespan must be a number between 0 and 507."
        ),
];

const validateUser = [
    body("name")
        .trim()
        .isAlpha("en-US", { ignore: " " })
        .withMessage(`Name ${alphaErr}`)
        .isLength({ min: 1, max: 50 })
        .withMessage(lengthErr(50)),

    body("phone")
        .trim()
        .isMobilePhone("en-US")
        .withMessage("Please enter a valid phone number."),

    body("street")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 200 })
        .withMessage(lengthErr(200)),

    body("city")
        .optional({ checkFalsy: true })
        .trim()
        .isAlpha("en-US", { ignore: " " })
        .withMessage("City must contain only letters.")
        .isLength({ max: 100 })
        .withMessage(lengthErr(100)),

    body("state")
        .optional({ checkFalsy: true })
        .trim()
        .isAlpha("en-US")
        .withMessage("State must contain only letters.")
        .isLength({ min: 2, max: 2 })
        .withMessage("State must be exactly 2 characters."),

    body("zip")
        .optional({ checkFalsy: true })
        .trim()
        .matches(/^\d{5}$/)
        .withMessage("Zip code must be exactly 5 digits."),
];

async function inventoryAllGet(req, res) {
    const categories = await db.categoriesAllGet();
    const products = await db.inventoryAllGet();
    const users = await db.usersAllGet();
    res.render("index", {
        title: "All Products",
        categories: categories,
        products: products,
        users: users,
    });
}

async function inventoryCategoryGet(req, res) {
    const id = req.params.id;
    const products = await db.inventoryCategoryProducts(id);
    res.render("filtered", {
        title: "Category Filter",
        products: products,
    });
}

async function categoryManagementGet(req, res) {
    const id = req.params.id;
    if (id === "new") {
        res.render("categoryManagement", {
            title: "Manage Category",
            category: null,
        });
    } else {
        const category = await db.categoryDetailsGet(req.params.id);
        res.render("categoryManagement", {
            title: "Manage Category",
            category: category,
        });
    }
}

const categoryManagementPost = [
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id ? req.params.id : "";
        const type = req.body.type;
        const avglifespan = req.body.avglifespan;
        if (!errors.isEmpty()) {
            return res.status(400).render("categoryManagement", {
                title: "Manage Category",
                category: { id, type, avglifespan },
                errors: errors.array(),
            });
        }

        if (id === "new") {
            await db.addCategory(type, avglifespan);
        } else {
            await db.updateCategory(id, type, avglifespan);
        }
        res.redirect("/");
    },
];

async function categoryDeletePost(req, res) {
    const id = req.params.id ? req.params.id : "";

    const rows = await db.isCategoryInUse(id);
    if (rows > 0) {
        const category = await db.categoryDetailsGet(id);
        res.render("categoryManagement", {
            title: "Manage Category",
            category: category,
            errors: [{ msg: "Cannot delete a category that's in use." }],
        });
        return;
    }

    await db.deleteCategory(id);
    res.redirect("/");
}
async function inventoryUserGet(req, res) {
    const id = req.params.id;
    const products = await db.inventoryUserProducts(id);
    res.render("filtered", {
        title: "User Filter",
        products: products,
    });
}

async function userManagementGet(req, res) {
    const id = req.params.id;
    if (id === "new") {
        res.render("userManagement", {
            title: "Manage User",
            user: null,
        });
    } else {
        const user = await db.userDetailsGet(req.params.id);
        res.render("userManagement", {
            title: "Manage User",
            user: user,
        });
    }
}

const userManagementPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        const id = req.params.id ? req.params.id : "";
        const name = req.body.name;
        const phone = req.body.phone;
        const street = req.body.street;
        const city = req.body.city;
        const state = req.body.state;
        const zip = req.body.zip;
        if (!errors.isEmpty()) {
            return res.status(400).render("userManagement", {
                title: "Manage User",
                user: { id, name, phone, street, city, state, zip },
                errors: errors.array(),
            });
        }

        if (id === "new") {
            await db.addUser(name, phone, street, city, state, zip);
        } else {
            await db.updateUser(id, name, phone, street, city, state, zip);
        }
        res.redirect("/");
    },
];

async function userDeletePost(req, res) {
    const id = req.params.id ? req.params.id : "";

    const rows = await db.isUserInUse(id);
    if (rows > 0) {
        const user = await db.userDetailsGet(id);
        res.render("userManagement", {
            title: "Manage User",
            user: user,
            errors: [{ msg: "Cannot delete a user that's in use." }],
        });
        return;
    }

    await db.deleteUser(id);
    res.redirect("/");
}

module.exports = {
    inventoryAllGet,
    inventoryCategoryGet,
    categoryManagementGet,
    categoryDeletePost,
    categoryManagementPost,
    inventoryUserGet,
    userManagementGet,
    userDeletePost,
    userManagementPost,
};
