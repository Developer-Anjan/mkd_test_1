const express = require("express");
const router = express.Router();

const db = require("../db");
const Product = require("../models/product");

router.get("/", (req, res) =>
  Product.findAll()
    .then((products) => {
      console.log(products);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err))
);

module.exports = router;
