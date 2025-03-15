require("dotenv").config();
const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", inventoryRouter);
app.use("/categoryManagement", categoryRouter);
app.use("/userManagement", userRouter);
app.use("/productManagement", productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
