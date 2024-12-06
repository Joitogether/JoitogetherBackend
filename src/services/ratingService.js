import { GetRatingSchema } from "../validations/ratingSchema.js";
import { prisma } from "../config/db.js";

export const ratingService = {
  async getRatingByHostId(host_id) {
    GetRatingSchema.parse({ host_id });
    return await prisma.ratings.findMany({
      where: { host_id },
    });
  },

  // 查詢 host_id（被評價者） 的評論
  async getRatingWithUserInfoByHostId(host_id) {
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
            photo_url: true,
            city: true,
          },
        },
      },
    });
  },

  // 查詢 user_id（評價者） 的評論
  async getRatingWithUserInfoByUserId(user_id) {
    GetRatingSchema.parse({ user_id });
    return await prisma.ratings.findMany({
      where: { user_id },
      select: {
        rating_id: true,
        host_id: true,
        rating_heart: true,
        user_comment: true,
        rating_kindness: true,
        rating_ability: true,
        rating_credit: true,
        created_at: true,
        users_ratings_host_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
            city: true,
          },
        },
      },
    });
  },
};
