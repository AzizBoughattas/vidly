const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Genre.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save(customer);
  res.send(customer);
});

module.exports = router;
