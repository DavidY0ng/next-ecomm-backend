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

router.delete('/:id', auth, async (req, res) => {
  const image = await prisma.image.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  console.log(image)
  if (req.user.payload.id != image.sellerId) {
      return res.status(401).send({"error": "Unauthorized"})
  }
  
  const deleteImage = await prisma.image.delete({
    where: {
     id: parseInt(req.params.id)
    },
  })
  return res.json(`deleted: image id ${req.params.id}`)
})


export default router