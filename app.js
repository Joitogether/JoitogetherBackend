import express from "express";
import activityRouter from "./src/routes/activityRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import ratingRouter from "./src/routes/ratingRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import paymentRouter from "./src/routes/paymentRoutes.js";
import cors from "cors";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import debug from "debug";
debug("app:startup");


const config = {
  developement:{

  },
  production: {
    debug: true,
    logLevel: 'debug'
  }
}

const env = process.env.NODE_ENV || 'developement';
const currentConfig = config[env];




const app = express();

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
app.use("/carts", cartRouter);
app.use("/payments", paymentRouter);
app.use("/orders", orderRouter);

// error
app.use(errorMiddleware);

if (env === 'production') {
  // 確保在生產環境也能看到 debug 訊息
  debug.enabled = true;
  
  app.use((req, res, next) => {
    debug(`${req.method} ${req.url}`); // 記錄請求
    debug('Request Body:', req.body);   // 記錄請求內容
    debug('Query Params:', req.query);  // 記錄查詢參數
    next();
  });

  // 錯誤處理中也加入 debug
  app.use((err, req, res, next) => {
    debug('Error:', err);
    debug('Stack:', err.stack);
    next(err);
  });
}
export { app };
