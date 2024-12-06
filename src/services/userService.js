import { prisma } from "../config/db.js";
import { UserUidSchema } from "../validations/userSchema.js";
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
