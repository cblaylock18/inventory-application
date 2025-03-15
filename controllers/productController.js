const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../helperFns/asyncHandler");

const lengthErr = (len) => `must be between 1 and ${len} characters.`;

const validateProduct = [
    body("petname")
        .trim()
        .notEmpty()
        .withMessage("Pet name is required.")
        .isLength({ min: 1, max: 100 })
        .withMessage(`Pet name ${lengthErr(100)}`),

    body("price")
        .trim()
        .notEmpty()
        .withMessage("Price is required.")
        .isDecimal({ decimal_digits: "0,2" })
        .withMessage(
            "Price must be a valid number with up to 2 decimal places."
        ),

    body("userid")
        .notEmpty()
        .withMessage("User is required.")
        .isInt()
        .withMessage("User must be selected."),

    body("animalid")
        .notEmpty()
        .withMessage("Animal Type is required.")
        .isInt()
        .withMessage("Animal Type must be selected."),
];

async function productManagementGet(req, res) {
    const id = req.params.id;

    const categories = await db.getAllCategories();
    const users = await db.getAllUsers();
    let errors = [];

    if (categories.length === 0) {
        errors.push({ msg: "Create a category before adding a product." });
    }
    if (users.length === 0) {
        errors.push({ msg: "Create a user before adding a product." });
    }

    if (id === "new") {
        res.render("productManagement", {
            title: "Manage Product",
            users: users,
            categories: categories,
            product: null,
            errors: errors,
        });
    } else {
        const product = await db.getProductDetails(req.params.id);
        res.render("productManagement", {
            title: "Manage Product",
            users: users,
            categories: categories,
            product: product,
            errors: errors,
        });
    }
}

const productManagementPost = [
    validateProduct,
    asyncHandler(async (req, res) => {
        const errorsFromValidation = validationResult(req);
        const id = req.params.id ? req.params.id : "";
        const userid = req.body.userid;
        const animalid = req.body.animalid;
        const petname = req.body.petname;
        const price = req.body.price;

        const categories = await db.getAllCategories();
        const users = await db.getAllUsers();

        const errors = errorsFromValidation.array();
        if (categories.length === 0) {
            errors.push({ msg: "Create a category before adding a product." });
        }
        if (users.length === 0) {
            errors.push({ msg: "Create a user before adding a product." });
        }

        if (errors.length > 0) {
            return res.status(400).render("productManagement", {
                title: "Manage Product",
                product: { id, userid, animalid, petname, price },
                users: users,
                categories: categories,
                errors: errors,
            });
        }

        if (id === "new") {
            await db.addProduct(userid, animalid, petname, price);
        } else {
            await db.updateProduct(id, userid, animalid, petname, price);
        }
        res.redirect("/");
    }),
];

async function productDeletePost(req, res) {
    const id = req.params.id ? req.params.id : "";

    await db.deleteProduct(id);
    res.redirect("/");
}

module.exports = {
    productManagementGet,
    productDeletePost,
    productManagementPost,
};
