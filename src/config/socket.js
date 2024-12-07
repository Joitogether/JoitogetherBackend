import { Server } from "socket.io"
import { userService } from "../services/userService.js"

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // 前端地址
      methods: ["GET", "POST"],
      credentials: true
    }
  })
  
  
  io.on('connection', (socket) => {
    // 聽到authenticate就開這個通道
    socket.on('authenticate', (userId) => {
      console.log(userId)
      socket.join(userId)
    })
    // 聽到sendNotification時就根據挾帶的data裡面是否有帶要給這個資訊人的id，把data打到那個通道
    socket.on('sendNotification', async (data) => {
      const response = await userService.addNotification(data)
      console.log(response)
      // io.to(data.receiverId).emit('newNotification', data);
      if(!response){
        return
      }
      io.to(data.user_id).emit('newNotification', data)

    });
  })
}