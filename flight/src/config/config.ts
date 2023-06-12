import "dotenv/config";
export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || "development",
    COOKIE_NAME: process.env.COOKIE_NAME || "fcc",
    JWT_SECRET: process.env.JWT_SECRET || "apfmlaspkfmaipfkm",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "2d",
    MONGO_URI: process.env.MONGO_URI || "mongodb://172.17.0.2:27017/myDatabase",
    //  MONGO_URI_TESTING : mongodb://172.17.0.2:27017/testing,

    //  MONGO_URI : mongodb+srv://admin:FYv5jqnidHPCxCOr@testing.s5sej.mongodb.net/?retryWrites:true&w:majority,
    //  MONGO_URI_TESTING : mongodb+srv://admin:FYv5jqnidHPCxCOr@testing.s5sej.mongodb.net/testing?retryWrites:true&w:majority,

    // MONGO_URI : mongodb://172.17.0.2:27017/testDB,
};
