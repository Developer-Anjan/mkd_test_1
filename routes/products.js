const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51K8onISJKcJSzk8WTbHErDh5AlSEhOfGPUti52Njat2Dft9m21EWHpC8xl6FSL4pOCIZzA3RHblLvkmFcDpTCD5J00Go5ivFdk"
);

// const db = require("../db");
const Product = require("../models/product");
const Order = require("../models/order");

const publishible_key =
  "pk_test_51K8onISJKcJSzk8WN2b5bikjODtKcln4SdY17DCTA9YSEyXSWu2ORb9dji4rU5gBJRdjvB8YVepyBTnafXVxZT8f00XAAIF1xh";

router.get("/:id", (req, res) => {
  const prodId = req.params.id;

  Product.findAll({
    where: {
      id: prodId,
    },
  })
    .then((data) => {
      console.log(data);
      res.render("product", {
        data: data[0]["dataValues"],
        key: publishible_key,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/payment", async (req, res) => {
  const {
    number,
    cvc,
    exp,
    price,
    prod_id,
    title,
    email,
    customer_name,
  } = req.body;

  const exp_month = exp.split("/")[0];
  const exp_year = exp.split("/")[1];
  const card = {
    number,
    exp_month,
    exp_year,
    cvc,
  };

  var status = "failed";
  var charge = null;
  var payment_method = null;

  try {
    const token = await stripe.tokens.create({ card });
    console.log(token);

    const customer = await stripe.customers.create({
      email,
      source: token.id,
      name: customer_name,
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    });

    console.log(customer);

    charge = await stripe.charges.create({
      amount: price, // Charing Rs 25
      description: title,
      currency: "USD",
      customer: customer.id,
    });

    console.log(charge);

    status = "paid";

    payment_method = charge.payment_method_details.type;
  } catch (error) {
    console.log(error);
    status = "failed";
  }

  Order.create({
    prod_id,
    total: price,
    stripe_id: charge ? charge.balance_transaction : "NA",
    status,
  })
    .then((order) => {
      if (status === "paid") {
        res.render("completed", {
          success: true,
          title,
          price,
          payment_method,
        });
      } else {
        res.render("failed");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
