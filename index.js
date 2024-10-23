const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("static"));
const port = 3000;

let taxRate = 5; // 5% tax rate
let discountPercentage = 10; // 10% discount
let loyaltyRate = 2; // Loyalty points multiplier

app.get("/cart-total", (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  res.send((newItemPrice + cartTotal).toString()); // Ensure it is a string
});

app.get("/membership-discount", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === "true"; // Boolean conversion

  if (isNaN(cartTotal)) {
    return res.status(400).send("Invalid cart total");
  }

  const result = isMember ? cartTotal * 0.9 : cartTotal;
  res.send(result.toString());
});

app.get("/calculate-tax", (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

  if (isNaN(cartTotal)) {
    return res.status(400).send("Invalid cart total");
  }

  const result = cartTotal * (taxRate / 100); // Use taxRate variable
  res.send(result.toString()); // Send as string
});

app.get("/estimate-delivery", (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);

  if (isNaN(distance)) {
    return res.status(400).send("Invalid distance");
  }

  let output;
  if (shippingMethod === "standard") {
    output = distance / 50;
  } else if (shippingMethod === "express") {
    output = distance / 100;
  } else {
    return res.status(400).send("Invalid shipping method");
  }

  res.send(output.toString()); // Ensure it is a string
});

app.get("/shipping-cost", (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  if (isNaN(weight) || isNaN(distance)) {
    return res.status(400).send("Invalid weight or distance");
  }

  const output = weight * distance * 0.1;
  res.send(output.toString()); // Send as string
});

app.get("/loyalty-points", (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  if (isNaN(purchaseAmount)) {
    return res.status(400).send("Invalid purchase amount");
  }

  const output = purchaseAmount * loyaltyRate;
  res.send(output.toString()); // Send as string
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
