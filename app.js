import express from "express"
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import imageRouter from "./src/controllers/image.controllers.js"
import getImageRouter from "./src/controllers/get-images.controllers.js"
import checkoutRouter from "./src/controllers/checkout.controllers.js"
import cors from "cors"
import morgan from "morgan"
import auth from "./src/middlewares/auth.js" 
// import * as Sentry from "@sentry/node";

// Sentry.init({ dsn: "https://examplePublicKey@o0.ingest.sentry.io/0" })
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.errorHandler());

// app.get("/debug-sentry", function mainHandler(req, res) {
//     throw new Error("My first Sentry error!");
// });

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/images', auth, imageRouter)
app.use('/get-images', getImageRouter)
app.use('/checkout', checkoutRouter)


export default app

