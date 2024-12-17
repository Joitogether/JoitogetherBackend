import express from "express";
import activityRouter from "./src/routes/activityRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import ratingRouter from "./src/routes/ratingRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import cors from "cors";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import paymentRouter from "./src/routes/paymentRoutes.js"
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
app.use("/payment", paymentRouter)

// error
app.use(errorMiddleware);

export { app };
