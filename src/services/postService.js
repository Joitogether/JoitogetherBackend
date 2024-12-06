import { prisma } from "../config/db.js";
import {
  CreatePostCommentSchema,
  CreatePostSchema,
  GetCategoryPostSchema,
  GetPostSchema,
} from "../validations/postSchema.js";

export const postService = {
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
  async getAllPosts() {
    return await prisma.posts.findMany();
  },

  async getPost(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.posts.findUnique({
      where: { post_id },
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
};
