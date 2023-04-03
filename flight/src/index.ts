import { app } from "./app";
import { connection } from "./database/connection";
import "dotenv/config";
const checkEnv = () => {
  const env = [
    "PORT",
    "NODE_ENV",
    "COOKIE_NAME",
    "JWT_SECRET",
    "JWT_EXPIRATION",
    "MONGO_URI",
  ];
  env.forEach((data) => {
    if (!process.env[data]) {
      console.log(`${data} env not found`);
      process.exit(1);
    }
  });
};

const initServer = async () => {
  checkEnv();
  await connection(process.env.MONGO_URI!).catch(() => {
    console.log("Db error");
  });
  console.log("DB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server listening");
  });
};

initServer();
