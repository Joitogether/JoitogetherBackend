import fs from "fs";
import path from "path";

const filePath = path.resolve(
  "./src/config/login-demo1-9d3cb-firebase-adminsdk-cfe0y-156f01b56e.json"
);
const keyFile = fs.readFileSync(filePath, "utf8");

const keyData = JSON.parse(keyFile);

const formattedPrivateKey = keyData.private_key.replace(/\n/g, "\\n");

const envFilePath = path.resolve("./.env");
const envContent = `FIREBASE_PROJECT_ID=${keyData.project_id}\nFIREBASE_CLIENT_EMAIL=${keyData.client_email}\nFIREBASE_PRIVATE_KEY="${formattedPrivateKey}"\n`;

fs.writeFileSync(envFilePath, envContent, "utf8");
