const express = require("express");
const tempEngine = require("express-handlebars");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

db.authenticate()
  .then(console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/product", require("./routes/products"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
