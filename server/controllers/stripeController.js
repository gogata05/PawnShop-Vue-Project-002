// server\controllers\stripeController.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { isAuth } = require("../middlewares/authMiddleware");

router.post("/create-checkout-session", isAuth, async (req, res) => {
  try {
    console.log("Creating checkout session");
    const { items } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.product.brand} ${item.product.model}`,
          images: [item.product.imgUrl],
          description: item.product.description
        },
        unit_amount: item.product.price * 100 // Stripe uses cents
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });

    console.log("Checkout session created:", session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/create-payment-intent", isAuth, async (req, res) => {
  try {
    console.log("Creating payment intent");
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true
      }
    });

    console.log("Payment intent created:", paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
