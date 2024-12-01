import { prisma } from '../config/db.js';

export const userService = {
  async getAllUsers() {
    return await prisma.users.findMany();
  },

  async getUserById(uid) {
    return await prisma.users.findUnique({
      where: { uid },
    });
  },

  async getUserByEmail( email) {
    return await prisma.users.findUnique({
      where: {  email },
      select: {
        display_name: true,
        email: true,
        email_verified: true,
        full_name: true,
        phone_number: true,
        photo_url: true,
        uid: true
      }
    });
  },

  async userRegister(userData) {
    return await prisma.users.create({
      data: userData
    });
  },
  
  async userUpdateInfo(userData, uid) {
    return await prisma.users.update({
      where: { uid },
      data: userData
    });
  }
}