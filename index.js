const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors())
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyalityRate = 2;


app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  res.send(newItemPrice)
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember);
  let result;
  if (isMember === 'true'){
    result =  (cartTotal * .9).toString();
  }else{
    result = (cartTotal).toString();
  }
  res.send(result)
});


app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  let  result  = (cartTotal * .05).toString();
  res.send(result)
});


app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let output;
  if (shippingMethod === 'Standard'){
    output = (distance / 50;).toString();
  }else if(shippingMethod === 'Express'){
    output=  (distance / 100).toString();
  }
  res.send(output)
});


app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  let output = weight * distance * 0.1;
  res.send(output)
});


app.get('/loyalty-points ', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  let output = purchaseAmount * loyalityRate;
  res.send(output)
});









app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
