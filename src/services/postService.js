import { prisma } from "../config/db.js";
import {
  CreatePostCommentSchema,
  CreatePostSchema,
  GetCategoryPostSchema,
  GetPostSchema,
  DeletePostSchema,
  DeletePostCommentSchema,
} from "../validations/postSchema.js";

export const postService = {
  // 獲得所有 post
  async getAllPosts() {
    const response = await prisma.posts.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    if (!response || response.length === 0) {
      return null;
    }
    return response;
  },

  // 獲得單一 post
  async getPost(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.posts.findUnique({
      where: { post_id },
      include: {
        users: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
        post_comments: {
          include: {
            users: {
              select: {
                display_name: true,
                photo_url: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
  },

  // 根據分類獲得 posts
  async getPostByCategory(post_category) {
    GetCategoryPostSchema.parse({ post_category });
    const response = await prisma.posts.findMany({
      where: {
        post_category,
        post_status: "posted",
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (response.length === 0) {
      return null;
    }
    return response;
  },

  // 新增 post
  async createPost(data) {
    CreatePostSchema.parse(data);
    return await prisma.posts.create({
      data,
    });
  },

  // 編輯 post
  async updatePost(post_id, data) {
    CreatePostSchema.parse(data);
    return await prisma.posts.update({
      where: { post_id },
      data,
    });
  },

  // 刪除 post
  async deletePost(post_id) {
    DeletePostSchema.parse({ post_id });
    return await prisma.posts.update({
      where: { post_id },
      data: { post_status: "deleted" },
    });
  },

  // 透過 post_id 獲得留言
  async getPostComments(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.post_comments.findMany({
      where: {
        post_id,
        status: "active",
      },
      include: {
        users: {
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
  },

  // 新增 post 留言
  async createPostComment(data) {
    CreatePostCommentSchema.parse(data);
    return await prisma.post_comments.create({
      data,
    });
  },

  // 刪除 post 留言
  async deletePostComment(comment_id) {
    DeletePostCommentSchema.parse({ comment_id });
    return await prisma.post_comments.update({
      where: { comment_id },
      data: { status: "deleted" },
    });
  },

  // 獲得 post 按讚
  async getPostLikes(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.post_likes.findMany({
      where: {
        post_id,
        status: "liked",
      },
      select: {
        like_id: true,
        post_id: true,
        uid: true,
        created_at: true,
      },
    });
  },

  // 新增 post 按讚
  async createPostLike(post_id, uid) {
    const existingLike = await prisma.post_likes.findFirst({
      where: {
        post_id,
        uid,
      },
    });

    if (existingLike) {
      return prisma.post_likes.update({
        where: { like_id: existingLike.like_id },
        data: { status: "liked" },
      });
    } else {
      return prisma.post_likes.create({
        data: {
          post_id,
          uid,
          status: "liked",
        },
      });
    }
  },

  // 取消 post 按讚
  async deletePostLike(post_id, uid) {
    const existingLike = await prisma.post_likes.findFirst({
      where: {
        post_id,
        uid,
      },
    });

    if (existingLike) {
      if (existingLike.status !== "unlike") {
        return await prisma.post_likes.update({
          where: { like_id: existingLike.like_id },
          data: { status: "unlike" },
        });
      }
      return existingLike; // 已經是 "unlike"，直接返回
    } else {
      throw new Error("記錄不存在，無法取消按讚");
    }
  },
};
