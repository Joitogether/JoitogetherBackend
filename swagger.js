import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Joitogether API",
    description: "Joitogether API 集大成！",
  },
  host: "localhost:3030",
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen()(outputFile, routes, doc);
