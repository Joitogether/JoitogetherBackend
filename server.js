import { app } from "./app.js";
import http from "http";
import "dotenv/config";
import { initSocket } from "./src/config/socket.js";
import cron from 'node-cron'
import { prisma }  from './src/config/db.js'
import dayjs from 'dayjs'



cron.schedule('*/5 * * * * *', () => {
  //先抓有沒有昨天進行的活動
  console.log('running a task every minute');
  // 將活動狀態改為completed
  console.log(dayjs()) 
  // 抓這個活動的參加者送提醒給他們

},{
  timezone: 'Asia/Taipei'
});


const port = 3030;

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
