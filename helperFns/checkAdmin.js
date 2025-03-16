const { body } = require("express-validator");
require("dotenv").config();

const validateAdminPassword = [
    body("adminPassword")
        .exists({ checkFalsy: true })
        .withMessage("Admin password is required.")
        .bail()
        .trim(),
];

const checkAdmin = [
    validateAdminPassword,
    function checkAdmin(req, res, next) {
        const adminPassword = req.body.adminPassword;

        if (adminPassword && adminPassword === process.env.ADMIN_PASSWORD) {
            next();
        } else {
            res.status(403).render("errorPage", {
                title: "Forbidden",
                message: "Invalid admin password. Please try again.",
            });
        }
    },
];

module.exports = checkAdmin;
