import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const config = {
  host: process.env.DB_HOST_ADDRESS,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  ssl: {ca: fs.readFileSync("./config/DigiCertGlobalRootCA.crt.pem")}
};