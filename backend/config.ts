import path from "path";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const rootPath = __dirname;
dotenv.config();
cloudinary.config({
  cloud_name: "dttunf1gr",
  api_key: "967649736459662",
  api_secret: "J_CIsRV8MuNXGyIxu3pI7XHXxV0",
});

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: process.env.MONGODB || "",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
