const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../../middlewares/Auth");
const { asyncTryCatchMiddleware } = require("../../middlewares/async");

var stripe = require("stripe")(
  "sk_test_51Jhv2sGfOTJnV5So6WtY0Hc0qvxfDj0IXYAUvnknv4qCPTjHngFLHmxyh1NNnlDjsbt1gADDKb49Yh9ZwM5hT4uv00DGaEyIB0"
);

async function createPaymentIntent(req, res) {
  let paymentIntent;
  let clientSecret;
  const currency = "USD";
  const params = {
    payment_method_types: ["card"],
    currency,
    amount: 1900,
  };
  console.log("here 1 ");

  try {
    paymentIntent = await stripe.paymentIntents.create(params);
    clientSecret = paymentIntent.client_secret || "";
    console.log(paymentIntent, "payment intent");
  } catch (err) {
    console.log("here err ", err);

    return { error: err.message };
  }

  // if (!updatedPayment.ok) {
  //   log(updatedPayment.message);
  //   return { error: updatedPayment.message };
  // }
  console.log("here 3");

  res.json({ clientSecret: paymentIntent.client_secret });
  return {
    clientSecret: paymentIntent.client_secret,
    // publishableKey:
    //   "pk_test_51Jhv2sGfOTJnV5SoIwp0EZ3zXD2CxvH6NkafIGo172OYUHjpO75PrfZjZJfUe5yyRVlhJnNGasKl9DnBwnJK3YTB00UrPHUgt6", //process.env.STRIPE_PUBLISHABLE_KEY,
  };
}

paymentRouter.post(
  "/intent",
  // userAuth,
  createPaymentIntent
);

module.exports = paymentRouter;
