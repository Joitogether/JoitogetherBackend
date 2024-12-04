import { prisma } from '../config/db.js'
import { CreatePostCommentSchema, CreatePostSchema, GetPostSchema } from '../validations/postSchema.js'


export  const postService = {
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
      where: { post_id }
    })
  }
}
