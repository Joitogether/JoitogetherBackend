import {
  CreateRatingSchema,
  GetRatingSchema,
} from "../validations/ratingSchema.js";
import { prisma } from "../config/db.js";
import { getActivitiesByTime } from "./cronService.js";

export const ratingService = {
  // 查詢特定 host_id（評價者）的評論列表
  async getRatingByHostId(host_id) {
    GetRatingSchema.parse({ host_id });
    return await prisma.ratings.findMany({
      where: { host_id },
    });
  },

  // 查詢特定 host_id（評價者）的評論列表（含 users_table 的 city、display_name、photo_url）
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
        users_ratings_user_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
            city: true,
          },
        },
      },
    });
  },

  // 查詢特定 user_id（被評價者）的評論列表（含 users_table 的 city、display_name、photo_url）
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

  // 根據活動id或取活動資料以及團主近期評價
  async getRatingAndActivityByActivityId(id) {
    const activity = await prisma.activities.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            uid: true,
            display_name: true,
            photo_url: true,
          },
        },
      },
    });

    if (!activity) {
      return null;
    }

    const hostRatingAverage = await prisma.ratings.aggregate({
      where: {
        host_id: activity.host_id,
      },
      _avg: {
        rating_heart: true,
        rating_kindness: true,
        rating_ability: true,
        rating_credit: true,
      },
    });

    //目前只拿一個
    const latestHostRating = await prisma.ratings.findMany({
      where: {
        host_id: activity.host_id,
      },
      take: 4,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users_ratings_user_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return {
      activity,
      latestHostRating,
      hostRatingAverage,
    };
  },

  async createRating(data) {
    // 先校驗
    CreateRatingSchema.parse(data);
    return await prisma.ratings.create({
      data,
    });
  },

  async getSummary(host_id) {
    return await prisma.ratings.groupBy({
      where: {
        host_id,
      },
      by: ["rating_heart"],
      _count: {
        rating_heart: true,
      },
    });
  },

  async getActivityRatings(activity_id, user_id) {
    const existingRating = await prisma.ratings.findFirst({
      where: {
        activity_id,
        user_id,
      },
      select: {
        rating_id: true,
      },
    });
    return !!existingRating;
  },
};
