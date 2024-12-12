import express from "express";
import "dotenv/config";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import activityRouter from "./src/routes/activityRoutes.js";
// import { fbApp } from './src/config/firebase.js';
import userRouter from "./src/routes/userRoutes.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import ratingRouter from "./src/routes/ratingRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./src/config/socket.js";

const app = express();
const port = 3030;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/activities", activityRouter);
app.use("/users", userRouter);
app.use("/applications", applicationRouter);
app.use("/posts", postRouter);
app.use("/ratings", ratingRouter);

// error
app.use(errorMiddleware);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// server start
// app.listen(port,'0.0.0.0', () => {
//   console.log(`server running on port ${port}`)
// })
