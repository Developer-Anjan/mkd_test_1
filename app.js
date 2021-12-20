const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const db = require("./db");
const Product = require("./models/product");

const app = express();

db.authenticate()
  .then(console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  Product.findAll()
    .then((products) => {
      console.log(products);
      res.render("products", {
        data: products,
      });
    })
    .catch((err) => console.log(err));
});

app.use("/product", require("./routes/products"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
