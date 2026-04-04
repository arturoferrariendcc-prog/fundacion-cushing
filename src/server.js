const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe("TU_SECRET_KEY");

app.post("/create-checkout-session", async (req, res) => {
  const { dogName, amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: `Donación para ${dogName}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://project-ztisl.vercel.app",
    cancel_url: "https://project-ztisl.vercel.app",
  });

  res.json({ url: session.url });
});

app.listen(5000, () => console.log("Servidor en puerto 5000"));