const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = (len) => `must be between 1 and ${len} characters.`;

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

async function userManagementGet(req, res) {
    const id = req.params.id;
    if (id === "new") {
        res.render("userManagement", {
            title: "Manage User",
            user: null,
        });
    } else {
        const user = await db.getUserDetails(req.params.id);
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
        const user = await db.getUserDetails(id);
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
    userManagementGet,
    userDeletePost,
    userManagementPost,
};
