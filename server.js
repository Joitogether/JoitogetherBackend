import { app } from "./app.js";
import http from "http";
import "dotenv/config";
import { initSocket } from "./src/config/socket.js";
import cronJobs from "./src/utils/cronjob.js";

const port = 3030;

const server = http.createServer(app);
initSocket(server);

cronJobs.dailyUpdates();

server.listen(port, "::", () => {
  console.log(`server running on port ${port}`);
});
