import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
const router = express.Router()


router.get('/', async (req, res) => {
//   const data = req.body

  prisma.image.findMany({
  })
  .then(image => {
    return res.json(image)
    

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