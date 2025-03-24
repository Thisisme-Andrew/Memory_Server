import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: './config/.env' });

export const config = {
  host: process.env.HOST_ADDRESS,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.PORT,
  ssl: {ca: fs.readFileSync("./config/DigiCertGlobalRootCA.crt.pem")}
};