import swaggerAutogen from "swagger-autogen";

const swaggerInstance = swaggerAutogen();

const doc = {
  info: {
    title: "Joitogether API",
    description: "This is the API documentation for the Joitogether project.",
  },
  host: "localhost:3030",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = [
  "./app.js", // 主入口文件
  "./src/routes/activityRoutes.js",
  "./src/routes/userRoutes.js",
  "./src/routes/applicationRoutes.js",
  "./src/routes/postRoutes.js",
  "./src/routes/ratingRoutes.js",
  "./src/routes/cartRoutes.js",
  "./src/routes/orderRoutes.js",
  "./src/routes/paymentRoutes.js",
];

// 自動生成 Swagger 文件
swaggerInstance(outputFile, routes, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
