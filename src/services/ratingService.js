import { RatingGetSchema } from "../validations/ratingSchema.js"
import { prisma } from "../config/db.js"

export const ratingService = {
  async getRatingByHostId(host_id) {
    RatingGetSchema.parse({host_id})
    return await prisma.ratings.findMany({
      where: { host_id },
    })
  },
}