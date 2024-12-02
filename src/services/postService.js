import { prisma } from '../config/db.js'
import { CreatePostCommentSchema, CreatePostSchema } from '../validations/postSchema.js'


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
  }
}
