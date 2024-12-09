import { prisma } from '../config/db.js'
import { CreatePostCommentSchema, CreatePostSchema, GetCategoryPostSchema, GetPostSchema } from '../validations/postSchema.js'


export  const postService = {
  async getAllPosts(){
    const response = await prisma.posts.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    if(!response || response.length === 0){
      return null
    }
    return response
  },


  async createPost(data){
    CreatePostSchema.parse(data)
    return await prisma.posts.create({
      data
    })
  },
  async createPostComment(data){
    CreatePostCommentSchema.parse(data)
    return await prisma.post_comments.create({
      data
    })
  },

  async getPost(post_id){
    GetPostSchema.parse({post_id})
    return await prisma.posts.findUnique({
      where: { post_id },
      include: {
        users: {
          select: {
            display_name: true,
            photo_url: true
          }
        },
        post_comments: {
          include: {
            users: {
              select: {
                display_name: true,
                photo_url: true
              }
            }
          },
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    })
  },

  async getPostByCategory(post_category){
    GetCategoryPostSchema.parse({post_category})
    const response = await prisma.posts.findMany({
      where: { 
        post_category,
        post_status: 'posted'
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    if(response.length === 0){
      return null
    }
    return response
  }
}
