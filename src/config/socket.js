import { Server } from "socket.io";
import { userService } from "../services/userService.js";
import "dotenv/config";

let io;
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, // 前端地址
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // 聽到authenticate就開這個通道
    socket.on("authenticate", (userId) => {
      socket.join(userId);
    });
    // 聽到sendNotification時就根據挾帶的data裡面是否有帶要給這個資訊人的id，把data打到那個通道
    socket.on("sendNotification", async (data) => {
      if (data.action == "create") {
        // data 0 為通知內容 1 為使用者陣列
        const data = await userService.addNotificationsToFollowers(data);
        io.to(data[1]).emit("newNotification", data[0]);
      } else {
        //拿到提醒先新增在資料庫
        const response = await userService.addNotification(data);
        // 成功新增資料庫之後將提醒直接發給該使用者
        if (!response) {
          return;
        }
        io.to(data.user_id).emit("newNotification", response);
      }
    });
  });
};

export const getIO = () => {
  if (!io) {
    console.log("沒有sockets鞥用");
    return;
  }
  return io;
};
