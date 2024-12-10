import { prisma } from "../config/db.js";
import {
  CreatePostCommentSchema,
  CreatePostSchema,
  GetCategoryPostSchema,
  GetPostSchema,
  DeletePostCommentSchema,
  DeletePostLikeSchema,
} from "../validations/postSchema.js";

export const postService = {
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

  async createPost(data) {
    CreatePostSchema.parse(data);
    return await prisma.posts.create({
      data,
    });
  },
  async createPostComment(data) {
    CreatePostCommentSchema.parse(data);
    return await prisma.post_comments.create({
      data,
    });
  },
  // async getAllPosts() {
  //   return await prisma.posts.findMany();
  // },

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

  async deletePostComment(comment_id) {
    DeletePostCommentSchema.parse({ comment_id });
    return await prisma.post_comments.update({
      where: { comment_id },
      data: { status: "deleted" },
    });
  },

  async createPostLike(data) {
    return await prisma.post_likes.create({
      data,
    });
  },

  async getPostLikes(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.post_likes.findMany({
      where: { post_id },
      select: {
        like_id: true,
        post_id: true,
        // comment_id: true,
        uid: true,
        created_at: true,
      },
    });
  },

  async deletePostLike(like_id) {
    DeletePostLikeSchema.parse({ like_id });
    return await prisma.post_likes.delete({
      where: { like_id },
    });
  },
};
