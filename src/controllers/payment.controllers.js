import express from 'express';
const app = express();
const stripe = require('stripe')('sk_test_51NLH7lDSZDxIvwntMu2KfIg6n8VKlCXJBGrh5OWusAuADBw6EZxz3jGP8Q4625BklCKm9s6iD8m1nGrV6DL1y7TF00ppTTwxyb')

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));