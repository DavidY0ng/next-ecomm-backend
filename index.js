import express from "express"
import prisma from "./src/utils/prisma.js"
import { Prisma } from "@prisma/client"

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
  })

app.listen(port, () => {
  console.log(`App started; listening on port ${port}`)
})

app.post(`/users`, async (req, res) => {
  try {
    const { name, email, password } = req.body
    const users = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  res.json(users)

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const formattedError = {}
      formattedError[`${err.meta.target[0]}`] = 'already taken'

      return res.status(500).send({
        error: formattedError
      });
    }
    throw err
  } 

})

