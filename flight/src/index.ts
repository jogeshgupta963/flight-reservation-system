import { app } from "./app";
import { config } from "./config/config";
import { connection } from "./config/connection";
import "dotenv/config";

const checkEnv = () => {
    const env = ["MONGO_URI"];
    env.forEach((data) => {
        if (!process.env[data]) {
            console.log(`${data} env not found`);
            process.exit(1);
        }
    });
};

const initServer = async () => {
    checkEnv();
    await connection(config.MONGO_URI).catch(() => {
        console.log("Db error");
    });
    console.log(`DB connected on ${config.MONGO_URI}`);
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
};

initServer();
