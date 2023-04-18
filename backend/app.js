const express = require("express");
const app = express();
const cors = require("cors");
const signUpRoute = require("./Routes/v1/Auth.routes");
const productRoute = require("./Routes/v1/Products.routes");
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", signUpRoute);
app.use("/api/v1/products", productRoute);

app.use("/", async (req, res) => {
  res.send("Route is working!");
});

module.exports = app;
