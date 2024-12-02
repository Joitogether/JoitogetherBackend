import { prisma } from '../config/db.js'
import { CreatePostSchema } from '../validations/postSchema.js'


export  const postService = {
  async createNewPost(data){
    CreatePostSchema.parse(data)
    return await prisma.posts.create({
      data
    })
  }
}