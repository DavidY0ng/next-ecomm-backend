import express from "express"
import prisma from "./src/utils/prisma.js"
import { Prisma } from "@prisma/client"

const app = express()
const port = process.env.PORT || 8080

function filter(obj, ...keys) {
  return keys.reduce((a, c) => ({ ...a, [c]: obj[c]}), {})
}

function validateUser(input) {
  const validationErrors = {}

  if (!('name' in input) || input['name'].length == 0) {
    validationErrors['name'] = 'cannot be blank'
  }

  if (!('email' in input) || input['email'].length == 0) {
    validationErrors['email'] = 'cannot be blank'
  }

  if (!('password' in input) || input['password'].length == 0) {
    validationErrors['password'] = 'cannot be blank'
  }

  if ('password' in input && input['password'].length < 8) {
    validationErrors['password'] = 'should be at least 8 characters'
  }

  if ('email' in input && !input['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    validationErrors['email'] = 'is invalid'
  }

  return validationErrors
}

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
    const validationErrors = validateUser(data)
    if (Object.keys(validationErrors).length != 0) return res.status(400).send({
      error: validationErrors
    })

    const { name, email, password } = req.body
    const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  })
  res.json(filter(user, 'id', 'name', 'email'))

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



