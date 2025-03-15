const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../helperFns/asyncHandler");

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

async function categoryManagementGet(req, res) {
    const id = req.params.id;
    if (id === "new") {
        res.render("categoryManagement", {
            title: "Manage Category",
            category: null,
        });
    } else {
        const category = await db.getCategoryDetails(req.params.id);
        res.render("categoryManagement", {
            title: "Manage Category",
            category: category,
        });
    }
}

const categoryManagementPost = [
    validateCategory,
    asyncHandler(async (req, res) => {
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
    }),
];

async function categoryDeletePost(req, res) {
    const id = req.params.id ? req.params.id : "";

    const rows = await db.isCategoryInUse(id);
    if (rows > 0) {
        const category = await db.getCategoryDetails(id);
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

module.exports = {
    categoryManagementGet,
    categoryDeletePost,
    categoryManagementPost,
};
