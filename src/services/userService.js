import { prisma } from "../config/db.js";
import {
  NotificationListSchema,
  NotificationSchema,
  NotificationsSchema,
  UserUidSchema,
} from "../validations/userSchema.js";
import {
  GetFollowersSchema,
  GetFollowingSchema,
} from "../validations/userSchema.js";

// 取得所有使用者
export const userService = {
  async getAllUsers() {
    return await prisma.users.findMany();
  },

  // 依照 uid 取得單一使用者資料
  async getUserById(uid) {
    return await prisma.users.findUnique({
      where: { uid },
    });
  },

  async getUserByEmail(email) {
    return await prisma.users.findUnique({
      where: { email },
    });
  },
  // 使用者註冊
  async userRegister(userData) {
    return await prisma.users.create({
      data: userData,
    });
  },

  // 更新使用者資料（第三方登入）
  async userUpdateInfo(userData, uid) {
    return await prisma.users.update({
      where: { uid },
      data: userData,
    });
  },

  // 依照 uid 取得單一使用者報名資料
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
            id: true,
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

  // 依照 uid 取得單一使用者貼文
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

  // 新增通知
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

  async addNotificationsToFollowers(data) {
    try {
      // 先校驗
      NotificationsSchema.parse(data);
      const { actor_id, action, target_type, target_id, message, link } = data;
      const followers = await userService.getSimplifyFollowers(actor_id);
      if (followers.length == 0) return;

      const followersArray = followers.map((follower) => {
        return {
          actor_id,
          user_id: follower.follower_id,
          action,
          target_type,
          target_id,
          message,
          link,
        };
      });

      await prisma.notifications.createMany({
        data: followersArray,
      });

      const detailResponse = await prisma.notifications.findFirst({
        where: { actor_id, action, target_id },
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
      }
      const followerIds = followers.map((data) => data.follower_id);
      return [
        {
          ...detailResponse,
          target_detail,
        },
        followerIds,
      ];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async addNotifications(data) {
    try {
      // 先校驗
      NotificationListSchema.parse(data);
      // 存db
      const response = await prisma.notifications.createMany(data);
      // 回傳整理過的資料
      const detailResponse = await prisma.notifications.findUnique({
        where: { id: response[0].id },
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

      const recievers = data.map((data) => data.user_id);
      return [
        {
          ...detailResponse,
          target_detail,
        },
        recievers,
      ];
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getUserNotifications(uid, page, pageSize, additionalSkip) {
    const skip = (page - 1) * pageSize + additionalSkip;
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

  // 依照 uid 更新使用者通知
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

  // 取得使用者的追隨者
  async getFollowersByUserId(user_id) {
    GetFollowersSchema.parse({ user_id });
    return await prisma.followers.findMany({
      where: { user_id, isFollowing: true },
      select: {
        id: true,
        follower_id: true,
        isFollowing: true,
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

  // 取得使用者的追隨
  async getFollowingByFollowerId(follower_id) {
    GetFollowingSchema.parse({ follower_id });
    return await prisma.followers.findMany({
      where: { follower_id, isFollowing: true },
      select: {
        id: true,
        user_id: true,
        isFollowing: true,
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

  // 取得使用者整理過的數據
  async getUserSummaries(uid) {
    return await prisma.users.findUnique({
      where: {
        uid,
      },
      select: {
        _count: {
          select: {
            activities: {
              where: {
                OR: [{ status: "registrationOpen" }, { status: "completed" }],
              },
            },
            applications: {
              where: {
                register_validated: 1,
              },
            },
            followers_followers_user_idTousers: true,
            posts: true,
          },
        },
      },
    });
  },

  async followUser(user_id, follower_id) {
    return await prisma.followers.upsert({
      create: {
        user_id,
        follower_id,
        isFollowing: true,
      },
      update: {
        isFollowing: true,
      },
      where: {
        follower_id_user_id: {
          follower_id,
          user_id,
        },
      },
    });
  },

  async unfollowUser(id) {
    return await prisma.followers.update({
      where: {
        id,
      },
      data: {
        isFollowing: false,
      },
    });
  },

  async getSimplifyFollowers(user_id) {
    return await prisma.followers.findMany({
      where: {
        user_id,
        isFollowing: true,
      },
      select: {
        follower_id: true,
      },
    });
  },
};
