import { app } from "./app.js";
import http from "http";
import "dotenv/config";
import { initSocket } from "./src/config/socket.js";

const port = 3030;

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
