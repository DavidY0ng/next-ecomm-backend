// This is your test secret API key.
const stripe = require('stripe')('sk_test_51NLH7lDSZDxIvwntMu2KfIg6n8VKlCXJBGrh5OWusAuADBw6EZxz3jGP8Q4625BklCKm9s6iD8m1nGrV6DL1y7TF00ppTTwxyb');
import express, { static } from 'express';
const app = express();
app.use(static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));