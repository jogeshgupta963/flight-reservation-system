import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    // process.env.JWT_KEY = "asdfasdf";
    // process.env.PORT = "3001";
    // process.env.NODE_ENV = "dev";
    // process.env.COOKIE_NAME = "fcc";
    // process.env.JWT_SECRET = "apfmlaspkfmaipfkm";
    // process.env.JWT_EXPIRATION = "2d";
    const mongo = await MongoMemoryServer.create();
    const uri: string = mongo.getUri();
    mongoServer = mongo;
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
});

// beforeEach(async () => {
//     process.env.JWT_KEY = "asdfasdf";
//     process.env.PORT = "3001";
//     process.env.NODE_ENV = "dev";
//     process.env.COOKIE_NAME = "fcc";
//     process.env.JWT_SECRET = "apfmlaspkfmaipfkm";
//     process.env.JWT_EXPIRATION = "2d";
//     const collections = await mongoose.connection.db.collections();

//     for (const collection of collections) {
//         await collection.deleteMany({});
//     }
// });

afterAll(async () => {
    mongoServer.stop();
    // (await server).close();
    await mongoose.connection.close();
});
