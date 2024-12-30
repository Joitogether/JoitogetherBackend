import express from "express";
import activityRouter from "./src/routes/activityRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import ratingRouter from "./src/routes/ratingRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import paymentRouter from "./src/routes/paymentRoutes.js";
import topupRouter from "./src/routes/topupRoutes.js"
import cors from "cors";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";

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
app.use("/topups", topupRouter)

// swagger
import fs from "fs";

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("./swagger-output.json", import.meta.url), "utf-8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error
app.use(errorMiddleware);

export { app };
