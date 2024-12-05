import { GetRatingSchema } from "../validations/ratingSchema.js";
import { prisma } from "../config/db.js";

export const ratingService = {
  async getRatingByHostId(host_id) {
    GetRatingSchema.parse({ host_id });
    return await prisma.ratings.findMany({
      where: { host_id },
    });
  },

  async getRatingWithUserInfo(host_id) {
    GetRatingSchema.parse({ host_id });
    return await prisma.ratings.findMany({
      where: { host_id },
      select: {
        rating_id: true,
        user_id: true,
        rating_heart: true,
        user_comment: true,
        rating_kindness: true,
        rating_ability: true,
        rating_credit: true,
        created_at: true,
        users_ratings_host_idTousers: {
          select: {
            display_name: true,
            city: true,
            photo_url: true,
          },
        },
      },
    });
  },
};
