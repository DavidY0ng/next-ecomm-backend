import express from "express"
import userRouter from "./src/controllers/users.controllers.js"
import authRouter from "./src/controllers/auth.controllers.js"
import imageRouter from "./src/controllers/image.controllers.js"
import getImageRouter from "./src/controllers/get-images.controllers.js"
import deleteRouter from "./src/controllers/delete.controllers.js"
import cors from "cors"
import morgan from "morgan"
import auth from "./src/middlewares/auth.js" 
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/images', auth, imageRouter)
app.use('/get-images', getImageRouter)
app.use('/delete', deleteRouter)

// app.get('/protected', auth, (req, res) => {
//     res.json({ "hello": "world" })
//   })

export default app

