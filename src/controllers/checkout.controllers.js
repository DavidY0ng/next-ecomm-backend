// This is your test secret API key.
import express from 'express';
import Stripe from 'stripe'
import prisma from "../utils/prisma.js"
const stripe = new Stripe ('sk_test_51NLH7lDSZDxIvwntMu2KfIg6n8VKlCXJBGrh5OWusAuADBw6EZxz3jGP8Q4625BklCKm9s6iD8m1nGrV6DL1y7TF00ppTTwxyb')
const router = express.Router()

router.post('/', async (req, res) => {
  
  const imageId = req.body
  const imageData = await prisma.image.findUnique ({
    where : {
      id : parseInt(imageId.id)
    }
  })
  console.log(imageData.path)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: imageData.title,
            description: imageData.description,
            images: [imageData.path
            ]
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/checkout/success/',
    cancel_url: 'http://localhost:5173/checkout/cancel/',
  });
  return res.json(session.url)

  // res.redirect(303, session.url);
});

export default router
// app.listen(4242, () => console.log(`Listening on port ${4242}!`));