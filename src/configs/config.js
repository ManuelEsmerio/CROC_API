import { config } from "dotenv";

config();

export default {
    development: {
        username: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "",
        host: process.env.DB_HOST || "",
        port: process.env.DB_PORT || "",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}