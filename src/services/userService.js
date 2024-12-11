import { prisma } from "../config/db.js";
import {
  NotificationListSchema,
  NotificationSchema,
  UserUidSchema,
} from "../validations/userSchema.js";
import {
  GetFollowersSchema,
  GetFollowingSchema,
} from "../validations/userSchema.js";

export const userService = {
  async getAllUsers() {
    return await prisma.users.findMany();
  },

  async getUserById(uid) {
    return await prisma.users.findUnique({
      where: { uid },
    });
  },

  async getUserByEmail(email) {
    return await prisma.users.findUnique({
      where: { email },
      select: {
        display_name: true,
        email: true,
        email_verified: true,
        full_name: true,
        phone_number: true,
        photo_url: true,
        uid: true,
      },
    });
  },

  async userRegister(userData) {
    return await prisma.users.create({
      data: userData,
    });
  },

  async userUpdateInfo(userData, uid) {
    return await prisma.users.update({
      where: { uid },
      data: userData,
    });
  },

  async getApplicationsByUserId(uid) {
    UserUidSchema.parse({ uid });
    const response = await prisma.applications.findMany({
      where: {
        participant_id: uid,
        OR: [{ status: "registered" }, { status: "approved" }],
      },
      include: {
        activities: {
          select: {
            name: true,
            location: true,
            event_time: true,
            img_url: true,
          },
        },
      },
    });
    if (response.length === 0) {
      return null;
    }
    return response;
  },
  
  async getUserPosts(uid) {
    UserUidSchema.parse({ uid });
    const response = await prisma.posts.findMany({
      where: { uid, post_status: "posted" },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!response || response.length === 0) {
      return null;
    }
    return response;
  },

  async addNotification(data) {
    try {
      // 先校驗
      NotificationSchema.parse(data);
      // 存db
      const response = await prisma.notifications.create({ data });
      // 回傳整理過的資料
      const detailResponse = await prisma.notifications.findUnique({
        where: { id: response.id },
        select: {
          users_notifications_actor_idTousers: {
            select: {
              display_name: true,
              photo_url: true,
            },
          },
          user_id: true,
          message: true,
          action: true,
          is_read: true,
          created_at: true,
          target_type: true,
          target_id: true,
          id: true,
          link: true,
        },
      });
      let target_detail;
      switch (detailResponse.target_type) {
        case "activity":
          target_detail = await prisma.activities.findUnique({
            where: { id: detailResponse.target_id },
            select: {
              name: true,
            },
          });
          break;
        case "post":
          target_detail = await prisma.posts.findUnique({
            where: { post_id: detailResponse.target_id },
            select: {
              post_title: true,
            },
          });
          break;
        case "rating":
          target_detail = await prisma.ratings.findUnique({
            where: { id: detailResponse.target_id },
            select: {
              user_comment: true,
            },
          });
          break;
      }
      return {
        ...detailResponse,
        target_detail,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getUserNotifications(uid, page, pageSize, additionalSkip){
    const skip = (page - 1) * pageSize + additionalSkip
    const response = await prisma.notifications.findMany({
      skip,
      take: pageSize,
      where: {
        user_id: uid,
      },
      select: {
        users_notifications_actor_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
        message: true,
        action: true,
        is_read: true,
        created_at: true,
        target_type: true,
        target_id: true,
        id: true,
        link: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!response || response.length === 0) {
      return null;
    }
    // 拿target的詳細資料
    const responseWithDetail = await Promise.all(
      response.map(async (notification) => {
        let target_detail = null;
        switch (notification.target_type) {
          case "activity":
            target_detail = await prisma.activities.findUnique({
              where: { id: notification.target_id },
              select: {
                name: true,
              },
            });
            break;
          case "post":
            target_detail = await prisma.posts.findUnique({
              where: { post_id: notification.target_id },
              select: {
                post_title: true,
              },
            });
            break;
          case "rating":
            target_detail = await prisma.ratings.findUnique({
              where: { id: notification.target_id },
              select: {
                user_comment: true,
              },
            });
            break;
        }
        return {
          ...notification,
          target_detail,
        };
      })
    );
    return responseWithDetail;
  },

  async updateUserNotifications(user_id, unreadList) {
    NotificationListSchema.parse({ unreadList });
    const transaction = unreadList.map((id) =>
      prisma.notifications.update({
        where: { id, user_id },
        data: {
          is_read: 1,
        },
      })
    );
    return await prisma.$transaction(transaction);
  },

  async getFollowersByUserId(user_id) {
    GetFollowersSchema.parse({ user_id });
    return await prisma.followers.findMany({
      where: { user_id },
      select: {
        follower_id: true,
        users_followers_follower_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
            favorite_sentence: true,
          },
        },
      },
    });
  },

  async getFollowingByFollowerId(follower_id) {
    GetFollowingSchema.parse({ follower_id });
    return await prisma.followers.findMany({
      where: { follower_id },
      select: {
        user_id: true,
        users_followers_user_idTousers: {
          select: {
            display_name: true,
            photo_url: true,
            favorite_sentence: true,
          },
        },
      },
    });
  },
};
