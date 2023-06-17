import express from 'express'
import bcrypt from "bcryptjs"
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import { validateUser } from "../validators/users.js"
const router = express.Router()


router.post('/', async (req, res) => {
  const data = req.body
  const validationErrors = validateUser(data)
  
  prisma.image.create({
    data
  }).then(image => {
    return res.json()
    

  }).catch(err => {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      const formattedError = {}
      formattedError[`${err.meta.target[0]}`] = 'already taken'

      return res.status(500).send({
        error: formattedError
      })
    }
    throw err
  })
})

export default router