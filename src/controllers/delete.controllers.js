import express from 'express'
import { Prisma } from "@prisma/client"
import prisma from "../utils/prisma.js"
const router = express.Router()

router.delete('/:id', async (req, res) => {
    const image = await prisma.image.findUnique({
      where: {
        id: req.params.id
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

