require("dotenv").config();
const express = require("express");
const inventoryRouter = require("./routes/inventoryRouter");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", inventoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
