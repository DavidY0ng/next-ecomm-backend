import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
import auth from '../middlewares/auth.js'
const router = express.Router()


router.post('/', async (req, res) => {
  const data = req.body

  prisma.image.create({
    data
  }).then(image => {
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

router.delete('/delete', auth , async (req, res) => {
  console.log(req.user.payload.id)
  const image = await prisma.image.findUnique({
    where: {
      id: req.user.payload.id
    }
  })
  
  // we have access to `req.user` from our auth middleware function (see code above where the assignment was made)
  if (req.user.id != image.sellerId) {
      return res.status(401).send({"error": "Unauthorized"})
  }
  
  const deleteImage = await prisma.image.delete({
    where: {
     id
    },
  })
  // some code
})


export default router