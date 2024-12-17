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
  // 獲得所有 posts (包含留言與按讚數量)
  async getAllPosts(page = 1, pageSize = 15) {
    // console.log(page, pageSize);
    // 分頁起始點
    const skip = (page - 1) * pageSize;
    // 分頁筆數
    const take = pageSize;
    // 總筆數
    const totalCount = await prisma.posts.count({
      where: { post_status: "posted" },
    });
    console.log(page, pageSize, skip, take, totalCount);
    const response = await prisma.posts.findMany({
      // 過濾文章狀態 "posted"
      where: {
        post_status: "posted",
      },
      include: {
        users: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
        _count: {
          select: {
            post_comments: {
              where: { comment_status: "active" },
            },
            post_likes: { where: { like_status: "liked" } },
          },
        },
      },
      // 按照創建時間排序
      orderBy: {
        created_at: "desc",
      },
      skip,
      take,
    });

    if (!response || response.length === 0) {
      return { data: [], totalCount, totalPage: 0, currentPage: page };
    }

    // 將資料格式化
    const formattedResponse = {
      data: response.map((post) => ({
        ...post,
        // 將留言數量與按讚數量動態加入 data
        commentCount: post._count.post_comments,
        likeCount: post._count.post_likes,
      })),

      // 分頁資料
      totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
      currentPage: page,
    };

    return formattedResponse;
  },

  // 獲得單一 post (包含留言與按讚詳細資料)
  async getPost(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.posts.findUnique({
      where: {
        post_id,
        post_status: "posted",
      },
      include: {
        users: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
        post_comments: {
          where: { comment_status: "active" },
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
        post_likes: {
          where: { like_status: "liked" },
          select: {
            like_id: true,
            uid: true,
            created_at: true,
          },
        },
      },
    });
  },

  // 根據分類獲得 posts (包含留言與按讚數量)
  async getPostByCategory(post_category) {
    GetCategoryPostSchema.parse({ post_category });
    const response = await prisma.posts.findMany({
      where: {
        post_category,
        post_status: "posted",
      },
      include: {
        users: {
          select: {
            display_name: true,
            photo_url: true,
          },
        },
        _count: {
          select: {
            post_comments: { where: { comment_status: "active" } },
            post_likes: { where: { like_status: "liked" } },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (response.length === 0) {
      return null;
    }
    const formattedResponse = response.map((post) => ({
      ...post,
      commentCount: post._count.post_comments,
      likeCount: post._count.post_likes,
    }));

    return formattedResponse;
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
        comment_status: "active",
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
      data: {
        post_id: data.post_id,
        comment_content: data.comment_content,
        uid: data.uid,
        created_at: data.created_at,
        comment_status: data.comment_status,
      },
    });
  },

  // 刪除 post 留言
  async deletePostComment(comment_id) {
    DeletePostCommentSchema.parse({ comment_id });
    return await prisma.post_comments.update({
      where: { comment_id },
      data: { comment_status: "deleted" },
    });
  },

  // 獲得 post 按讚
  async getPostLikes(post_id) {
    GetPostSchema.parse({ post_id });
    return await prisma.post_likes.findMany({
      where: {
        post_id,
        like_status: "liked",
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
        data: { like_status: "liked" },
      });
    } else {
      return prisma.post_likes.create({
        data: {
          post_id,
          uid,
          like_status: "liked",
        },
      });
    }
  },

  // 取消 post 按讚
  async deletePostLike(like_id) {
    const existingLike = await prisma.post_likes.findFirst({
      where: { like_id },
    });

    if (existingLike) {
      if (existingLike.like_status !== "unlike") {
        return await prisma.post_likes.update({
          where: { like_id: existingLike.like_id },
          data: { like_status: "unlike" },
        });
      }
      return existingLike;
    } else {
      throw new Error("記錄不存在，無法取消按讚");
    }
  },
};
