import { app } from "./app";
import { config } from "./config/config";
import { connection } from "./config/connection";
import { rmq } from "./rabbitMQ/listener";
import { AirlineCreatedListener } from "./rabbitMQ/AIRLINE:CREATED";
import { AirlineUpdatedListener } from "./rabbitMQ/AIRLINE:UPDATED";
import { ProfileCreatedListener } from "./rabbitMQ/PROFILE:CREATED";
import { ProfileUpdatedListener } from "./rabbitMQ/PROFILE:UPDATED";
import "dotenv/config";



const initServer = async () => {

    await connection(config.MONGO_URI).catch(() => {
        console.log("Db error");
    });
    console.log(`DB connected on ${config.MONGO_URI}`);
await rmq.connect(
      "amqps://rmgykywi:FAXeDfV9FCux1vkhRqyr2cj4TLtAYOcI@puffin.rmq2.cloudamqp.com/rmgykywi"
    );

    const airlineCreatedListener = new AirlineCreatedListener(rmq.client);
    const airlineUpdatedListener = new AirlineUpdatedListener(rmq.client);
    const profileCreatedListener = new ProfileCreatedListener(rmq.client);
    const profileUpdatedListener = new ProfileUpdatedListener(rmq.client);
    await airlineCreatedListener.listen();
    await airlineUpdatedListener.listen();
    await profileCreatedListener.listen();
    await profileUpdatedListener.listen();
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
};

initServer();
