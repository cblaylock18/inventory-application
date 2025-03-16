require("dotenv").config();
const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", inventoryRouter);
app.use("/categoryManagement", categoryRouter);
app.use("/userManagement", userRouter);
app.use("/productManagement", productRouter);

app.use("*", (req, res) =>
    res.status(404).render("errorPage", {
        title: "Uh-oh...",
        message:
            "Looks like this page doesn't exist. Go back to Home and try again!",
    })
);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500);

    res.render("errorPage", {
        title: "Error",
        message: "Something went wrong! Please try again later.",
        error: process.env.NODE_ENV === "production" ? {} : err,
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "::", () => console.log(`Listening on [::] ${PORT}`));
