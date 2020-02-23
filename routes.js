const express = require("express");
const router = express.Router();
const stripe = require("stripe")("YOUR-STRIPE-SECRET-KEY");
const uuid = require("uuid/v4");

router.get("/", (req, res) => {
  res.send("Hello World From Stripe");
});

router.post("/payment", (req, res) => {
  console.log("inside payment route");
  const { product, token } = req.body;
  console.log({ product, token });
  const idempontenyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Your purchase of product ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country
            }
          }
        },
        { idempontenyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log({ err }));
});

module.exports = router;
