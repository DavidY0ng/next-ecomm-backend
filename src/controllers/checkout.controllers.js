// This is your test secret API key.
import express from 'express';
import Stripe from 'stripe'
const stripe = new Stripe ('sk_test_51NLH7lDSZDxIvwntMu2KfIg6n8VKlCXJBGrh5OWusAuADBw6EZxz3jGP8Q4625BklCKm9s6iD8m1nGrV6DL1y7TF00ppTTwxyb')
const router = express.Router()

router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 1900,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5713/success',
    cancel_url: 'http://localhost:5713/cancel',
  });

  res.redirect(303, session.url);
});

export default router
// app.listen(4242, () => console.log(`Listening on port ${4242}!`));